const srcToFile = async (src, fileName = "user-img.png", mimeType = "image/png") => {
   return fetch(src)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], fileName, { type: mimeType }));
};

export default srcToFile;
