const multer = require('multer');
const path = require('path');

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + path.extname(file.originalname));
  },
});

// Define file filter function
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const mimeType = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname));
  if (mimeType && extname) {
    cb(null, true);
  } else {
    cb('Give proper files format to upload.');
  }
};

// Configure multer with storage and file filter
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 100000 },
  fileFilter: fileFilter,
}).single();

module.exports = {
  storage,
  upload,
};
