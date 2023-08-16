import { Box, Typography } from '@mui/material';
import { Entry, Diagnosis } from "../../types";
import Heart from '../Heart';

import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface EntriesProps {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

function assertNever(entry: never): import("react").ReactNode {
  throw new Error('Function not implemented.');
}

const SingleEntry = (props: {entry: Entry, diagnoses: Diagnosis[]}) => {
  const entry = props.entry;
  const diagnoses = props.diagnoses;
  // console.log(entry);
  return (
    <span key={entry.id}>
      <b>{entry.date}</b> &nbsp;
      {
        (() => {
          switch (entry.type) {
            case 'HealthCheck':
              return  <>
                        <MedicalServicesIcon /> <br/>
                        <i>{entry.description}</i> <br/>
                        <Heart num={entry.healthCheckRating} />
                      </>
            case 'OccupationalHealthcare':
              return  <>
                        <WorkIcon /> {entry.employerName} <br/>
                        <i>{entry.description}</i>
                      </>
            case 'Hospital':
              return <>
                      <LocalHospitalIcon /> <br/>
                      <i>{entry.description}</i>
                    </>
            default:
              return assertNever(entry);
          }
          }
        )()
      }
      <br/>
      {
        entry.diagnosisCodes
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
        : null
      }
      diagnose by {entry.specialist}
    </span>
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
            display: 'flex', paddingTop: 0,
            paddingLeft: 1,
            paddingBottom: 0,
            border: 'solid',
            borderWidth: 1,
            borderRadius: 2,
            marginBottom: 1
          }}>
            <Typography  component={'span'} align="left" variant="body1" >
              <SingleEntry entry={entry} diagnoses={diagnoses} />
            </Typography>
          </Box>
        )}
      )}
    </>
  )
}

export default Entries;