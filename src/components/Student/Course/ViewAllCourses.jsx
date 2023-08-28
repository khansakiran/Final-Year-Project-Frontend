import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import newtheme from "../../../Themenew";
import { ThemeProvider } from "@mui/material/styles";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Aos from "aos";
import Grid from "@mui/material/Grid";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import DescriptionIcon from "@mui/icons-material/Description";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import PersonIcon from "@mui/icons-material/Person";
import LanguageIcon from "@mui/icons-material/Language";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#137cbd",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#106ba3",
  },
});

// Inspired by blueprintjs
function BpCheckbox(props) {
  return (
    <Checkbox
      sx={{
        "&:hover": { bgcolor: "transparent" },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ "aria-label": "Checkbox demo" }}
      {...props}
    />
  );
}

function ViewAllCourses() {
  return (
    <ThemeProvider theme={newtheme}>
      <Box sx={{ flexGrow: 1, marginTop: 18, marginBottom: 10 }}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={5}
            lg={3}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginLeft: 4,
            }}
          >
            <Box sx={{ minWidth: 350 }}>
              <Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bolder", marginBottom: 3 }}
                >
                  Search
                </Typography>
                <TextField
                  placeholder="Search Courses"
                  sx={{
                    marginBottom: 2,
                    "& fieldset": { border: "none" },
                    borderRadius: 10,
                    width: "80%",
                    backgroundColor: "#f5f5f7",
                  }}
                ></TextField>
                <Button
                  endIcon={<SearchOutlinedIcon sx={{}} />}
                  sx={{
                    borderRadius: 10,
                    width: "80%",
                    padding: 1.5,
                    backgroundColor: newtheme.palette.secondary.footer,
                    color: newtheme.palette.primary.background,
                    fontWeight: "bold",
                    ":hover": {
                      backgroundColor: newtheme.palette.secondary.footer,
                      color: newtheme.palette.primary.background,
                    },
                  }}
                >
                  Search
                </Button>
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bolder", marginTop: 6, marginBottom: 4 }}
                >
                  Categories
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                    marginBottom: 1,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <BpCheckbox />
                    <Typography variant="h6" sx={{ color: "#747d8f" }}>
                      Java
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: newtheme.palette.secondary.background, fontWeight:'bold' }}>
                      (4)
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                    marginBottom: 1,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <BpCheckbox />
                    <Typography variant="h6" sx={{ color: "#747d8f" }}>
                      Python
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: newtheme.palette.secondary.background, fontWeight:'bold'  }}>
                      (6)
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                    marginBottom: 1,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <BpCheckbox />
                    <Typography variant="h6" sx={{ color: "#747d8f" }}>
                      C++ Courses
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{color: newtheme.palette.secondary.background, fontWeight:'bold' }}>
                      (2)
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                    marginBottom: 1,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <BpCheckbox />
                    <Typography variant="h6" sx={{ color: "#747d8f" }}>
                      {" "}
                      C Sharp
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: newtheme.palette.secondary.background, fontWeight:'bold'  }}>
                      (7)
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                    marginBottom: 1,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <BpCheckbox />
                    <Typography variant="h6" sx={{ color: "#747d8f" }}>
                      C Language
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: newtheme.palette.secondary.background, fontWeight:'bold'  }}>
                      (3)
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                    marginBottom: 1,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <BpCheckbox />
                    <Typography variant="h6" sx={{ color: "#747d8f" }}>
                      MASM/NASM
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: newtheme.palette.secondary.background, fontWeight:'bold' }}>
                      (1)
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
  
          <Grid container xs={12} md={7} lg={9} spacing={6} sx={{marginBottom:10}}> 
            <Grid item
              xs={12}
              sm={12}
              md={12}
              lg={12}>
               <Typography
                  variant="h4"
                  sx={{ fontWeight: "bolder", marginTop:2}}
                >
                  Featured Courses
                </Typography>
            </Grid>


            <Grid
              item
              xs={12}
              md={8}
              lg={4}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 2,
                marginBottom:10
              }}
            >
              <Box sx={{ minWidth: 330,height:'55vh'}}>
              <Box
              sx={{
                backgroundColor: "white",
                boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                ":hover": {
                  boxShadow:
                    "rgb(38, 57, 77) 0px 20px 30px -10px;",
                },
                borderRadius: 6,
                border:'1px solid #f0f0f0'
              }}
            >
              <Box sx={{position:'relative', color:'white'}}>
              <img
                src="https://websitedemos.net/online-coding-course-02/wp-content/uploads/sites/713/2020/10/online-programming-course-03.jpg"
                alt="5 Terre"
                style={{ borderRadius: 16, opacity:0.9 }}
                width={"100%"}
              />
              
              <Box sx={{position:'absolute',bottom:8,left:16,}}>
              <Typography variant="h6" sx={{ fontWeight:'bolder', marginBottom:1}}>Programming</Typography>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom:1}}>
                <Box sx={{display:'flex', flexDirection:'row', marginRight:3}}>
                  <CalendarMonthIcon sx={{marginRight:1}}/>
                  <Typography sx={{fontWeight:'bolder'}}>28-06-2023</Typography>
                </Box>
                <Box sx={{display:'flex', flexDirection:'row', }}>
                  <QueryBuilderIcon sx={{marginRight:1}}/>
                <Typography sx={{fontWeight:'bolder'}}>6 Months</Typography>
                </Box>
              </Box>
              </Box>
              </Box>
              <Box
                sx={{
                  textAlign: "start",
                  paddingLeft: 3,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <LanguageIcon
                    fontSize="small"
                    sx={{
                      marginBottom: 2,
                      marginTop: 2.2,
                      marginRight: 1,
                      color: newtheme.palette.secondary.footer,
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      marginBottom: 1,
                      marginTop: 2,
                      color: newtheme.palette.secondary.footer,
                    }}
                  >
                    JAVA Language
                  </Typography>
                </Box>

                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bolder", marginBottom: 1 }}
                >
                 Introduction to Java
                </Typography>
                <Typography className="cut-off-text" sx={{marginRight:1, marginBottom:2}}>this course is all about java this course is all about java and its basics of programming language.</Typography>
              </Box>
              <Box
                sx={{
                  textAlign: "start",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 0,
                  marginTop:2,
                  paddingTop:2,
                  paddingLeft: 1.5,
                  backgroundColor:'#f0f0f0',
                  borderBottomRightRadius:16,
                  borderBottomLeftRadius:16
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Diversity3OutlinedIcon
                    fontSize="medium"
                    sx={{
                      marginBottom: 2,
                      marginRight: 1,
                      marginLeft:2,
                      color: newtheme.palette.secondary.footer,
                    }}
                  />
                  <Typography sx={{ marginBottom: 2, fontSize: 16, fontWeight:'bolder',color: newtheme.palette.secondary.footer, }}>
                     50 Students
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography sx={{ marginBottom: 2, fontSize: 16, fontWeight:'bolder',color: newtheme.palette.secondary.background, }}>
                     Enroll Now
                  </Typography>
                  <KeyboardDoubleArrowRightOutlinedIcon
                    fontSize="medium"
                    sx={{
                      marginBottom: 2,
                      marginRight: 1,
                      color: newtheme.palette.secondary.background,
                    }}
                  />
                </Box>
              </Box>
            </Box>
              </Box>
            </Grid>
            
            
          </Grid>

        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default ViewAllCourses;
