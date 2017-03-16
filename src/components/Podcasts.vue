<template lang="html">
  <div>
    <h1>Podcasts go here.</h1>
    <h1>Upload this</h1>
    <div v-if="!image">
      <h2>Select an image</h2>
      <input id="file" type="file" @change="onFileChange">
    </div>
    <div v-else>
      <img :src="image" />
      <button @click="removeImage">Remove image</button>
    </div>

  </div>
</template>

<script>

import axios from 'axios';

//upload functions
function getSignedRequest(file){

  const url = `https://smmapi-dev.herokuapp.com/v1/api/getSignedUrlForImage?objectName=${file.name}&file-type=${file.type}`
  axios.get(url)
  .then((response) => {
    let signed = response.data.signedRequest;
    uploadToS3(signed, file);
  })
  .catch((error) => console.log(error));

};

function uploadToS3(signedUrl, file) {

          var config = {
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
              console.log(percentCompleted);
            },
            headers: {
              'Content-Type': file.type
            }
          };

          axios.put(signedUrl, file, config)
            .then(function (res) {
              console.log(res.data);
            })
            .catch(function (err) {
              console.log(err);
            });

};


export default {
  data: function () {
    return {
      statusMessage: 'Please select a file',
      image: ''
    }
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
       return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
       vm.image = e.target.result;
       getSignedRequest(file);
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = '';
    }
  }
};

</script>

<style lang="css" scoped>

img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 10px;
  margin-top: 10px;
}

</style>
