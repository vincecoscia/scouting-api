const multer = require('multer')
const uuid = require("uuid").v4

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads")
  },
  filename: (req, file, cb) => {
    const {originalname} = file
    cb(null, `${uuid()}-${originalname}`)
  }
})

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'text/csv') {
    cb(null, true)
  } else {
    cb(new Error("file is not of the correct type"), false)
  }
}

upload = multer({ storage, fileFilter, limits: {fileSize: 1000000} })

upload = upload.single("file")

module.exports = upload;
