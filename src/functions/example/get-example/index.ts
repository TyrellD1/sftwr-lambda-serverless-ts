import { handlerPath } from '@libs/handler-resolver';
import * as path from 'path';

const folderName = path.basename(__dirname)

/**
 * @description this is the parent folder name
 */
const httpPath = path.basename(path.dirname(__dirname));

const method = folderName.split('-')[0]

export const schema = {
  type: "object",
  properties: {
    name: { type: 'string' }
  },
  required: ['name']
} as const;

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: method, // post | get | put | delete | patch
        path: `${httpPath}/{id}`,
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
