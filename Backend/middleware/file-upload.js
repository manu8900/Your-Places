const multer = require('multer');
const uuid = require('uuid/v1')//for generating unique Id.

/* A helper object created for extracting file extension.*/
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
};


const fileUpload = multer({//multer middleware
    limits: 500000, //limits upto 500KB data,can change to more or less.
    storage: multer.diskStorage({//config.for setting up storage
        destination: (req, file, cb) => {
            cb(null, 'uploads/images');
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, uuid() + '.' + ext);
        }
    }),
    /* function to validate if file is valid or not  */
    fileFilter: (req, file, cb) => {
        // isValid returns either true or false.
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        let error = isValid ? null : new Error('Invalid Mime Type!')
        cb(error, isValid);
    }
});


module.exports = fileUpload;