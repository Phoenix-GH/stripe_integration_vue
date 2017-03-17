<template lang="html">
  <div>
    <h1>Podcasts go here.</h1>
    <h1>Upload this</h1>
    <h1>{{ message }}</h1>
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

  import { uploadToS3 } from '../api/uploader';
  import { eventBus } from '../main';

  export default {
    data: function () {
      return {
        statusMessage: 'Please select a file',
        image: '',
        message: ''
      }
    },
    created() {
      eventBus.$on('uploadProgress', (data) => {
        console.log("upload progress " + data.percentCompleted + "%");
      });
    },
    methods: {
      onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImage(files[0]);
      },
      createImage(file) {
        let image = new Image();
        const reader = new FileReader();
        let vm = this;
        reader.onload = (e) => {
         vm.image = e.target.result;
         uploadToS3(file, (err, message) => {
           console.log(err);
           console.log(message);
         });
        };
        reader.readAsDataURL(file);
      },
      removeImage() {
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
