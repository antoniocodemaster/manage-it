const { response } = require("express");
const AuthUser = require("../models/AuthUser");

const cloudinary = require("cloudinary").v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const updateAuthUserPic = async (req, res = response) => {
  const { id } = req.params;

  if (!req.files || !req.files.image) {
    return res.status(400).json({ msg: "Request without image" });
  }

  try {
    const authUserDB = await AuthUser.findById(id);

    if (authUserDB.image) {
      const pathArrName = user.image.split("/");
      const imgName = pathArrName[pathArrName.length - 1];
      const [publicId] = imgName.split(".");

      const imageToDestroyUrl = `manage-it/authUsers/${publicId}`;

      cloudinary.uploader.destroy(imageToDestroyUrl);
    }

    const { tempFilePath } = req.files.image;

    const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
      folder: "manage-it/authUsers",
    });

    const userToUpdate = { ...authUserDB, picture: secure_url };

    console.log(secure_url)

    const updatedUserImg = await AuthUser.findByIdAndUpdate(id, userToUpdate, {
      new: true,
    });

    res.json({ ok: true, user: "cagar ok" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { updateAuthUserPic };
