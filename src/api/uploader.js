import axios from 'axios';
import { eventBus } from '../main';

//let BASE_URL = 'https://smmapi-dev.herokuapp.com/v1/api/'
let BASE_URL = 'http://localhost:4000/v1/api/'

//this will get a signed request from the API to upload a file to S3
export const uploadToS3 = (file, callback) => {
  _getSignedRequest(file)
  .then(_uploadToS3)
  .then((imageUrl) => {
    callback(null, imageUrl);
  })
  .catch((err) => {
    callback(err, null);
  });
}

//this will generate the signed request
let _getSignedRequest = (file) => {
  let _file = file;
  let promise = new Promise((resolve, reject) => {
    const filename = _file.name;
    const filetype = _file.type;
    const url = `${BASE_URL}sign?filename=${filename}&filetype=${filetype}`
    axios.get(url)
    .then((response) => {
      resolve({signedUrl: response.data.data.signedUrl, url: response.data.data.url, file: _file});
    })
    .catch((error) => {
      reject(JSON.stringify(error));
    });
  });
  return promise;
}

//this will upload the file to s3 with progress on the event bus in case some notification needs to be shown
//promise will resolve with a cloudfront url that is used to save the the object
let _uploadToS3 = (payload) => {
  let _payload = payload;
  let promise = new Promise((resolve, reject) => {
    var config = {
      headers: {
        'Content-Type': _payload.file.type
      },
      onUploadProgress: function(progressEvent) {
        let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
        eventBus.$emit('uploadProgress', {percentCompleted: percentCompleted});
      }
    };
    let _this = this;
    axios.put(_payload.signedUrl, _payload.file, config)
    .then(function (res) {
      resolve(_payload.url);
    })
    .catch(function (err) {
      reject(JSON.stringify(err));
    });
  });
  return promise;
}
