import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

export type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown>) => {
  let statusCode = 200
  if (response.statusCode) {
    statusCode = response.statusCode as number
    delete response.statusCode
  }


  let body: string = JSON.stringify(response);

  if(response.body && typeof response.body === 'object') {
    body = JSON.stringify(response.body)
  }


  return {
    statusCode,
    body,
  }
}
