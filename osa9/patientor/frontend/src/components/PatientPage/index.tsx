import React, { useState } from "react";
 import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
// import axios from 'axios';

import { /* PatientFormValues, */ Patient } from "../../types";

import patientService from "../../services/patients";
import { useParams } from "react-router-dom";

interface Props {
  patients: Patient[]
}

const PatientPage = async ({ patients } : Props ) => {
  const id: string | undefined = useParams().id;

  if (!id) {
    return <div>Unknown patient</div>}
  
  const patient  = await patientService.findById(id);
  
  if (!patient) {
    return <div>Loading...</div>
  }
  // const patient: Patient | undefined = patients.find(p => {return p.id === id});
  console.log(id, patient);
  
  return (
    <div className="App">
      <Box>
        <Typography align="left" variant="h6">
          <br/>
          <strong>{patient.name}</strong> {patient.gender}<br/>
          <br/>
          ssn: {patient.ssn}<br/>
          occupation: {patient.occupation}
        </Typography>
      </Box>
      
    </div>
  );
};

export default PatientPage;
