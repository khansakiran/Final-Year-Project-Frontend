import DrawerAppBar from "./Navbar";
import React, { useRef, useEffect, useState } from 'react';
import { Box, Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import { useTheme } from "@emotion/react";
import { ThemeProvider } from '@mui/material/styles';
import startImage from '../../assets/start.jpg';
import javaImage from '../../assets/java.jpg';
import cppImage from '../../assets/cpp.png';
import cImage from '../../assets/clang.png';
import csharpImage from '../../assets/csharp.jpg';
import pythonImage from '../../assets/python.png';
import asmImage from '../../assets/asm.png';
import newtheme from '../../Themenew'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Link from "@mui/material/Link";
import GroupsIcon from '@mui/icons-material/Groups';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { keyframes } from '@mui/system';
import CourseCard from '../Student/Course/CourseCard'
import Grid from '@mui/material/Unstable_Grid2';

function StartPage() {
  // const newtheme = useTheme()

  const courses = [{
    student: 40,
    name: 'Data Science',
    image: 'https://egrad.wpengine.com/wp-content/uploads/2022/11/course02-640x430.jpg',
    description: 'Tortor nunc faucibus a pellentesque sit amet porttitor eget. Sit amet mauris commodoquis imperdiet massa tincidunt nunc. Quis blandit turpis cursus in hac habitasse.',
    credits: 3,
    lectures: 15,
    teacher: "Faisal"
  },
  {
    student: 40,
    name: 'Data Science',
    image: 'https://egrad.wpengine.com/wp-content/uploads/2022/11/course01-640x430.jpg',
    description: 'Tortor nunc faucibus a pellentesque sit amet porttitor eget. Sit amet mauris commodoquis imperdiet massa tincidunt nunc. Quis blandit turpis cursus in hac habitasse.',
    credits: 3,
    lectures: 15,
    teacher: "Faisal"
  },
  {
    student: 40,
    name: 'Data Science',
    image: 'https://egrad.wpengine.com/wp-content/uploads/2022/11/course03-1-640x430.jpg',
    description: 'Tortor nunc faucibus a pellentesque sit amet porttitor eget. Sit amet mauris commodoquis imperdiet massa tincidunt nunc. Quis blandit turpis cursus in hac habitasse.',
    credits: 3,
    lectures: 15,
    teacher: "Faisal"
  }];

  const boxRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const boxRef2 = useRef(null);
  const [isVisible2, setIsVisible2] = useState(false);
  const boxRef3 = useRef(null);
  const [isVisible3, setIsVisible3] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible3(true);
    }, 100);

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.5],
    };


    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    };
    const handleIntersection2 = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible2(true);
        }
      });


    };

    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(boxRef.current);

    const observer2 = new IntersectionObserver(handleIntersection2, options);
    observer2.observe(boxRef2.current);


    return () => {
      clearTimeout(timer);
      observer.unobserve(boxRef.current);
      observer2.unobserve(boxRef2.current);

    };
  }, []);


  const animation = keyframes`
   0% { transform: translateX(-100%); opacity: 0; }
   100% { transform: translateX(0); opacity: 1; }
  `;
  return (
    <ThemeProvider theme={newtheme}>
      <Box sx={{
        backgroundColor: newtheme.palette.secondary.main,
        paddingTop: '10%',
        paddingLeft: '2%',
        display: 'flex',
        flexDirection: 'row',
      }}
      >
        <Box sx={{ padding: '3%' }}> <Typography variant='h3' sx={{ fontWeight: 'bold', marginBottom: 3, fontStyle: 'oblique' }}>
          The future depends on what you do today.</Typography>

          <Typography variant='p' >
            ProGrade provides grading code-based assignments by providing an automated grading system. The application
            will provide other useful features such as plagiarism checking, code compiler and course management.</Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 4 }}>
            <GroupsIcon fontSize="large" style={{ color: newtheme.palette.secondary.background, marginRight: '1%' }} />
            <Typography variant='h6' sx={{ fontWeight: 'bold' }} >
              Over 2k Students
            </Typography>
            <LibraryBooksIcon fontSize="large" style={{ marginLeft: '7%', color: newtheme.palette.secondary.background, marginRight: '1%' }} />
            <Typography variant='h6' sx={{ fontWeight: 'bold' }} >

              20+ Courses
            </Typography>

          </ Box>
          <Box sx={{ marginTop: 7 }}>
            <Button sx={{ ':hover': { backgroundColor: newtheme.palette.secondary.footer }, border: 2, borderRadius: 10, paddingLeft: 4, paddingRight: 4, paddingTop: 2, paddingBottom: 2, backgroundColor: newtheme.palette.secondary.background, color: newtheme.palette.primary.background }}>
              Join Now!
            </Button>
          </Box>
        </ Box>

        <Box ref={boxRef3} sx={{
          opacity: isVisible3 ? 1 : 0,
          transform: isVisible3 ? 'translateX(0)' : 'translateX(100%)',
          transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
        }}>  <img src={startImage} height='490' style={{ borderRadius: 15, marginBottom: 2 }} />
        </Box>
      </Box>

      
      <Box sx={{
        backgroundColor: newtheme.palette.primary.background,
        paddingTop: '2%',
        display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        <Box >
          <Typography variant='h6' sx={{ fontWeight: 'bold', color: newtheme.palette.secondary.background }}>
            Our Top Courses</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1%' }}>
        <Typography variant='h3' sx={{ fontWeight: 'bold' }}>
          Learn Best Things
        </Typography>
      </Box>


      <Box sx={{ overflow: 'hidden' }}>
        <Box ref={boxRef2}
          sx={{
            paddingTop: '1%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: '2%',

            opacity: isVisible2 ? 1 : 0,
            transform: isVisible2 ? 'translateX(0)' : 'translateX(100%)',
            transition: 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out',
          }}
        >

          <Box sx={{ display: 'flex', flexDirection: 'column', width: '20%', alignItems: 'center', backgroundColor: '#ecf8ec', borderRadius: 12 }}>
            <img src='https://cdn.pixabay.com/photo/2017/03/30/17/43/c-2189150_1280.png' height={'60%'} width={210} style={{ marginTop: 16 }} />
            <Link href='#' sx={{
              textDecoration: 'none'
              , color: newtheme.palette.secondary.background, '&:hover': {
                color: newtheme.palette.secondary.footer,
              }, marginBottom: 2

            }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: '5%', color: 'black' }}>
                Cpp
              </Typography>
            </Link>
            <Typography variant='h6' sx={{ color: '#6ebe6e', fontWeight: 'bolder' }} >4 Courses</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', width: '20%', alignItems: 'center', backgroundColor: '#ffd1ce', borderRadius: 12 }}>
            <img src='https://cdn-icons-png.flaticon.com/512/3664/3664988.png' height={'60%'} width={190} style={{ marginTop: 16 }} />
            <Link href='#' sx={{
              textDecoration: 'none', marginTop: '6%'
              , color: newtheme.palette.secondary.background, '&:hover': {
                color: newtheme.palette.secondary.footer,
              },
              marginBottom: "3%"
            }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', color: 'black' }}>Java</Typography>
            </Link>
            <Typography variant='h6' sx={{ color: '#ff2712', fontWeight: 'bolder' }}>8 Courses</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', width: '20%', alignItems: 'center', backgroundColor: '#eef6fa', borderRadius: 12 }}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Eo_circle_blue_white_letter-c.svg/1200px-Eo_circle_blue_white_letter-c.svg.png' height={'60%'} width={'60%'} style={{ marginTop: 16 }} />
            <Link href='#' sx={{
              textDecoration: 'none', marginTop: '6%'
              , color: newtheme.palette.secondary.background, '&:hover': {
                color: newtheme.palette.secondary.footer,
              },
              marginBottom: "3%"
            }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', color: 'black' }}>C</Typography>
            </Link>
            <Typography variant='h6' sx={{ color: '#43ade3', fontWeight: 'bolder' }}>9 Courses</Typography>
          </Box>
        </Box>
      </Box>
      <Box 
        ref={boxRef2}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: '5%',
          opacity: isVisible2 ? 1 : 0,
          transform: isVisible2 ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '21%', alignItems: 'center', backgroundColor: '#feecf4', borderRadius: 12 }}>
          <img height={'60%'} width={190} style={{ marginTop: 16 }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Eo_circle_pink_letter-p.svg/768px-Eo_circle_pink_letter-p.svg.png" />
          <Link href='#' sx={{
            textDecoration: 'none', marginTop: '6%'
            , color: newtheme.palette.secondary.background, '&:hover': {
              color: newtheme.palette.secondary.footer,
            },
            marginBottom: "3%"
          }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', color: 'black' }}>Python</Typography>
          </Link>
          <Typography variant='h6' sx={{ color: '#e05193', fontWeight: 'bolder' }}>14 Courses</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '20%', alignItems: 'center', backgroundColor: '#fffceb', borderRadius: 12 }}>
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Eo_circle_yellow_letter-c.svg/800px-Eo_circle_yellow_letter-c.svg.png' height={'60%'} width={190} style={{ marginTop: 16 }} />
          <Link href='#' sx={{
            textDecoration: 'none', marginTop: '6%'
            , color: newtheme.palette.secondary.background, '&:hover': {
              color: newtheme.palette.secondary.footer,
            },
            marginBottom: "3%"
          }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', color: 'black' }}>
              CSharp
            </Typography>
          </Link>
          <Typography variant='h6' sx={{ color: '#f2c900', fontWeight: 'bolder' }}>12 Courses</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '20%', alignItems: 'center', backgroundColor: '#eaf9f9', borderRadius: 12 }}>
          <img src='https://png.pngtree.com/png-vector/20190409/ourmid/pngtree-asm-file-document-icon-png-image_923237.jpg' height={'60%'} width={190} style={{ marginTop: 16, borderRadius: 200 }} />
          <Link href='#' sx={{
            textDecoration: 'none', marginTop: '6%'
            , color: newtheme.palette.secondary.background, '&:hover': {
              color: newtheme.palette.secondary.footer,
            },
            marginBottom: "3%"
          }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', color: 'black' }}>Masm/Nasm</Typography>
          </Link>
          <Typography variant='h6' sx={{ color: '#4cacab', fontWeight: 'bolder' }}>15 Courses</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 7, alignItems: 'center', marginBottom: 5 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: newtheme.palette.primary.background,
            '&:hover': {
              backgroundColor: newtheme.palette.secondary.footer,
              color: newtheme.palette.primary.background,
              border: '2px solid #2a3290'
            },
            paddingLeft: 4, paddingRight: 4, paddingTop: 2, paddingBottom: 2, fontSize: 16, fontWeight: 'bold', borderRadius: 10, color: newtheme.palette.secondary.background, border: '2px solid #ff2712'
          }} >
          View All
        </Button>
      </Box>




      <Box sx={{ backgroundColor: '#f7ece3' }}>
        <Box sx={{ animation: `${animation} 1s ease-in-out 3`, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4, marginBottom: 4 }}>
          <Box >
            <Typography variant='h6' sx={{ fontWeight: 'bold', color: newtheme.palette.secondary.background, marginTop: 10 }}>
              Pick Course as per your Area of Interest</Typography>
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>Most Famous Online Courses</Typography>
        </Box>
        <Box className="courseMain_container">
          {courses.map((course) => {
            return <CourseCard course={course}></CourseCard>
          })}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 7, alignItems: 'center', marginBottom: 7 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: newtheme.palette.primary.background,
              '&:hover': {
                backgroundColor: newtheme.palette.secondary.footer,
                color: newtheme.palette.primary.background,
                border: '2px solid #2a3290'
              }, marginBottom: 10,
              paddingLeft: 4, paddingRight: 4, paddingTop: 2, paddingBottom: 2, fontSize: 16, fontWeight: 'bold', borderRadius: 10, color: newtheme.palette.secondary.background, border: '2px solid #ff2712'
            }} >
            View More
          </Button>
        </Box>
      </Box>



      <Box>
        <Grid container spacing={2}>
          <Grid lg={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Box sx={{ fontWeight: 'bold', margin: 4 }}>
              <Card sx={{ minWidth: 345, marginRight: 1, marginBottom: 4, backgroundColor: '#93e9c1', color: 'white', borderRadius: 10 }}>
                <CardActionArea sx={{ display: 'flex', flexDirection: 'row', }}>
                  <Box>
                    <CardContent sx={{ marginTop: 6, marginLeft: 4 }}>
                      <Typography sx={{ fontWeight: 'bolder', color: 'black' }} gutterBottom variant="h2" component="div">
                        Apply Your Courses Today
                      </Typography>
                      <Typography sx={{ color: 'red', marginBottom: 6, marginRight: 16 }} variant="h6" color="text.secondary">
                        Join in Your Favorite Courses Today and get quick feedback of your Coding assignments!
                      </Typography>
                    </CardContent>
                  </Box>
                  <Box sx={{ marginRight: 4 }}>
                    <Button sx={{ color: 'black', backgroundColor: '#feb227', paddingTop: 2, paddingBottom: 2, paddingLeft: 6, paddingRight: 6, borderRadius: 4, ":hover": { backgroundColor: "#feb227", color: 'black' } }}>Apply Now</Button>
                  </Box>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>



      <Box>
        <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Box sx={{ animation: `${animation} 1s ease-in-out 3`, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4, }}>
            <Box >
              <Typography variant='h6' sx={{ fontWeight: 'bold', color: newtheme.palette.secondary.background, }}>
                Why Ours</Typography>
            </Box>
            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
              Our Best Achievements</Typography>
          </Box>
          <Grid md={12} sx={{ marginTop: 4, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Box sx={{ fontWeight: 'bold', display: 'flex', flexDirection: 'row', textAlign: 'center', margin: 4 }}>
              <Card sx={{ minWidth: 345, marginRight: 1, marginBottom: 4, backgroundColor: '#fbe5e5', color: 'white', borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }}>
                <CardActionArea sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }} data-aos="fade-up">

                  <CardContent sx={{ marginTop: 8 }}>
                    <Typography sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom variant="h1" component="div">
                      56
                    </Typography>
                    <Typography sx={{ color: 'red', marginBottom: 4 }} variant="h4" color="text.secondary">
                      Happy Clients
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card sx={{ minWidth: 345, marginRight: 1, marginBottom: 4, backgroundColor: '#fbe5e5', color: 'white' }}>
                <CardActionArea sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }} data-aos="fade-up">

                  <CardContent sx={{ marginTop: 8 }}>
                    <Typography sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom variant="h1" component="div">
                      87
                    </Typography>
                    <Typography sx={{ color: 'red', marginBottom: 4 }} variant="h4" color="text.secondary">
                      Projects Done
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card sx={{ minWidth: 345, marginRight: 1, marginBottom: 4, backgroundColor: '#fbe5e5', color: 'white' }}>
                <CardActionArea sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }} data-aos="fade-up">

                  <CardContent sx={{ marginTop: 8 }}>
                    <Typography sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom variant="h1" component="div">
                      16
                    </Typography>
                    <Typography sx={{ color: 'red', marginBottom: 4 }} variant="h4" color="text.secondary">
                      Awards Winning
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card sx={{ minWidth: 345, marginBottom: 4, backgroundColor: '#fbe5e5', color: 'white', borderTopRightRadius: 30, borderBottomRightRadius: 30 }}>
                <CardActionArea sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }} data-aos="fade-up">

                  <CardContent sx={{ marginTop: 8 }}>
                    <Typography sx={{ fontWeight: 'bold', color: 'black' }} gutterBottom variant="h1" component="div">
                      7
                    </Typography>
                    <Typography sx={{ color: 'red', marginBottom: 4 }} variant="h4" color="text.secondary">
                      Years Experience
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

            </Box>
          </Grid>
        </Grid>
      </Box>



      <Box ref={boxRef}
        sx={{
          backgroundColor: newtheme.palette.secondary.cardBg,
          padding: '4%',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
        }}>
        <Typography variant='h4' sx={{ textAlign: 'center', fontWeight: 'bold', paddingBottom: '3%' }}>About Us</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <Box
            sx={{
              backgroundColor: newtheme.palette.secondary.card1,
              padding: '2%',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              margin: '1%',
              borderRadius: '5%',
              transition: '0.3s',
              '&:hover': {
                backgroundColor: newtheme.palette.secondary.main,
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
              },
            }}
          >
            <LibraryBooksIcon sx={{ fontSize: '4rem', color: newtheme.palette.secondary.background, marginBottom: '7.5%' }} />
            <Typography variant="h5" sx={{
              fontWeight: 'bold', textAlign: "center"
            }}>Grading Criteria</Typography>
            <Typography sx={{
              textAlign: "center", padding: '3%', marginTop: '2%'
            }} >
              Dictum varius duis at consectetur lorem donec massa sapien faucibus morbi tempus.
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: newtheme.palette.secondary.card2,
              padding: '2%',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              margin: '1%',
              borderRadius: '5%',
              transition: '0.3s',
              '&:hover': {
                backgroundColor: newtheme.palette.secondary.main,
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
              },
            }}
          >
            <LibraryBooksIcon sx={{ fontSize: '4rem', color: newtheme.palette.secondary.background, marginBottom: '7.5%' }} />
            <Typography variant="h5" sx={{
              fontWeight: 'bold',
            }}>Automatic Feedback</Typography>
            <Typography sx={{
              padding: '3%', marginTop: '2%'
            }}>
              Dictum varius duis at consectetur lorem donec massa sapien faucibus morbi tempus.
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: newtheme.palette.secondary.card3,
              padding: '2%',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              margin: '1%',
              borderRadius: '5%',
              transition: '0.3s',
              '&:hover': {
                backgroundColor: newtheme.palette.secondary.main, // Change the background color on hover
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)', // Add shadow on hover
              },
            }}
          ><LibraryBooksIcon sx={{ fontSize: '4rem', color: newtheme.palette.secondary.background, marginBottom: '7.5%' }} />
            <Typography variant="h5" sx={{
              fontWeight: 'bold',
            }}>TestCases Automation</Typography>
            <Typography sx={{
              padding: '3%', marginTop: '2%'
            }}>
              Dictum varius duis at consectetur lorem donec massa sapien faucibus morbi tempus.
            </Typography>

          </Box>
        </Box>
      </Box>


    </ThemeProvider>
  )
}
export default StartPage
