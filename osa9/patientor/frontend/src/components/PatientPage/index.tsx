import { useState, useEffect } from "react";
import { Box, /* Table, Button, TableHead, */ Typography, Button /* TableCell, TableRow, TableBody  */} from '@mui/material';
// import axios from 'axios';

import { /* PatientFormValues, */ Patient, Entry, Diagnosis } from "../../types";

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
  const [formType, setFormType] = useState<number>(0);
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
  }, [id]);

  const onSubmit = () => {
    console.log('submit');
  };
  const onClose = () => {
    console.log('close');
  };
  const formButtonClick = (num: number) => {
    setFormType(num);
  }

  console.log(id, patient, entries, diagnoses, formType);
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
        <Box>
          { formType === 0
            ? <>
              <Button
                color="error"
                variant="contained"
                style={{ float: "none" }}
                type="button"
                onClick={() => {formButtonClick(1)}}
              >
                New Hospital Entry
              </Button>
              &nbsp;
              <Button
                color="success"
                style={{ float: "none" }}
                type="button"
                variant="contained"
                onClick={() => {formButtonClick(2)}}
              >
                New Occupational Healthcare Entry
              </Button>
              &nbsp;
              <Button
                color="secondary"
                style={{ float: "none" }}
                type="button"
                variant="contained"
                onClick={() => {formButtonClick(3)}}
              >
                New Healthcheck Entry
              </Button>
            </>
            : <>
                <Button
                  color="warning"
                  style={{ float: "none" }}
                  type="button"
                  variant="contained"
                  onClick={() => {formButtonClick(0)}}
                >
                  Cancel New Entry
                </Button>
                <br/><br/>
              </>
          }
        </Box>
        
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose} formType={formType} />

        { entries && entries.length > 0
          ? <Entries entries={entries} diagnoses={diagnoses as Diagnosis[]} />
          : null
        }
      </Box>
    </div>
  );
};

export default PatientPage;
