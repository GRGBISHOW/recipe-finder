import {
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Favorite,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";
import Flex from "components/Flex";
import { grey } from "@mui/material/colors";

const LowerBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    let fullName;
     if(user){
      fullName = `${user.firstName} ${user.lastName}`;
     }
     else{
      fullName = "Happy Professor"
     }
    
    const desktopScreens = useMediaQuery("(min-width: 1000px)");

    return (
        <Flex padding="1rem 6%">
            <Flex gap="1.75rem">
            {desktopScreens ? (
              <Flex>
              <Typography
                fontWeight="bold"
                fontSize="clamp(1rem, 2rem, 2.25rem)"
              //   color="primary"
                onClick={() => navigate("/home")}
                sx={{
                  "&:hover": {
                  //   color: primaryLight,
                    cursor: "pointer",
                  },
                }}
              >
                Recipe Finder
              </Typography>
              <Flex
                borderRadius="9px"
                gap="3rem"
                padding="0.1rem 1.5rem"
              >
                <InputBase placeholder="Search..." />
                <IconButton>
                  <Search />
                </IconButton>
              </Flex>
              </Flex>
            ): (
            <Typography
              fontWeight="slim"
              fontSize="clamp(0.75rem, 1.5rem, 1.75rem)"
            //   color="primary"
              onClick={() => navigate("/home")}
              sx={{
                "&:hover": {
                //   color: primaryLight,
                  cursor: "pointer",
                },
              }}
            >
              Recipe Finder
            </Typography>
            )
            }
          </Flex>
    
          {/* DESKTOP NAV */}
          {desktopScreens ? (
            <Flex gap="2rem">
                <IconButton onClick={() => navigate(`/home/${user.email}/likes`)}>
                <Favorite sx={{ fontSize: "25px" }} />
                </IconButton>
              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    width: "200px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: grey,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => {
                    dispatch(setLogout());
                    navigate("/");
                  }
                }>Log Out</MenuItem>
                </Select>
              </FormControl>
            </Flex>
          ) : (
            <Flex gap="2.25rem">
            <IconButton onClick={() => navigate(`${user.email}/likes`)}>
              <Favorite sx={{ fontSize: "25px" }} />
            </IconButton>
            <IconButton sx={{
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: grey,
                    },
                  }}>
            <Typography>{fullName}</Typography>
            </IconButton>
            <IconButton onClick={() => {
                    dispatch(setLogout());
                    navigate("/");
                }}>
                Log Out
            </IconButton>
            </Flex>
          )}
        </Flex>
      );
    };

export default LowerBar;