const cloudinary = require("cloudinary").v2;
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
const uploadImgae = async (req, res) => {
  try {
    console.log(process.env.CLOUD_KEY);
    const { path } = req.body;
    let files = Object.values(req.files).flat();
    //console.log("13", files);
    let images = [];
    for (const file of files) {
      console.log("16", file.tempFilePath);
      const url = await uploadToCloudinary(file, path);
      console.log(url);
      images.push(url);
      removeTmp(file.tempFilePath);
    }
    res.json(images);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const uploadToCloudinary = async (file, path) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file.tempFilePath,
      {
        folder: path,
      },
      (err, res) => {
        if (err) {
          removeTmp(file.tempFilePath);
          return res.status(400).json({ message: "Upload image failed." });
        }
        resolve({
          url: res.secure_url,
        });
      }
    );
  });
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = {
  uploadImgae,
};
