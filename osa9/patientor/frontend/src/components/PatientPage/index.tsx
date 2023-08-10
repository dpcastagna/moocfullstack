import { useState, useEffect } from "react";
 import { Box, /* Table, Button, TableHead, */ Typography, /* TableCell, TableRow, TableBody  */} from '@mui/material';
// import axios from 'axios';

import { /* PatientFormValues, */ Patient } from "../../types";

import patientService from "../../services/patients";
import { useParams } from "react-router-dom";

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';


const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const id: string | undefined = useParams().id as string;
  
  useEffect(() => {
    const fetchData = async () => {
      const response= await patientService.findById(id);
      setPatient(response);
    };
    fetchData();
  }, [id]);

  // console.log(id, patient);
  if (!patient) {
    return <div>Loading...</div>
  }
  return (
    <div className="App">
      <Box>
        <Typography align="left" variant="h6">
          <br/>
          <strong>{patient.name}</strong> &nbsp;
          {patient.gender === 'male' ? <MaleIcon /> : patient.gender === 'female' ? <FemaleIcon /> : <QuestionMarkIcon />}<br/>
          <br/>
          ssn: {patient.ssn}<br/>
          occupation: {patient.occupation}
        </Typography>
      </Box>
      
    </div>
  );
};

export default PatientPage;
