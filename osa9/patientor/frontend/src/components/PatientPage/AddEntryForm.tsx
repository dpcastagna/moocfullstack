import { useState, SyntheticEvent, SetStateAction } from "react";

import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, Box, Typography } from '@mui/material';

import { /* PatientFormValues, */ HealthCheckFormValues, OccupationalHealthcareFormValues, HospitalFormValues, Gender } from "../../types";

// interface AddEntryFormProps {
//   onCancel: () => void;
//   onSubmit: (values: /* PatientFormValues | */ HealthCheckFormValues | OccupationalHealthcareFormValues | HospitalFormValues) => void;
//   formType: '' | 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck';
// }

interface BaseFormProps {
  description: string;
  setDescription: (value: React.SetStateAction<string>) => void;
  date: string;
  setDate: (value: React.SetStateAction<string>) => void;
  specialist: string;
  setSpecialist: (value: React.SetStateAction<string>) => void;
  diagnosisCodes: string[];
  setDiagnosisCodes: (value: ConcatArray<string>) => void;
}

// interface GenderOption{
//   value: Gender;
//   label: string;
// }

// const genderOptions: GenderOption[] = Object.values(Gender).map(v => ({
//   value: v, label: v.toString()
// }));

const BaseForm = ({description, setDescription, date, setDate, specialist, setSpecialist, diagnosisCodes, setDiagnosisCodes}: BaseFormProps) => {

  return (
    <>
      <TextField
        label="Description"
        fullWidth 
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextField
        label="Date"
        placeholder="YYYY-MM-DD"
        // fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <TextField
        label="Add diagnosis code"
        fullWidth
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(diagnosisCodes.concat(target.value))}
      />
    </>
  )
}

const HospitalForm = (/* {addEntry} */) => {

  return (
    <>
      
      {/* <form onSubmit={addEntry}>
        <BaseForm />
      </form> */}
    </>
  )
}

const OccupationalHealthcareForm = (/* {addEntry} */) => {

  return (
    <>
      
      {/* <form onSubmit={addEntry}>
        <BaseForm />
      </form> */}
    </>
  )
}

const HealthCheckForm = (/* {addEntry} */) => {

  return (
    <>
      
      {/* <form onSubmit={addEntry}>
        <BaseForm />
      </form> */}
    </>
  )
}

const AddEntryForm = () => {
  const [formType, setFormType] = useState<'' | 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck'>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');

  // const onGenderChange = (event: SelectChangeEvent<string>) => {
  //   event.preventDefault();
  //   if ( typeof event.target.value === "string") {
  //     const value = event.target.value;
  //     const gender = Object.values(Gender).find(g => g.toString() === value);
  //     if (gender) {
  //       setGender(gender);
  //     }
  //   }
  // };

  const onSubmit = () => {
    console.log('submit');
  };
  const onCancel = () => {
    console.log('close');
    setFormType('');
  };
  const formButtonClick = (num: typeof formType) => {
    setFormType(num);
  }

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (formType !== '') {
      if (formType === 'Hospital') {
        onSubmit(
          // {
          //   type: formType,
          //   description,
          //   date,
          //   specialist,
          //   diagnosisCodes,
          //   discharge: {date: dischargeDate, criteria: dischargeCriteria}
          // }
        )
      }
    };
  };

  if (formType === '') {
    return (
      <>
        <Box>
          { formType === ''
            ? <>
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
            </>
            : <>
              </>
          }
        </Box>
      </>
    )
  }

  return (
    <>
      <Button 
        color="warning"
        style={{ float: "none", marginBottom: 10 }}
        fullWidth
        type="button"
        variant="contained"
        onClick={() => {formButtonClick('')}}
      >
        Cancel New Entry
      </Button>
      <Box sx={{
        display: 'flex',
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
          <form onSubmit={addEntry}>
          <Typography align="left" variant="h5">
            <b>
              {(() => {
                switch (formType) {
                  case 'Hospital':
                    return  <>
                      New Hospital Entry
                      <BaseForm description={description} setDescription={function (value: SetStateAction<string>): void {
                        setDescription(value);
                      } } date={date} setDate={function (value: SetStateAction<string>): void {
                        setDate(value);
                      } } specialist={specialist} setSpecialist={function (value: SetStateAction<string>): void {
                        setSpecialist(value);
                      } } diagnosisCodes={diagnosisCodes} setDiagnosisCodes={function (value: ConcatArray<string>): void {
                        setDiagnosisCodes(diagnosisCodes.concat(value));
                      } } />
                      <HospitalForm /* addEntry={addEntry} */ />
                      </>
                  case 'OccupationalHealthcare':
                    return  <>
                              New Occupational Healthcare Entry
                              <OccupationalHealthcareForm /* addEntry={addEntry} */ />
                            </>
                  case 'HealthCheck':
                    return  <>
                              New HealthCheck entry
                              <HealthCheckForm /* addEntry={addEntry} */ />
                            </>
                  default:
                    return <></>
                }
              })()}
            </b>
          </Typography>
            {/* <TextField
              label="Description"
              fullWidth 
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
            <TextField
              label="Date"
              placeholder="YYYY-MM-DD"
              // fullWidth
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
            <TextField
              label="Specialist"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            /> */}
            {/* <TextField
              label="Social security number"
              fullWidth
              value={ssn}
              onChange={({ target }) => setSsn(target.value)}
            /> */}

            {/* <InputLabel style={{ marginTop: 20 }}>Gender</InputLabel>
            <Select
              label="Gender"
              fullWidth
              value={gender}
              onChange={onGenderChange}
            >
            {genderOptions.map(option =>
              <MenuItem
                key={option.label}
                value={option.value}
              >
                {option.label
              }</MenuItem>
            )}
            </Select> */}

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