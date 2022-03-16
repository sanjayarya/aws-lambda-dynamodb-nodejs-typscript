import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { fetchPatientById } from "./services/fetch-patient";
import { handleError } from "./services/handle-error";
import { headers } from "./services/headers";
export const getPatient = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const patientId = event.pathParameters?.id as string;
    const result = await fetchPatientById(patientId);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result),
    };
  } catch (e) {
    return handleError(e);
  }
};
