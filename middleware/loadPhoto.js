const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(request, file, callback) {
        callback(null, "public/photoes/");
    },
    filename: function(request, file, callback) {
        callback(null, request.user.username);
    }
});

const limits = { filesize: 500 * 1024 };

fileFilter = function(request, file, callback) {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    } else {
        callback(null, false);
    }
}

module.exports = multer({ storage: storage, fileFilter: fileFilter, limits: limits });