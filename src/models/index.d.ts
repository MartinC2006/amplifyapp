import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type AmpAppDataModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class AmpAppDataModel {
  readonly id: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<AmpAppDataModel, AmpAppDataModelMetaData>);
  static copyOf(source: AmpAppDataModel, mutator: (draft: MutableModel<AmpAppDataModel, AmpAppDataModelMetaData>) => MutableModel<AmpAppDataModel, AmpAppDataModelMetaData> | void): AmpAppDataModel;
}