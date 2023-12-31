const multer = require('multer');

const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, './public/images');
    },
    filename : function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + "." + file.mimetype.split('/')[1]);
    }
});



const upload = multer({
        storage : storage,
        limits : {
            fileSize: 7168987,
        },
        fileFilter : (req, file, cb) => {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg") {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
            }
        }
    }
);

module.exports = {
    upload
};