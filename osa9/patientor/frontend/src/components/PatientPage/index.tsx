import { useState, useEffect } from "react";
import { Box, /* Table, Button, TableHead, */ Typography, /* TableCell, TableRow, TableBody  */} from '@mui/material';
// import axios from 'axios';

import { /* PatientFormValues, */ Patient, Entry, Diagnosis } from "../../types";

import patientService from "../../services/patients";
import diagnosisService from '../../services/diagnoses'
import { useParams } from "react-router-dom";
import Entries from './Entries';

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';


const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const id: string | undefined = useParams().id as string;
  const [entries, setEntries] = useState<Entry[]>();
  const [diagnoses,setDiagnoses] = useState<Diagnosis[]>();
  
  useEffect(() => {
    const fetchData = async () => {
      const diagnosesResponse: Diagnosis[] = await diagnosisService.getAll();
      if (diagnosesResponse) {
        setDiagnoses(diagnosesResponse);
      }

      const patientResponse: Patient | undefined = await patientService.findById(id);
      setPatient(patientResponse);
      if (patientResponse) {
        setEntries(patientResponse.entries);
      };
    };
    fetchData();
  }, [id]);

  console.log(id, patient, entries, diagnoses);
  if (!patient) {
    return <div>Loading...</div>
  }
  return (
    <div className="App">
      <Box>
        <Typography align="left" variant="h4">
          <br/>
          <strong>{patient.name} &nbsp;
            {patient.gender === 'male' ? <MaleIcon /> : patient.gender === 'female' ? <FemaleIcon /> : <QuestionMarkIcon />}
          </strong>
          <br/>
          <br/>
        </Typography>
        <Typography align="left" variant="body1">
          ssn: {patient.ssn}<br/>
          occupation: {patient.occupation}
        </Typography>
        { entries && entries.length > 0
          ? <Entries entries={entries} diagnoses={diagnoses as Diagnosis[]} />
          : null
        }
      </Box>
    </div>
  );
};

export default PatientPage;
