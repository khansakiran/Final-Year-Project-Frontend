import React, { useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@emotion/react";
import http from "../../../../../Axios/axios";
import { useLocation } from "react-router-dom";
import storage from "../../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import newtheme from "../../../../Themenew";
import { ThemeProvider } from "@mui/material/styles";

const steps = ["Upload Solution", "Confirm Submission"];

export default function Submit() {
  const Questions = useLocation().state?.Questions;
  const format = useLocation().state?.format;
  const courseID = useLocation().state?.courseID;

  const AssignmentID = window.location.pathname.split("/").pop();

  const [index, setIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [userID, setUserId] = useState(null);
  const [questionDescription, setQuestionDescription] = useState(
    Questions[index].questionDescription
  );
  const [questionMarks, setQuestionMarks] = useState(
    Questions[index].questionTotalMarks
  );
  const [nextClick, setNextClick] = useState(false);
  const theme = useTheme();
  const nav = useNavigate();

  useEffect(() => {
    const userJSON = localStorage.getItem("User");
    const user = JSON.parse(userJSON);
    setUserId(user.userID._id);
  }, []);

  const handleClick = async () => {
    if (fileInput.current.value == "") {
      const confirmUpload = window.confirm(
        "No file selected. Do you want to continue without uploading a file?"
      );
      if (confirmUpload) {
        fileInput.current.value = "";
        const newIndex = index + 1;
        setIndex(newIndex);

        if (newIndex < Questions.length) {
          await setQuestionMarks(Questions[newIndex].questionTotalMarks);
          await setQuestionDescription(Questions[newIndex].questionDescription);
        }
      }
    } else {
      fileInput.current.value = "";
      const newIndex = index + 1;
      setIndex(newIndex);

      if (newIndex < Questions.length) {
        await setQuestionMarks(Questions[newIndex].questionTotalMarks);
        await setQuestionDescription(Questions[newIndex].questionDescription);
      }
    }
  };

  const handleSubmit = async () => {
    if (fileInput.current.value == "") {
      const confirmUpload = window.confirm(
        "No file selected. Do you want to continue without uploading a file?"
      );
      if (confirmUpload) {
        nav(`/Student/ViewUploadedAssig/${courseID}/${AssignmentID}`);
      }
    } else {
      nav(`/Student/ViewUploadedAssig/${courseID}/${AssignmentID}`);
    }
  };
  const fileInput = useRef(null);

  const action = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const selectedFiles = fileInput.current.files;

    if (selectedFiles.length > 0) {
      const FileSplit = selectedFiles[0].name.split(".");
      const FileFormat = `.${FileSplit[FileSplit.length - 1]}`;

      if (FileFormat === format) {
        const fileRef = ref(
          storage,
          `Submission/${AssignmentID}/${userID}/Q${index + 1}${format}`
        );
        const uploadTask = uploadBytesResumable(fileRef, selectedFiles[0]);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            let progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
          },
          (error) => {
            console.log("error");
          },
          () => {
            console.log("success!");
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              //useState
            });
          }
        );
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append("files", selectedFiles[i]);
        }
        let url;
        switch (format) {
          case ".py":
            url = `/submit/Python/${Questions[index]._id}`;
            break;
          case ".java":
            url = `/submit/Java/${Questions[index]._id}`;
            break;
          case ".c":
            url = `/submit/C/${Questions[index]._id}`;
            break;
          case ".cpp":
            url = `/submit/Cpp/${Questions[index]._id}`;
            break;
          default:
            break;
        }
        try {
          const response = await http.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log("File uploaded successfully:", response.data);
        } catch (error) {
          console.error("There was an error uploading the file:", error);
        }
      } else {
        alert(`File Format should be  ${format}`);
        fileInput.current.value = "";
      }
    } else {
      alert("Select File to Upload");
    }
  };

  return (
    <ThemeProvider theme={newtheme}>
      <Box sx={{ mt: "5%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "70%", marginTop: 7 }}>
            {index + 1 >= Questions.length && (
              <>
                <Stepper activeStep={1} alternativeLabel color="secondary">
                  {steps.map((label) => (
                    <Step
                      key={label}
                      sx={{
                        "& .MuiStepLabel-root .Mui-completed": {
                          color: "secondary.footer", // circle color (COMPLETED)
                        },
                        "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                          {
                            color: "secondary.footer", // Just text label (COMPLETED)
                          },
                        "& .MuiStepLabel-root .Mui-active": {
                          color: "secondary.footer", // circle color (ACTIVE)
                        },
                        "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                          {
                            color: "secondary.footer", // Just text label (ACTIVE)
                          },
                        "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                          fill: "primary.background", // circle's number (ACTIVE)
                        },
                      }}
                    >
                      <StepLabel sx={{ color: "red" }}>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </>
            )}
            {index + 1 < Questions.length && (
              <Stepper activeStep={0} alternativeLabel color="secondary">
                {steps.map((label) => (
                  <Step
                    key={label}
                    sx={{
                      "& .MuiStepLabel-root .Mui-completed": {
                        color: "secondary.footer", // circle color (COMPLETED)
                      },
                      "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                        {
                          color: "secondary.footer", // Just text label (COMPLETED)
                        },
                      "& .MuiStepLabel-root .Mui-active": {
                        color: "secondary.footer", // circle color (ACTIVE)
                      },
                      "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                        {
                          color: "secondary.footer", // Just text label (ACTIVE)
                        },
                      "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                        fill: "primary.background", // circle's number (ACTIVE)
                      },
                    }}
                  >
                    <StepLabel sx={{ color: "red" }}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}
          </Box>
        </Box>
        <Box sx={{ marginLeft: 5 }}>
          <Grid container spacing={2} sx={{ padding: "2%" }}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography variant="h4">Question # {index + 1}</Typography>
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ justifyContent: "flex-start" }}>
                  <Typography variant="h6" sx={{ fontStyle: "italic" }}>
                    {questionDescription}
                  </Typography>
                </Box>
                <Box sx={{ justifyContent: "flex-end" }}>
                  <Typography variant="h6">( {questionMarks} )</Typography>
                </Box>
              </Box>
            </Grid>

            <div className="container" style={{ paddingTop: "20px" }}>
              <form onSubmit={action} encType="multipart/form-data">
                <div
                  id="uploadForm"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <input
                    type="file"
                    name="files"
                    ref={fileInput}
                    className="btn btn-primary"
                    style={{ flex: 0.8 }}
                  />
                  <Button
                    type="Submit"
                    className="btn btn-primary"
                    sx={{
                      color: newtheme.palette.primary.background,
                      backgroundColor: newtheme.palette.secondary.footer,
                      fontWeight: "bold",

                      ":hover": {
                        backgroundColor: theme.palette.primary.background,
                        color: theme.palette.secondary.footer,
                      },
                      border: 1,
                      borderRadius: 2,
                      paddingLeft: 2,
                      paddingRight: 2,
                      paddingTop: 1.5,
                      paddingBottom: 1.5,
                    }}
                  >
                    Upload
                  </Button>
                </div>
              </form>
            </div>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              {index + 1 < Questions.length && (
                <Button
                  onClick={handleClick}
                  disabled={index + 1 < Questions.length ? false : true}
                  sx={{
                    color: theme.palette.secondary.text,
                    backgroundColor: theme.palette.secondary.main,
                    fontWeight: "bold",
                    boxShadow: 10,
                    my: 3,
                    ":hover": {
                      backgroundColor: theme.palette.secondary.hoverButton,
                      color: theme.palette.secondary.main,
                    },
                    border: 1,
                    borderRadius: 2,
                    paddingLeft: 1,
                    paddingRight: 1,
                    paddingTop: 1,
                    paddingBottom: 1,
                    borderColor: theme.palette.secondary.Button,
                  }}
                >
                  {"Next"}
                </Button>
              )}
              {index + 1 >= Questions.length && (
                <Button
                  onClick={handleSubmit}
                  sx={{
                    color: theme.palette.secondary.text,
                    backgroundColor: theme.palette.secondary.main,
                    fontWeight: "bold",
                    boxShadow: 10,
                    my: 3,
                    ":hover": {
                      backgroundColor: theme.palette.secondary.hoverButton,
                      color: theme.palette.secondary.main,
                    },
                    border: 1,
                    borderRadius: 2,
                    paddingLeft: 1,
                    paddingRight: 1,
                    paddingTop: 1,
                    paddingBottom: 1,
                    borderColor: theme.palette.secondary.Button,
                  }}
                >
                  {"Submit"}
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
