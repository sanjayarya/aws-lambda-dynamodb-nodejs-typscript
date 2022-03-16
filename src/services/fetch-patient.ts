import AWS from "aws-sdk";
import { Errors } from "../classes/Errors";

const docClient = new AWS.DynamoDB.DocumentClient();

const tableName = "PatientEntity";

export const fetchPatientById = async (id: string) => {
  const result = await docClient
    .get({
      TableName: tableName,
      Key: {
        PatientId: id,
      },
    })
    .promise();

  if (!result.Item) {
    throw new Errors.HttpError(404, { error: "Data was not found" });
  }

  return result.Item;
};
