import { UmbMediaItemServerDataSource } from './media-item.server.data.js';
import { UMB_MEDIA_ITEM_STORE_CONTEXT } from './media-item.store.js';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { UmbItemRepositoryBase } from '@umbraco-cms/backoffice/repository';
import { MediaItemResponseModel } from '@umbraco-cms/backoffice/backend-api';

export class UmbMediaItemRepository extends UmbItemRepositoryBase<MediaItemResponseModel> {
	constructor(host: UmbControllerHost) {
		super(host, UmbMediaItemServerDataSource, UMB_MEDIA_ITEM_STORE_CONTEXT);
	}
}
