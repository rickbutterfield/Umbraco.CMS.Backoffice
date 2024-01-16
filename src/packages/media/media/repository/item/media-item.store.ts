import { MediaItemResponseModel } from '@umbraco-cms/backoffice/backend-api';
import { UmbContextToken } from '@umbraco-cms/backoffice/context-api';
import { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { UmbEntityItemStore } from '@umbraco-cms/backoffice/store';

/**
 * @export
 * @class UmbMediaItemStore
 * @extends {UmbStoreBase}
 * @description - Data Store for Data Type items
 */

export class UmbMediaItemStore extends UmbEntityItemStore<MediaItemResponseModel> {
	/**
	 * Creates an instance of UmbMediaItemStore.
	 * @param {UmbControllerHost} host
	 * @memberof UmbMediaItemStore
	 */
	constructor(host: UmbControllerHost) {
		super(host, UMB_MEDIA_ITEM_STORE_CONTEXT.toString());
	}
}

export const UMB_MEDIA_ITEM_STORE_CONTEXT = new UmbContextToken<UmbMediaItemStore>('UmbMediaItemStore');
