import {
   faFileImage,
   faImagePortrait,
   faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import swal from "sweetalert";
import isValidImg from "../../utils/isValidImg";
import srcToFile from "../../utils/srcToFile";
import Modal from "./Modal";

const ChangeAvatarModal = ({ isModalActive, setIsModalActive, onChangeAvatar }) => {
   const [userImg, setUserImg] = useState(null);
   const [imgSrc, setImgSrc] = useState("");
   const [isAvatarImgLoading, setIsAvatarImgLoading] = useState(null);
   const [isScreenshotModalActive, setIsScreenshotModalActive] = useState(false);
   const [isWebcamPicActive, setIsWebcamPicActive] = useState(false);

   const userVideoRef = useRef();

   const handleGetImg = () => {
      document.getElementById("upload-img").click();
   };

   const handleChangeImg = ({ target }) => {
      setIsWebcamPicActive(false);

      const [image] = target.files;

      if (!isValidImg(image)) {
         target.value = "";

         return swal({
            title: "Invalid image",
            icon: "error",
            button: "Ok",
            timer: "50000",
         });
      }

      const fileReader = new FileReader();

      fileReader.readAsDataURL(image);

      fileReader.addEventListener("loadend", ({ target }) => {
         setImgSrc(target.result);
      });

      setUserImg(image);
   };

   const handleCloseModal = () => {
      setIsModalActive(false);
   };

   const handleUploadImg = async () => {
      setIsAvatarImgLoading(true);

      // dispatch(setAuthUser({ ...authUser, image: imgSrc }));
      setUserImg(null);
      setImgSrc("");
      setIsModalActive(false);
      setIsAvatarImgLoading(null);
      onChangeAvatar(userImg);
   };

   const handleOpenScreenshotModal = () => {
      if (!navigator.mediaDevices?.getUserMedia) return;

      setIsModalActive(false);
      setIsScreenshotModalActive(true);
   };

   const handleTakeUserPic = async () => {
      setIsWebcamPicActive(true);

      const canvas = document.createElement("canvas");

      if (!userVideoRef) return;

      canvas.width = 1920;
      canvas.height = 1080;

      const c = canvas.getContext("2d");

      c.drawImage(userVideoRef.current, 0, 0, canvas.width, canvas.height);

      const imgSrc = canvas.toDataURL("image/png");

      setImgSrc(imgSrc);

      const imgFile = await srcToFile(imgSrc);

      setUserImg(imgFile);

      setIsScreenshotModalActive(false);
      setIsModalActive(true);
   };

   useEffect(() => {
      if (!isScreenshotModalActive) return;

      if (!navigator.mediaDevices?.getUserMedia) return;

      navigator.mediaDevices
         .getUserMedia({ video: true })
         .then((stream) => {
            const video = userVideoRef.current;

            video.srcObject = stream;

            video.play();
         })
         .catch((error) => {
            swal({
               title: error.message,
               icon: "error",
               button: "Ok",
               timer: "4000",
            });
         });
   }, [userVideoRef, isScreenshotModalActive]);

   useEffect(() => {
      if (isScreenshotModalActive) return;

      if (userVideoRef.current) {
         const videoStream = userVideoRef.current?.srcObject;

         if (!videoStream) return;

         videoStream.getTracks().forEach((track) => track.stop());
      }
   }, [isScreenshotModalActive, userVideoRef]);

   return (
      <>
         <Modal
            onClose={() => setIsScreenshotModalActive(false)}
            isModalActive={isScreenshotModalActive}
         >
            <div className="screenshot-container">
               <video ref={userVideoRef} className="user-video"></video>
               <button
                  onClick={handleTakeUserPic}
                  className="btn btn-primary take-screenshot-btn"
               >
                  <FontAwesomeIcon
                     icon={faCamera}
                     data-tip="Change theme"
                     data-for="themes-tooltip"
                  />
               </button>
            </div>
         </Modal>
         <Modal onClose={handleCloseModal} isModalActive={isModalActive}>
            <div className="change-img-modal-content">
               <h2>Select image</h2>
               <div className="avatar-img-options">
                  <div onClick={handleGetImg} className="options-item upload-img">
                     <input
                        onChange={handleChangeImg}
                        id="upload-img"
                        type="file"
                        className="d-none"
                     />
                     {imgSrc && !isWebcamPicActive && (
                        <div className="avatar-img-container">
                           <img src={imgSrc} alt="User avatar" />
                        </div>
                     )}
                     {(!imgSrc || isWebcamPicActive) && (
                        <div className="upload-img-icon">
                           <FontAwesomeIcon
                              icon={faFileImage}
                              data-tip="Change theme"
                              data-for="themes-tooltip"
                           />
                        </div>
                     )}
                     <p>Upload image</p>
                  </div>
                  <div
                     onClick={handleOpenScreenshotModal}
                     className="options-item take-screen-shot"
                  >
                     {imgSrc && isWebcamPicActive && (
                        <div className="avatar-img-container">
                           <img src={imgSrc} alt="User avatar" />
                        </div>
                     )}
                     {(!imgSrc || !isWebcamPicActive) && (
                        <div className="upload-img-icon">
                           <FontAwesomeIcon
                              icon={faImagePortrait}
                              data-tip="Change theme"
                              data-for="themes-tooltip"
                           />
                        </div>
                     )}
                     <p>Take picture</p>
                  </div>
               </div>
               {userImg && (
                  <button
                     onClick={handleUploadImg}
                     className="btn btn-primary add-img-btn"
                  >
                     {isAvatarImgLoading ? "Loading..." : "Add"}
                  </button>
               )}
            </div>
         </Modal>
      </>
   );
};

export default ChangeAvatarModal;
