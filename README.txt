```js
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
let data = new FormData();
data.append('file', fs.createReadStream('D:\geogram\ifc-converter\ifc-converter-main\bin\test.ifc'));

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:4000/convert/ifc2json',
  headers: { 
    ...data.getHeaders()
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

```