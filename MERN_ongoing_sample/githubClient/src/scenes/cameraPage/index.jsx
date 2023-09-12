import React, { useState } from "react";
import image_recognition from "./image_recognition";
import Webcam from "react-webcam";

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
    <div className="App">
      <Webcam
        audio={false}
        height={500}
        screenshotFormat="image/jpeg"
        width={500}
        videoConstraints={videoConstraints}
        mirrored={true}
        children={getScreenShotRenderProps}
      />
      {capturedBase64 && <img src={capturedBase64} />}
      <button
        onClick={() => {
          image_recognition(capturedBase64).then((res) => {
            setResult(res.outputs[0].data.concepts[0].name);
          });
        }}
      >
        Submit
      </button>
      {result && <div>{result}</div>}
    </div>
  );
}

export default Camera;