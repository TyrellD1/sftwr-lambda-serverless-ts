import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { OAuth2Client } from "google-auth-library"
import { formatJSONResponse } from "./api-gateway"

export const middyfy = (handler: any) => {
  // console.log("handler", handler)
  return middy(handler).use(middyJsonBodyParser())
}

// create auth middleware
export const authMiddleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request
  ): Promise<APIGatewayProxyResult> => {
    const auth = new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })

    console.log(request.event.headers.Authorization)
  
    if(!request.event.headers.Authorization) {
      return formatJSONResponse({
        statusCode: 401,
        message: `No token`,
      });
    }
  
    const res = await auth.verifyIdToken({
      idToken: request.event.headers.Authorization as string,
      audience: process.env.GOOGLE_CLIENT_ID
    })
  
    const email = res.getPayload()?.email;
  
    const users = {
      "tdowner4@gmail.com": true,
    }
  
    if(!users[email]) {
      return formatJSONResponse({
        statusCode: 401,
        message: `Not authorized`,
      });
    }
    console.log(request.event.headers.Authorization)
  }

  const after: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    // request
  ): Promise<void> => {
    // Your middleware logic
  }

  return {
    before,
    after
  }

}

