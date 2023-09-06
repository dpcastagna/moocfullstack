import { useState, useEffect } from "react";
import { Box, Typography } from '@mui/material';

import { Patient, Entry, Diagnosis } from "../../types";

import patientService from "../../services/patients";
import diagnosisService from '../../services/diagnoses'
import { useParams } from "react-router-dom";
import Entries from './Entries';
import AddEntryForm from './AddEntryForm';

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';


const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [entries, setEntries] = useState<Entry[]>();
  const [diagnoses,setDiagnoses] = useState<Diagnosis[]>();
  const id: string | undefined = useParams().id as string;
  
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
  }, [id, entries?.length]);

  if (!patient) {
    return <div>Loading...</div>
  }
  return (
    <div className="App">
      <Box>
        <Typography align="left" variant="h4">
          <br/>
          <strong>{patient.name} &nbsp;
            {
              patient.gender === 'male'
                ? <MaleIcon fontSize="large" />
                : patient.gender === 'female'
                  ? <FemaleIcon fontSize="large" />
                  : <QuestionMarkIcon fontSize="large" />
            }
          </strong>
          <br/>
        </Typography>

        <Typography align="left" variant="body1">
          ssn: {patient.ssn}<br/>
          occupation: {patient.occupation}
        </Typography>
        <br/>
        
        <AddEntryForm entries={entries as Entry[]} setEntries={setEntries as React.Dispatch<React.SetStateAction<Entry[]>>} diagnoses={diagnoses as Diagnosis[]} />

        { entries && entries.length > 0
          ? <Entries entries={entries} diagnoses={diagnoses as Diagnosis[]} />
          : <></>
        }
      </Box>
    </div>
  );
};

export default PatientPage;
