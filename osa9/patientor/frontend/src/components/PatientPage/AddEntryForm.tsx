import { useState, SyntheticEvent } from "react";

import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, Box, Typography } from '@mui/material';

import { /* PatientFormValues, */ HealthCheckFormValues, OccupationalHealthcareFormValues, HospitalFormValues, Gender } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: /* PatientFormValues | */ HealthCheckFormValues | OccupationalHealthcareFormValues | HospitalFormValues) => void;
  formType: number;
}

// interface GenderOption{
//   value: Gender;
//   label: string;
// }

// const genderOptions: GenderOption[] = Object.values(Gender).map(v => ({
//   value: v, label: v.toString()
// }));

const BaseForm = () => {

  return (
    <></>
  )
}

const HospitalForm = (/* {addEntry} */) => {

  return (
    <>
      New Hospital Entry
      {/* <form onSubmit={addEntry}>
        <BaseForm />
      </form> */}
    </>
  )
}

const OccupationalHealthcareForm = (/* {addEntry} */) => {

  return (
    <>
      New Occupational Healthcare Entry
      {/* <form onSubmit={addEntry}>
        <BaseForm />
      </form> */}
    </>
  )
}

const HealthCheckForm = (/* {addEntry} */) => {

  return (
    <>
      New HealthCheck Entry
      {/* <form onSubmit={addEntry}>
        <BaseForm />
      </form> */}
    </>
  )
}

const AddEntryForm = ({ onCancel, onSubmit, formType }: Props) => {
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

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes,
      discharge: {date: dischargeDate, criteria: dischargeCriteria}
    });
  };

  if (formType === 0) {
    return (
      <></>
    )
  }

  return (
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
        <Typography align="left" variant="h5">
          <b>
            {(() => {
              switch (formType) {
                case 1:
                  return <HospitalForm /* addEntry={addEntry} */ />
                case 2:
                  return <OccupationalHealthcareForm /* addEntry={addEntry} */ />
                case 3:
                  return <HealthCheckForm /* addEntry={addEntry} */ />
                default:
                  return <></>
              }
            })()}
          </b>
        </Typography>
        <form onSubmit={addEntry}>
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
                Cancel
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
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Box>
  );
};

export default AddEntryForm;