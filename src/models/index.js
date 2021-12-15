// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { AmpAppDataModel } = initSchema(schema);

export {
  AmpAppDataModel
};