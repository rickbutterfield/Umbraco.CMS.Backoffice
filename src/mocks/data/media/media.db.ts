import { UmbEntityMockDbBase } from '../entity/entity-base.js';
import { UmbMockEntityFolderManager } from '../entity/entity-folder.manager.js';
import { UmbMockEntityTreeManager } from '../entity/entity-tree.manager.js';
import { folderTreeItemMapper } from '../utils.js';
import { UmbMockEntityItemManager } from '../entity/entity-item.manager.js';
import { UmbMockEntityDetailManager } from '../entity/entity-detail.manager.js';
import { UmbMockMediaModel, data } from './media.data.js';
import { UmbId } from '@umbraco-cms/backoffice/id';
import {
	CreateMediaRequestModel,
	DocumentResponseModel,
	MediaItemResponseModel,
} from '@umbraco-cms/backoffice/backend-api';

type TODO_FIX_MODEL_MediaResponseModel = DocumentResponseModel;

class UmbMediaMockDB extends UmbEntityMockDbBase<UmbMockMediaModel> {
	tree = new UmbMockEntityTreeManager<UmbMockMediaModel>(this, folderTreeItemMapper);
	item = new UmbMockEntityItemManager<UmbMockMediaModel>(this, mediaItemMapper);
	detail = new UmbMockEntityDetailManager<UmbMockMediaModel>(this, createMockMediaMapper, mediaDetailMapper);

	constructor(data: Array<UmbMockMediaModel>) {
		super(data);
	}
}

const createMockMediaMapper = (request: CreateMediaRequestModel): UmbMockMediaModel => {
	return {
		id: request.id ? request.id : UmbId.new(),
		contentTypeId: request.contentTypeId,
		values: request.values,
		urls: [],
		isTrashed: false,
		variants: request.variants,
	};
};

const mediaDetailMapper = (item: UmbMockMediaModel): TODO_FIX_MODEL_MediaResponseModel => {
	return {
		values: item.values,
		variants: item.variants,
		id: item.id,
		contentTypeId: item.contentTypeId,
		urls: item.urls,
		templateId: item.templateId,
		isTrashed: item.isTrashed,
	};
};

const mediaItemMapper = (item: UmbMockMediaModel): MediaItemResponseModel => {
	return {
		id: item.id,
		name: item.name,
		isTrashed: item.isTrashed,
	};
};

export const umbMediaMockDb = new UmbMediaMockDB(data);
