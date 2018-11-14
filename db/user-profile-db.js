const aws = require('aws-sdk'),      
      multer = require('multer'),
      multerS3 = require('multer-s3');

const config = require('./../config/admin.json');

var exports = module.exports = {};

aws.config.update({
    secretAccessKey: config.s3_key.AWSSecretKey,
    accessKeyId: config.s3_key.AWSAccessKeyId, 
    region:  config.s3_key.region
});

const imageFilter = (req, file, cb) => {
  console.log(file.mimetype);
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error("Please upload image!"));
  }
};

var s3 = new aws.S3({ /* ... */ });
 
exports.upload = multer({
  fileFilter: imageFilter,
  limits:{
    fileSize: 300 * 1024 //size of u file
  },
  storage: multerS3({
    s3: s3,
    bucket: 'sport-stat',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      var path = 'user/avatar/';
      cb(null, path + 'test-' + Date.now().toString() + '.jpg')
    }
  })
});