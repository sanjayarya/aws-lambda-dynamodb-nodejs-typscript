import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS, { IdentityStore } from "aws-sdk";
import { v4 } from "uuid";
import { PatientEntity } from "./entities/patient-entity";
import { headers } from "./services/headers";
import { handleError } from "./services/handle-error";

const docClient = new AWS.DynamoDB.DocumentClient();

const tableName = "PatientEntity";

export const addPatient = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const reqBody = JSON.parse(event.body as string);

    //validating request body
    await PatientEntity.validate(reqBody, { abortEarly: false });

    const patient = {
      ...reqBody,
      PatientId: v4(),
    };
    await docClient
      .put({
        TableName: tableName,
        Item: patient,
      })
      .promise();

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        message: "Patient has been added successfully!",
        data: patient,
      }),
    };
  } catch (e) {
    return handleError(e);
  }
};
