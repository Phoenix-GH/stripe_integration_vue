import axios from 'axios';
import { eventBus } from '../main';

export const uploadToS3 = (file, callback) => {
  _getSignedRequest(file)
  .then(_uploadToS3)
  .then((message) => {
    callback(null, message);
  })
  .catch((err) => {
    callback(err, null);
  });
}

let _getSignedRequest = (file) => {
  let _file = file;
  let promise = new Promise((resolve, reject) => {
    const filename = _file.name;
    const filetype = _file.type;
    const url = `https://smmapi-dev.herokuapp.com/v1/api/sign?filename=${filename}&filetype=${filetype}`
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
      resolve({message: 'upload success!'});
    })
    .catch(function (err) {
      reject(JSON.stringify(err));
    });
  });
  return promise;
}
