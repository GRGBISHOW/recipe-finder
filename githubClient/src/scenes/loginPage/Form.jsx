import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin, setLikes } from "state";
import Dropzone from "react-dropzone";
import Flex from "components/Flex";
import { purple, orange, red, grey } from "@mui/material/colors"
import { setIngredients, setCategories, setRecipes} from "state";
import "./index.css"


const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  imagePath: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});


const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  imagePath: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const dispatch = useDispatch();
  const [pageType, setPageType] = useState("login");
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";


  const getAllIngredients = async () => {
    const response = await fetch(`http://localhost:3001/backend/recipes/getAllIngredients`, {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setIngredients({ingredients: data}));
  };
  
  const getAllCategories = async() => {
    const response = await fetch(`http://localhost:3001/backend/category/`,{
      method: 'GET'
    });
    const data = await response.json();
    dispatch(setCategories({categories : data}));
  }; 

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("imagePath", values.imagePath.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/backend/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };
  const getAllRecipes = async () => {
    const response = await fetch("http://localhost:3001/backend/recipes/", {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setRecipes({ recipes: data }));
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/backend/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      await getAllCategories();
      await getAllIngredients();
      await getAllRecipes();
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        }));
      dispatch(
        setLikes({ 
          likes: loggedIn.user.likes,
          user: loggedIn.user,
          token: loggedIn.token,
         }));
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Box className='loginBox'>
      <Box
    sx={{
      width: '100%',
      alignItems:'center',
      maxWidth:'900px',
      height: '200px',
    }}>
      {isLogin ? (
        <Box className= "welcomeBox">
      <Typography className='first'>
        Welcome Back
      </Typography>
      <Typography className="second">
        Please log in to your account
      </Typography>
      </Box>) : (
        <Box className= "welcomeBox">
      <Typography className='first'>
        Create Account
      </Typography>
      </Box>
      )}
      </Box>
    <Box
    sx={{
      width: '100%',
      alignItems:'center',
      height:'100%',
      maxWidth:'900px',
    }}>
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        //"& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
       }) => (
        <form onSubmit={handleSubmit}
        sx={{
          display: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          //"& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}>
          <Box
            //display="grid"
            //gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection:'column',
              //"& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
              <Box
                width='100%'
                display='flex'
                alignItems ='center'
                position= 'relative'
                left='80px'
                justifyContent= 'center'
              >
              <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ width: '200px', marginBottom: '20px',marginRight: '30px'}}
                />

                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={
                    Boolean(touched.lastName) && Boolean(errors.lastName)
                  }
                  helperText={touched.lastName && errors.lastName}
                  sx={{ width: '200px', marginBottom: '20px'}}
                />
                
              </Box>
              <Box
                width='100%'
                display='flex'
                alignItems ='center'
                justifyContent= 'center'
              >
                <Box
                  gridColumn="span 4"
                  borderRadius="5px"
                  p="1rem"
                  width='395px'
                  height= '20px'
                  position='relative'
                  left='80px'
                  sx={{marginBottom:'20px'}}
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("imagePath", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={'3px dashed #A6E2B8'}
                        borderRadius='30px'
                        p="0.8rem"
                        position='relative'
                        display='flex'
                        alignItems='center'
                        top='-3px'
                        sx={{ "&:hover": { cursor: "pointer" }, height: '5px',  }}
                      >
                        {!values.imagePath ? (
                          <Box display='flex' justifyContent='center' alignItems='center' position='absolute' fontFamily='Quicksand'>Add Picture Here</Box>
                        ) : (
                          <Box display='flex' justifyContent='center' alignItems='center' position='absolute' fontFamily='Quicksand'>
                            <Typography>{values.imagePath.name}</Typography>
                            <EditOutlinedIcon />
                          </Box>
                        )}
                        <input {...getInputProps()} />
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" , width: '430px', left: '80px', marginBottom:'20px' }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4", width: '430px', left: '80px' }}
            />
          </Box>

          {/* BUTTONS */}
          <Box
          sx={{
            display:'flex',
            justifyContent:'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                width: '430px', left: '80px' , 
                p: "1rem",
                backgroundColor: '#F2994A',
                "&:hover": { backgroundColor: '#105B27' },
                color: '#FFF',
                textAlign: 'center',
                fontFamily: 'Quicksand',
                textTransform: 'none',
                fontSize: '22px',
                fontWeight: '600',
                lineHeight: '20.94px', /* 174.811% */
                letterSpacing: '-0.274px',
              }}
            >
              {isLogin ? "Log in" : "Register Now"}
            </Button>
            <Box
            sx={{
              display: 'flex',
              width:'100%',
              justifyContent: 'center',
            }}>
            {!isLogin ? (<Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                color: '#20B64D',
                "&:hover": {
                  cursor: "pointer",
                  color: '#105B27',
                },
              }}
            >
               Already have an account? Login here.
            </Typography>) : (
              <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                color: '#000',
                "&:hover": {
                  cursor: "pointer",
                  color: '#105B27',
                },
              }}
            >
               Don't have an account?
            </Typography>
            )}
            </Box>            
          </Box>
        </form>
      )}
    </Formik>
          </Box>
        </Box>
  );
};

export default Form;
