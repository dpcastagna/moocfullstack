import { useState, SyntheticEvent, SetStateAction } from "react";
import { useParams } from 'react-router-dom';
import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, Box, Typography } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import ErrorIcon from '@mui/icons-material/Error';

import axios from 'axios';
import patientService from "../../services/patients";

import { HealthCheckFormValues, OccupationalHealthcareFormValues, HospitalFormValues, Entry, Diagnosis/* , Gender  */} from "../../types";

interface AddEntryFormProps {
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  diagnoses: Diagnosis[];
};

interface BaseFormProps {
  description: string;
  setDescription: (value: React.SetStateAction<string>) => void;
  date: string;
  setDate: (value: React.SetStateAction<string>) => void;
  specialist: string;
  setSpecialist: (value: React.SetStateAction<string>) => void;
  diagnosisCodes: string[];
  setDiagnosisCodes: (value: React.SetStateAction<string[]>) => void;
  newCode: string;
  setNewCode: (value: React.SetStateAction<string>) => void;
  diagnoses: Diagnosis[]
};

interface HospitalFormProps {
  dischargeDate: string;
  setDischargeDate: (value: React.SetStateAction<string>) => void;
  dischargeCriteria: string;
  setDischargeCriteria: (value: React.SetStateAction<string>) => void;
};

interface HealthCheckFormProps {
  rating: number;
  setRating: (value: React.SetStateAction<0 | 1 | 2 | 3>) => void;
};

interface OccupationalHealthcareFormProps {
  employer: string;
  setEmployer: (value: React.SetStateAction<string>) => void;
  sickStart: string;
  setSickStart: (value: React.SetStateAction<string>) => void;
  sickEnd: string;
  setSickEnd: (value: React.SetStateAction<string>) => void;
};

const BaseForm = ({
    description,
    setDescription,
    date,
    setDate,
    specialist,
    setSpecialist,
    diagnosisCodes,
    setDiagnosisCodes,
    newCode,
    setNewCode,
    diagnoses,
  }: BaseFormProps) => {
  
  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  
  return (
    <>
      <TextField
        label="Description"
        fullWidth 
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <InputLabel style={{ marginTop: 10 }}>Date</InputLabel>
      <TextField
        type="date"
        placeholder="YYYY-MM-DD"
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <InputLabel style={{ marginTop: 10 }}>Diagnosis codes</InputLabel>
      <Select
          label="Diagnosis code"
          fullWidth
          multiple
          value={diagnosisCodes}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
        >
        {diagnoses.map(option =>
          <MenuItem
            key={option.code}
            value={option.code}
          >
            {option.code}
          </MenuItem>
        )}
      </Select>
      <br/>
    </>
  )
}

const HospitalForm = ({ dischargeDate, setDischargeDate, dischargeCriteria, setDischargeCriteria}: HospitalFormProps) => {

  return (
    <>
      <InputLabel style={{ marginTop: 10 }}>Discharge date</InputLabel>
      <TextField
        type="date"
        placeholder="YYYY-MM-DD"
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
      />
      <TextField
        label="Discharge Criteria"
        fullWidth
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
      />
    </>
  )
}

const OccupationalHealthcareForm = ({ employer, setEmployer, sickStart, setSickStart, sickEnd, setSickEnd }: OccupationalHealthcareFormProps) => {

  return (
    <>
      <TextField
      label="Employer"
      fullWidth
      value={employer}
      onChange={({ target }) => setEmployer(target.value)}
      />
      <InputLabel style={{ marginTop: 10 }}>Sick leave start</InputLabel>
      <TextField
        type="date"
        placeholder="YYYY-MM-DD"
        value={sickStart}
        onChange={({ target }) => setSickStart(target.value)}
      />
      <InputLabel style={{ marginTop: 10 }}>Sick leave end</InputLabel>
      <TextField
        type="date"
        placeholder="YYYY-MM-DD"
        value={sickEnd}
        onChange={({ target }) => setSickEnd(target.value)}
      />
    </>
  )
}

const HealthCheckForm = ({rating, setRating}: HealthCheckFormProps) => {

  return (
    <>
      <TextField
        style={{ marginTop: 10 }}
        label="Healthcheck Rating"
        type='number'
        InputProps={{ inputProps: { min: 0, max: 3  } }}
        fullWidth
        value={rating}
        onChange={({ target }) => setRating(target.value as unknown as 0 | 1 | 2 | 3)}
      />
    </>
  )
}

const AddEntryForm = ({ entries, setEntries, diagnoses } : AddEntryFormProps) => {
  const [formType, setFormType] = useState<'' | 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck'>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [newCode, setNewCode] = useState<string>('');
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
  const [rating, setRating] = useState< 0 | 1 | 2 | 3>(0);
  const [employer, setEmployer] = useState<string>('');
  const [sickStart, setSickStart] = useState<string>('');
  const [sickEnd, setSickEnd] = useState<string>('');

  const id = useParams().id as string;
  const [error, setError] = useState<string>('');

  const resetValues = () => {
    setFormType('');
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes([]);
    setNewCode('');
    setDischargeDate('');
    setDischargeCriteria('');
    setRating(0);
    setEmployer('');
    setSickStart('');
    setSickEnd('');
  }

  const onCancel = () => {
    console.log('close');
    resetValues();
  };
  const formButtonClick = (t: typeof formType) => {
    setFormType(t);
  }
  const submitNewEntry = async (values: HospitalFormValues | OccupationalHealthcareFormValues | HealthCheckFormValues) => {
    console.log(values);
    try {
      const entry = await patientService.newEntry(id, values);
      setEntries(entries.concat(entry));
      resetValues();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
      setTimeout(() => {
        console.log("Error displayed for 10 seconds.");
        setError('');
      }, 10000);
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (formType !== '') {
      switch (formType) {
        case 'OccupationalHealthcare':
          submitNewEntry({
            type: formType,
            description,
            date,
            specialist,
            diagnosisCodes,
            employerName: employer,
            sickLeave: { startDate: sickStart, endDate: sickEnd }
          })
          break
        case 'HealthCheck':
          submitNewEntry({
            type: formType,
            description,
            date,
            specialist,
            diagnosisCodes,
            healthCheckRating: rating
          })
          break
        case 'Hospital':
          submitNewEntry({
            type: formType,
            description,
            date,
            specialist,
            diagnosisCodes,
            discharge: { date: dischargeDate, criteria: dischargeCriteria }
          });
          break;
        default:
          return <></>
      }
    };
  };
  //Lomakkeen tyyppiä ei valittu
  if (formType === '') {
    return (
      <Box>
        <Button
          color="error"
          variant="contained"
          style={{ float: "none" }}
          type="button"
          onClick={() => {formButtonClick('Hospital')}}
        >
          New Hospital Entry
        </Button>
        &nbsp;
        <Button
          color="success"
          style={{ float: "none" }}
          type="button"
          variant="contained"
          onClick={() => {formButtonClick('OccupationalHealthcare')}}
        >
          New Occupational Healthcare Entry
        </Button>
        &nbsp;
        <Button
          color="secondary"
          style={{ float: "none" }}
          type="button"
          variant="contained"
          onClick={() => {formButtonClick('HealthCheck')}}
        >
          New Healthcheck Entry
        </Button>
      </Box>
    )
  }
  //Lomakkeen tyyppi valittu
  return (
    <>
      {
        error !== ''
        ? <Box sx={{
          display: 'flex',
          backgroundColor: 'orange',
          paddingTop: 1,
          paddingLeft: 1,
          paddingRight: 1,
          paddingBottom: 1,
          // border: 'dashed',
          borderWidth: 2,
          borderRadius: 1,
          marginBottom: 1
        }}>
            <ErrorIcon /> {error}
          </Box>
        :<></>
      }
      <Button 
        color="warning"
        style={{ float: "none", marginBottom: 10 }}
        fullWidth
        type="button"
        variant="contained"
        onClick={() => {resetValues()}}
      >
        Cancel New Entry
      </Button>
      <Box sx={{
        // width: "100%",
        display: 'grid',
        paddingTop: 1,
        paddingLeft: 1,
        paddingRight: 1,
        paddingBottom: 1,
        border: 'dashed',
        borderWidth: 2,
        borderRadius: 0,
        marginBottom: 1
      }}>
        <div>
          <form onSubmit={addEntry} style={{width: "100%"}}>
          <Typography align="left" variant="h5">
            <>
              New {formType} Entry
              <BaseForm description={description} setDescription={function (value: SetStateAction<string>): void {
                setDescription(value);
              } } date={date} setDate={function (value: SetStateAction<string>): void {
                setDate(value);
              } } specialist={specialist} setSpecialist={function (value: SetStateAction<string>): void {
                setSpecialist(value);
              } } diagnosisCodes={diagnosisCodes} setDiagnosisCodes={function (value: SetStateAction<string[]>): void {
                setDiagnosisCodes(value);
              } } newCode={newCode} setNewCode={function (value: SetStateAction<string>): void {
                setNewCode(value);
              } } diagnoses={diagnoses}/>
              {(() => {
                switch (formType) {
                  case 'Hospital':
                    return  <>
                      <HospitalForm dischargeDate={dischargeDate} setDischargeDate={function (value: SetStateAction<string>): void {
                        setDischargeDate(value);
                      } } dischargeCriteria={dischargeCriteria} setDischargeCriteria={function (value: SetStateAction<string>): void {
                        setDischargeCriteria(value);
                      } }/>
                    </>
                  case 'OccupationalHealthcare':
                    return  <>
                      <OccupationalHealthcareForm employer={employer} setEmployer={function (value: SetStateAction<string>): void {
                        setEmployer(value);
                      } } sickStart={sickStart} setSickStart={function (value: SetStateAction<string>): void {
                        setSickStart(value);
                      } } sickEnd={sickEnd} setSickEnd={function (value: SetStateAction<string>): void {
                        setSickEnd(value);
                      } } />
                    </>
                  case 'HealthCheck':
                    return  <>
                      <HealthCheckForm rating={rating} setRating={function (value: SetStateAction<0 | 1 | 2 | 3>): void {
                        setRating(value);
                      } }/>
                    </>
                  default:
                    return <></>
                }
              })()}
            </>
          </Typography>
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel entry
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                >
                  Add entry
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Box>
    </>
  );
};

export default AddEntryForm;