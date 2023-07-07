import { handlerPath } from '@libs/handler-resolver';

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
        method: 'post',
        path: 'hello',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
