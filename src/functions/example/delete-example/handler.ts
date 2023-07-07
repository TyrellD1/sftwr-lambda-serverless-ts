import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { authMiddleware, middyfy } from '@libs/lambda';
import { schema } from '.';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const NAMEHERE: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    return formatJSONResponse({

    });
  } catch (error) {
    return formatJSONResponse({
      statusCode: 500,
      message: error.message,
    });
  }
};

export const main = middyfy(NAMEHERE).use(authMiddleware())
