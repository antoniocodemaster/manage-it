module.exports = isValidImg = (img) => /\image\/(jpg|jpeg|png|gif)$/.test(img?.mimetype);
