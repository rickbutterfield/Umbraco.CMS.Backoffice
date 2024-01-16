import {
	MediaItemResponseModel,
	DocumentResponseModel,
	MediaTreeItemResponseModel,
} from '@umbraco-cms/backoffice/backend-api';

type TODO_FIX_MODEL_MediaResponseModel = DocumentResponseModel;

export type UmbMockMediaModelHack = TODO_FIX_MODEL_MediaResponseModel &
	MediaTreeItemResponseModel &
	MediaItemResponseModel;

export interface UmbMockMediaModel extends Omit<UmbMockMediaModelHack, 'type'> {}

export const data: Array<UmbMockMediaModel> = [];
