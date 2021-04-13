const express = require('express');
const fs = require('fs')
const app = express();
const cors = require('cors');
app.listen(3000, () => console.log('Server i running on 3000'));
app.use(cors({
    origin: '*'
}))

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
}

function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer.from(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}



app.get('/file', (req, res) => {
    var base64str = base64_encode('./helloworld.txt');
    const type = ['image/jpeg','text/plain']
    // console.log(base64str);
    res.send({
        type : type[1],
        data : base64str
    })
})