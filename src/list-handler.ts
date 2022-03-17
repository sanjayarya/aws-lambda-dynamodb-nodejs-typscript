import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";
import { handleError } from "./services/handle-error";
import { headers } from "./services/headers";

const docClient = new AWS.DynamoDB.DocumentClient();

const tableName = "PatientEntity";

export const listPatients = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const result = await docClient
      .scan({
        TableName: tableName,
      })
      .promise();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "Data list was retrieved successfully.",
        data: result,
      }),
    };
  } catch (e) {
    return handleError(e);
  }
};
