Service Information

service: patient-api

stage: dev

region: us-east-1

stack: patient-api-dev

resources: 40

api keys:

- None

endpoints:

- POST - https://az7pp1f8rd.execute-api.us-east-1.amazonaws.com/patient
- GET - https://az7pp1f8rd.execute-api.us-east-1.amazonaws.com/patient/{id}
- PUT - https://az7pp1f8rd.execute-api.us-east-1.amazonaws.com/patient/{id}
- DELETE - https://az7pp1f8rd.execute-api.us-east-1.amazonaws.com/patient/{id}
- GET - https://az7pp1f8rd.execute-api.us-east-1.amazonaws.com/patients

functions:

- addPatient: patient-api-dev-addPatient
- getPatient: patient-api-dev-getPatient
- updatePatient: patient-api-dev-updatePatient
- deletePatient: patient-api-dev-deletePatient
- listPatients: patient-api-dev-listPatients

layers:

- None
