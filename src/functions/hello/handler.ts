import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { authMiddleware, middyfy } from '@libs/lambda';
import { schema } from '.';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log("RAN HELLO")
  const newUser = await prisma.user.create({
    data: {
      email: "test@gmail.com",
      name: "test",
    },
  });

  console.log(newUser)

  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);
