const express = require('express');
const router = express();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

const profile = require('../../db/user-profile-db');

const singleUpload = profile.upload.single('image');

router.post('/avatar', function(req, res) {
    singleUpload(req, res, function(err) {
        if (err) {
            console.log('upload user avatar failed', err);
            return res.status(422).send("upload user avatar failed");
        }
        return res.status(200).json({"imageUrl" : req.file.location});
    });
});

module.exports = router;