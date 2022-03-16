import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";
import { fetchPatientById } from "./services/fetch-patient";
import { handleError } from "./services/handle-error";

const docClient = new AWS.DynamoDB.DocumentClient();

const tableName = "PatientEntity";

export const deletePatient = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const patientId = event.pathParameters?.id as string;
    //checking if patient exists with the requested id.
    await fetchPatientById(patientId);

    // inititating delete
    await docClient
      .delete({
        TableName: tableName,
        Key: {
          PatientId: patientId,
        },
      })
      .promise();

    return {
      statusCode: 204,
      body: "",
    };
  } catch (e) {
    return handleError(e);
  }
};
