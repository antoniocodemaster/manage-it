const { response } = require("express");

const validateImg = (req, res = response, next) => {
   if (!req.files) return res.status(400).json({ msg: "Request without image" });

   const { image } = req.files;

   if (!image) {
      return res.status(400).json({ msg: `Image data have to be named as 'image'` });
   }

   if (!image || !/\image\/(jpg|jpeg|png|gif)$/.test(image.mimetype))
      return res.status(400).json({ msg: "Invalid img" });

   req.imgType = image.mimetype.split("/")[1];

   next();
};

module.exports = { validateImg };
