import {
	MediaItemResponseModel,
	DocumentResponseModel,
	MediaTreeItemResponseModel,
	ContentStateModel,
} from '@umbraco-cms/backoffice/backend-api';

type TODO_FIX_MODEL_MediaResponseModel = DocumentResponseModel;

export type UmbMockMediaModelHack = TODO_FIX_MODEL_MediaResponseModel &
	MediaTreeItemResponseModel &
	MediaItemResponseModel;

export interface UmbMockMediaModel extends Omit<UmbMockMediaModelHack, 'type'> {}

export const data: Array<UmbMockMediaModel> = [
	{
		id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
		parentId: null,
		name: 'Flipped Car',
		hasChildren: false,
		isContainer: false,
		icon: 'icon-document',
		noAccess: false,
		values: [
			{
				culture: 'string',
				segment: 'string',
				alias: 'string',
				value: 'string',
			},
		],
		variants: [
			{
				culture: 'string',
				segment: 'string',
				name: 'string',
				createDate: '2024-01-16T06:28:45.451Z',
				updateDate: '2024-01-16T06:28:45.451Z',
				state: ContentStateModel.PUBLISHED,
				publishDate: '2024-01-16T06:28:45.451Z',
			},
		],
		contentTypeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
		urls: [
			{
				culture: 'string',
				url: 'string',
			},
		],
		templateId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
		isTrashed: true,
	},
];
