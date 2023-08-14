import axios from "axios";
import { /* Patient, PatientFormValues */ Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};

// const findById = async (id: string) => {
//   const { data } = await axios.get<Patient>(
//     `${apiBaseUrl}/diagnoses/${id}`
//   );

//   return data;
// }

// const create = async (object: PatientFormValues) => {
//   const { data } = await axios.post<Patient>(
//     `${apiBaseUrl}/diagnoses`,
//     object
//   );

//   return data;
// };

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll/* , create, findById */
};

