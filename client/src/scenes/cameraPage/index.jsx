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
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    setTimeout(() => {   
      setLoad(false)   
    }, 10000); 
  },[load])

  const handleSubmit = async() => {
    setLoad(true);
    setResultFlag(true);
    image_recognition(capturedBase64).then((res) => {
      setResult(res.outputs[0].data.concepts[0].name);
    });
  }

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
      {!load ? (<div className="camera-container">
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
              onClick={handleSubmit}
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
          if(availableFlag){
            return;
          }          
          if((ii.name).toLowerCase() === result.toLowerCase()){
            setAvailableFlag(true);
            dispatch(setSelectedIngredient({selectedIngredient: ii}));            
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
           width='350px'
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
      ) : (
        <div className="camera-container">
        <svg>
          <circle id="s8" class="sMove t" cx="45" cy="50" r="45" fill="#020205"/>
          <polygon id="s7" class="sMove t" points="45,05 16,16 1,42 6,73 30,92 60,92 84,73 89,42 74,16" fill="#230B09"/>
          <polygon id="s6" class="sMove t" points="45,04 12,17 0,50 12,83 45,96 78,83 90,50 78,17" fill="#46130C"/>
          <polygon id="s5" class="sMove t" points="45,04 9,22 1,60 25,92 65,92 89,60 81,22" fill="#631B0E"/>
          <polygon id="s4" class="sMove t" points="45,03 4,26 4,74 45,97 86,74 86,26" fill="#812211"/>
          <polygon id="s3" class="sMove t" points="45,03 1,35 18,88 72,88 89,35" fill="#992813"/>
          <rect id="s2" class="sMove t" x="10" y="15" width="70" height="70" fill="#BD3116"/>
          <polygon id="s1" class="sMove t" points="45,05 2,80 88,80" fill="#E43A19"/>
        </svg>
        <h1>LOADING</h1>         
        </div>
      )}
      <ActualLowerBar />
    </>
  );
}

export default Camera;
