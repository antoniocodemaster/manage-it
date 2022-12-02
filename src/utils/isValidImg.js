const isValidImg = (img) => /\image\/(jpg|jpeg|png|gif)$/.test(img?.type);

export default isValidImg;
