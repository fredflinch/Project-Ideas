const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const app = express();

app.use(fileUpload({
    createParentPath: true
}));

app.use(express.static('html'))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.post('/upload', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.image;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv('./uploads/' + avatar.name);

            //send response
            res.sendFile(`${__dirname}/html/success.html`);
	    //res.send({
            //    status: true,
            //   message: 'File is uploaded',
            //    data: {
            //        name: avatar.name,
            //        mimetype: avatar.mimetype,
            //       size: avatar.size
            //    }
            //});
        }
    } catch (err) {
	console.log(err)
        res.status(500).send(err);
    }
});


app.get("/cat", (req, res) => {
  res.sendFile(`${__dirname}/html/cat.html`);
});

app.get("/file_upload", (req, res) => {
  res.sendFile(`${__dirname}/html/file_upload.html`);
});

app.post("/upload", (req, res) => {
  res.sendFile(`${__dirname}/html/success.html`);
});

app.listen(443, () => {
  console.log("server running");
});
