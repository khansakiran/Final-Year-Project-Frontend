import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimilarityResult from './PlagiarismScreen';
import storage from '../../../firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import http from "../../../../Axios/axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AirRounded } from '@mui/icons-material';
import {Box,Typography} from '@mui/material';
import { FiDownload } from "react-icons/fi";

import { useLocation } from "react-router-dom";

const FileUploadForm = () => {
    const navigate = useNavigate();
  const [fileA, setFileA] = useState(null);
  const [fileB, setFileB] = useState(null);
  const [result, setResult] = useState([]);
  const [Name, setName] = useState([]);
  const [currQuestion , setCurrQuestion] = useState([])  
  const [questionIds , setQuestionIds] = useState([])
  const [userID, setUserId] = useState(null);
  const [students_for_comparison , setStudents_for_comparison] = useState(null)
  const [noOneSubmitted , setNoOneSubmitted] = useState(false)
  const  { aid } = useParams()

  const totalQuestions = useLocation().state?.totalQuestions;
  const format = useLocation().state?.format;
  const questions = useLocation().state?.questions


  const fetchStudentIDS = async (Uid) =>{
    const res = await http.get(`/assignment/getStudentIds/${aid}`)
    // console.log(res.data.studentInfo)
      const students = res.data.studentInfo.filter(student =>  
        student.id  != Uid
      )
       setStudents_for_comparison(students)
       if(students.length == 0) {
        setNoOneSubmitted(true)
      } 
  }

  useEffect(() => {
    const userJSON = localStorage.getItem("User");
    const user = JSON.parse(userJSON);
    setUserId(user.userID._id);
    fetchStudentIDS(user.userID._id)
    setQuestionIds(questions.map(question => question._id))
  }, []);

  const fetchFile_to_be_checked = async (AssignmentID,index, format) => {
    try {
      const fileRef = ref(
        storage,
        `Submission/${AssignmentID}/${userID}/Q${index + 1}${format}`
      );

      const downloadURL = await getDownloadURL(fileRef);
      //console.log('Download URL:', downloadURL);

      const response = await fetch(downloadURL);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const fileBlob = await response.blob();
     // console.log(`File: ${fileBlob}`);

      const customFileObject = new File([fileBlob], `Q${index + 1}${format}`, {
        type: fileBlob.type,
        lastModified: new Date().getTime(), 
      });

      setFileA(customFileObject);
    //  console.log('File fetched successfully.');
      
      return customFileObject
    } catch (error) {
      console.error('Error fetching file:', error);
      return null
    }
  };

  const fetchFile_for_comaprison = async (AssignmentID, userID, index, format) => {
  try {
    const fileRef = ref(
      storage,
      `Submission/${AssignmentID}/${userID}/Q${index + 1}${format}`
    );

    const downloadURL = await getDownloadURL(fileRef);
    //console.log('Download URL:', downloadURL);

    
    const response = await fetch(downloadURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const fileBlob = await response.blob();
    const customFileObject = new File([fileBlob], `Q${index + 1}${format}`, {
      type: fileBlob.type,
      lastModified: new Date().getTime(), 
    });

    setFileB(customFileObject);
    return customFileObject;

  } 
  catch (error) {
    console.error('Error fetching file:', error);
    return null
  }
};
 
  const handleSubmit = async () => {

    if(students_for_comparison.length == 0) {
      alert('No one else has submitted')
    } 

    else {
      const maxArr = [];
    
      for (let index = 0; index < totalQuestions; index++) {
        let maxSimilarityPercentage = 0;
    
        setFileA(null);
        const a = await fetchFile_to_be_checked(aid, index, format);
    
        for (let j = 0; j < students_for_comparison.length; j++) {
          try {
            setFileB(null);
            const b = await fetchFile_for_comaprison(aid, students_for_comparison[j].id, index, format);
    
            const formDataB = new FormData();
            formDataB.append('file_a', a);
            formDataB.append('file_b', b);
    
            const responseB = await axios.post('http://127.0.0.1:8000/get_plagiarism', formDataB, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
    
            maxSimilarityPercentage = Math.max(maxSimilarityPercentage, responseB.data.similarity_percentage);
    
            setCurrQuestion((prevResult) => [...prevResult, index + 1]);
            setName((prevResult) => [...prevResult, students_for_comparison[j].name]);
            setResult((prevResult) => [...prevResult, responseB.data]);
          } catch (error) {
            console.error('Error uploading files:', error);
          }
        }
    
        maxArr.push(maxSimilarityPercentage);
      }
    
      console.log('Max Similarity Percentages:', maxArr);
    
      // mean of maxArr
      const Overall_PlagiarismPercentage = maxArr.reduce((sum, value) => sum + value, 0) / totalQuestions;
    
      console.log('Overall Plagiarism Percentage:', Overall_PlagiarismPercentage);
    
      for (let index = 0; index < totalQuestions; index++) {
        let plag = maxArr[index];
        try {
          const res = await http.put(`/Plagiarism/updateSubmission/${questionIds[index]}`, { plag });
          console.log(res.data);
        } catch (error) {
          console.error('Error ', error);
        }
      }
      let Checked_With_No_Of_Submissions = students_for_comparison.length

      console.log(Checked_With_No_Of_Submissions)
      const res = await http.post('/Plagiarism/makePlagReport' ,
       {aid , Overall_PlagiarismPercentage ,Checked_With_No_Of_Submissions })

       console.log(res.data)
    }
    
    
  };
  
  

  return (
    <div>
       <Box sx={{
         marginRight:'7%',display:'flex',
         flexDirection:'row',
         justifyContent:'flex-end'}}>
      <Button onClick={handleSubmit} sx={{backgroundColor:'#1665b5',
      color:'white', fontWeight:'bold', padding:3, borderRadius:10, 
      marginRight:7, fontFamily:'nunito, sans-serif', 
       marginBottom: noOneSubmitted ?'3%' : '10%',
      ":hover":{backgroundColor:'#1665b5',color:'white'}}}
      disabled = {noOneSubmitted}
      >
          Check Plagiarism
      </Button>
      
      </Box>
      <>
      {
        noOneSubmitted && 
        (
          <Box sx={{
            display:'flex',
              flexDirection:'row',
              justifyContent:'center',
              padding : '2%'
            }}
          >
            <Typography variant='h4'>
                No one Else has submitted
            </Typography>
          </Box>
        )
      }
      </>
      {
        result.length > 0 &&
        <>
          <Box sx={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
        <Button startIcon={<FiDownload/>} sx={{backgroundColor:'#1665b5',color:'white', fontWeight:'bold', padding:2, borderRadius:10, marginRight:7, fontFamily:'nunito, sans-serif', ":hover":{backgroundColor:'#1665b5',color:'white'}}}>
          Download Report
        </Button>
      </Box>
        <Box>
        <p
          style={{
            fontWeight: "bold",
            marginTop: 5,
            marginBottom: 45,
            fontSize: 25,
            marginLeft: 9,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <span className="underline">Plagiarism Scan Report</span>
        </p>
      </Box>
    
      </>
      }
          {result.map((res, index) => (
        <div key={index}>
          <pre>
            <SimilarityResult
            similarityPercentage={res['similarity_percentage']}
            fileAContent={res['file_a_content']}
            similarContent={res['similar_content']}
            stuName = {Name[index]}
            currQuestion = {currQuestion[index]}
          />
          </pre>
        </div>
      ))}
    </div>
  );
};

export default FileUploadForm;
