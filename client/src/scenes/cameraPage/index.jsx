import React, { useState } from "react";
import image_recognition from "./image_recognition";
import Webcam from "react-webcam";
import './Camera.css';
import LowerBar from "scenes/lowerBar";

function Camera() {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  const [capturedBase64, setCapturedBase64] = useState(null);

  const [result, setResult] = useState(null);
  const getScreenShotRenderProps = (arg) => {
    return (
      <button
        className="capture-button" // Apply CSS class for the button
        onClick={() => {
          const imageSrc = arg.getScreenshot();
          setCapturedBase64(imageSrc);
        }}
      >
        Capture photo
      </button>
    );
  };
  return (
    <>
    <LowerBar />
    <div className="camera-container"> {/* Apply CSS class for the container */}
      <Webcam
        audio={false}
        height={380}
        screenshotFormat="image/jpeg"
        width={500}
        videoConstraints={videoConstraints}
        mirrored={true}
        children={getScreenShotRenderProps}
      />
      {capturedBase64 && <div className="image-preview"><img src={capturedBase64} /></div>} {/* Apply CSS class for the image preview */}
      {result && <div className="result">Result: {result}</div>}
      <button
        className="submit-button" // Apply CSS class for the button
        onClick={() => {
          image_recognition(capturedBase64).then((res) => {
            setResult(res.outputs[0].data.concepts[0].name);
          });
        }}
      >
        Submit
      </button>
    </div>
    </>
  );
}

export default Camera;
