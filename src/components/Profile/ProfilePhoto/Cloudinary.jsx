import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { TweetBtn } from "../../../UI/Buttons/Buttons";
import "../../../css/Cloudinary.scss";

export const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const { updateImageUrl } = useAuth();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "doqkfgbhz",
        uploadPreset: "y0fdenli",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          const uploadedImageUrl = result.info.secure_url;
          localStorage.setItem("imageUrl", uploadedImageUrl);
          updateImageUrl(uploadedImageUrl);
          setUploadSuccess(true);
        }
      }
    );
  }, []);

  const handleUploadButtonClick = () => {
    widgetRef.current.open();
  };

  return (
    <>
      {uploadSuccess && (
        <div className="Success-Message">
          <p>
            Your image is uploaded successfully, you can now try your new
            avatar! Go and send a message to see it!
          </p>
        </div>
      )}
      <TweetBtn onClick={handleUploadButtonClick} text="Upload" />
    </>
  );
};
