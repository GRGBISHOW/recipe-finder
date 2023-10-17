import React, { useEffect, useState } from "react";
import image_recognition from "./image_recognition";
import Webcam from "react-webcam";
import './Camera.css';
import LowerBar from "scenes/lowerBar";  // Check the path for "LowerBar"
import ActualLowerBar from "scenes/actualLowerBar";  // Check the path for "ActualLowerBar"
import { Box, Typography } from "@mui/material";
import Ingredients from "scenes/ingredientPage";
import { useSelector } from "react-redux";
import { setSelectedIngredient } from "state";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


function Camera() {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  const [capturedBase64, setCapturedBase64] = useState(null);
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);
  const [resultFlag, setResultFlag] = useState(false);
  const selectedIngredient = useSelector((state) => state.selectedIngredient)
  const ingredients = useSelector((state) => state.ingredients);
  const [availableFlag, setAvailableFlag] = useState(false);
  const navigate = useNavigate();

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
      <div className="camera-container">
        {!resultFlag &&
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              justifySelf: 'flex-start',
              flexDirection: 'column',
              marginTop: '50px',
              marginBottom: '50px',
              width: '100%',
              height: '200px',
            }}
          >
            <Box
              width='415px'
              textAlign='center'
            >
              <Typography
                sx={{
                  fontFamily: 'Quicksand',
                  fontWeight: '700',
                  fontSize: '40px',
                  color: '#105B27'
                }}
              >
                Scan your ingredient
              </Typography><br />
              <Typography
                sx={{
                  fontFamily: 'Quicksand',
                  fontWeight: '400',
                  fontSize: '20px',
                  color: '#105B27'
                }}
              >
                Place your ingredient in the center of the camera
              </Typography>
            </Box>
          </Box>

        {!capturedBase64 && <Webcam
          audio={false}
          height={480}
          screenshotFormat="image/jpeg"
          width={800}
          videoConstraints={videoConstraints}
          mirrored={true}
          children={getScreenShotRenderProps}
        />}

        {capturedBase64 && <div className="image-preview"><img src={capturedBase64} alt="Captured" /></div>}

        {capturedBase64 &&
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '250px',
            }}
          >
            <button
              className="submit-button" // Apply CSS class for the button
              onClick={() => {
                setResultFlag(true);
                image_recognition(capturedBase64).then((res) => {
                  setResult(res.outputs[0].data.concepts[0].name);
                });
              }}
            >
              Submit
            </button>

            <button
              className="submit-button-second" // Apply CSS class for the button
              onClick={() => {
                setCapturedBase64(null);  // Reset capturedBase64 to null when retaking the photo
              }}
            >
              Retake photo
            </button>
          </div>
        }
        </>
      }
        {result && ingredients.map((ii) => {
          if((ii.name).toLowerCase() === result.toLowerCase()){
            setAvailableFlag(true);
            dispatch(setSelectedIngredient({selectedIngredient: ii}));
            setTimeout(2000);
          }
        })}
       {result && (availableFlag ? (
        <>      
        <Box
        display='flex'
        flexDirection='column'
        width='100%'
        alignItems= 'center'
        justifyContent='center'
        >
         <Typography
         sx={{
          fontWeight:'700',
          fontFamily: 'quicksand',
          fontSize:'40px',
          color:'#105B27',
         }}>
          What you're looking for is
         </Typography>
         <Box
          key={selectedIngredient._id} 
          sx={{
            zIndex: '5',
            marginTop: '50px',
            backgroundColor:'#fff',
            display:'flex',
            paddingBottom: '10px',
            boxShadow: '0 0 20px rgba(0,0,0,0.10)',
            borderRadius: '30px',
            width:'285px',
            alignItems: 'center',
            justifyContent:'center',
            height:'375px',
          }}>
            <Ingredients 
            key={selectedIngredient._id} 
            ingredientN={JSON.stringify(selectedIngredient.name)} 
            size={'265px'}  
            title={selectedIngredient.name} />
          </Box>
          <Box
           display='flex'
           width='300px'
           alignItems= 'center'
           justifyContent='space-between'
           height='180px'
          >
          <button
              className="submit-button" // Apply CSS class for the button
              onClick={() => {
                navigate(`/ingredients/${selectedIngredient.name}`);
              }}
            >
              <Typography
              sx={{
                fontSize:'25px',
                fontFamily:'quicksand',
                '&:hover':{
                  fontWeight: '700',
                }
              }}>
              Yes
              </Typography>
              <Typography
              sx={{
                fontSize:'12px',
                fontFamily:'quicksand',
              }}>
                Select as ingredient
              </Typography>
            </button>

            <button
              className="submit-button-second" // Apply CSS class for the button
              onClick={() => {
                dispatch(setSelectedIngredient({selectedIngredient: null}));
                navigate(0);
              }}
            >
              <Typography
              sx={{
                fontSize:'25px',
                fontFamily:'quicksand',
                '&:hover':{
                  fontWeight: '700',
                }
              }}>
              Try Again
              </Typography>
              <Typography
              sx={{
                fontSize:'12px',
                fontFamily:'quicksand',
              }}>
                Retake photo
              </Typography>
            </button>
          </Box>
         </Box>
        </> 
          ) : (
            <>
            <Box
            display='flex'
            flexDirection='column'>
             <Typography
             sx={{
              textAlign:'center',
              fontWeight:'700',
              fontFamily: 'quicksand',
              fontSize:'30px',
              color:'#105B27',
             }}>
              Sorry the below ingredient is not available in our database
             </Typography>
             <Typography
              sx={{
                marginTop: '100px',
                textAlign: 'center',
                fontFamily: 'Quicksand',
                fontWeight: '500',
                fontSize: '20px',
                color: '#105B27'
              }}>
                Output: &nbsp;{result}
              </Typography>
              <Box
                paddingTop='20px'
                width='100%'
                display='flex'
                justifyContent='center'
              >
                <button
                className="submit-button-second" // Apply CSS class for the button
                onClick={() => {
                  navigate(0);  
                }}
              >
                Retake photo
              </button>
              </Box>
             </Box>
            </> 
          ))
        }

      </div>
      <ActualLowerBar />
    </>
  );
}

export default Camera;
