import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";
import { PatientEntity } from "./entities/patient-entity";
import { fetchPatientById } from "./services/fetch-patient";
import { handleError } from "./services/handle-error";
import { headers } from "./services/headers";

const docClient = new AWS.DynamoDB.DocumentClient();

const tableName = "PatientEntity";

export const updatePatient = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const patientId = event.pathParameters?.id as string;
    //checking if patient exists with the requested id.
    await fetchPatientById(patientId);

    const reqBody = JSON.parse(event.body as string);

    //validating request body

    await PatientEntity.validate(reqBody, { abortEarly: false });

    const patient = {
      ...reqBody,
      PatientId: patientId,
    };

    await docClient
      .put({
        TableName: tableName,
        Item: patient,
      })
      .promise();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "Patient details have been updated successfully!",
        data: patient,
      }),
    };
  } catch (e) {
    return handleError(e);
  }
};
