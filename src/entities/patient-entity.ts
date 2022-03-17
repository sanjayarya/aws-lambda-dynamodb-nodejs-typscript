import * as yup from "yup";

export const PatientEntity = yup.object().shape({
  Surname: yup.string().required(),
  GivenName: yup.string().notRequired(),
  PreferredName: yup.string().notRequired(),
  Title: yup.string().required(),
  DateOfBirth: yup.string().required(),
  DateOfDeath: yup.string().notRequired(),
  Gender: yup.string().required(),
  Country: yup.string().required(),
  Email: yup.string().email(),
  CreatedOn: yup.date().default(function () {
    return new Date();
  }),
});
