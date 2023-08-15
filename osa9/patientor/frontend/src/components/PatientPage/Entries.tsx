// import { useState, useEffect } from "react";
 import { Box, /* Table, Button, TableHead, */ Typography, /* TableCell, TableRow, TableBody  */} from '@mui/material';
// import axios from 'axios';
import { /* PatientFormValues, Patient, */ Entry, Diagnosis } from "../../types";

import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface EntriesProps {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const SingleEntry = (props: {entry: Entry}) => {
  const part = props.entry;
  console.log(part);
  return (
    <p key={part.id}>
      <b>{part.date}</b> &nbsp;
      { 
        (() => {
          switch (part.type) {
            case 'HealthCheck':
              return  <>
                        <MedicalServicesIcon /> <br/>
                        <i>{part.description}</i>
                      </>
            case 'OccupationalHealthcare':
              return  <>
                        <WorkIcon /> {part.employerName} <br/>
                        <i>{part.description}</i>
                      </>
            case 'Hospital':
              return <>
                      <LocalHospitalIcon /> <br/>
                      <i>{part.description}</i>
                    </>
            default:
              return <></>;
          }
          }
        )()
      }
    </p>
  )
}


const Entries = (props: EntriesProps) => {
  const entries = props.entries;
  const diagnoses = props.diagnoses;

  return (
    <>
      <Typography align="left" variant="h5">
        <br/>
        <strong>entries</strong>
        <br/>
        <br/>
      </Typography>
      {entries.map(entry => {
        return (
          <Box key={entry.id} sx={{
            display: 'flex', paddingTop: 2,
            paddingLeft: 1,
            paddingBottom: 2,
            border: 'solid',
            borderWidth: 1,
            borderRadius: 2,
            marginBottom: 5 
          }}>
            <Typography  component={'span'} align="left" variant="body1" >
              {entry.date} <i>{entry.description}</i>
              {entry.diagnosisCodes
              ? <ul>
                  {
                    entry.diagnosisCodes.map((code) => {
                      const diagnosis: Diagnosis = diagnoses?.find(d => d.code === code) as Diagnosis;
                      return (
                        <li key={diagnosis.code}>{diagnosis.code} {diagnosis.name}</li>
                      )
                    })
                  }
                </ul>
              : null}
              <br/>
              <SingleEntry entry={entry} />
            </Typography>
          </Box>
        )}
      )}
    </>
  )
}

export default Entries;