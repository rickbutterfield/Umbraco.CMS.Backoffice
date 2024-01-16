import type { UmbItemDataSource } from '@umbraco-cms/backoffice/repository';
import { MediaItemResponseModel, MediaResource } from '@umbraco-cms/backoffice/backend-api';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';

/**
 * A data source for Data Type items that fetches data from the server
 * @export
 * @class UmbMediaItemServerDataSource
 * @implements {DocumentTreeDataSource}
 */
export class UmbMediaItemServerDataSource implements UmbItemDataSource<MediaItemResponseModel> {
	#host: UmbControllerHost;

	/**
	 * Creates an instance of UmbMediaItemServerDataSource.
	 * @param {UmbControllerHost} host
	 * @memberof UmbMediaItemServerDataSource
	 */
	constructor(host: UmbControllerHost) {
		this.#host = host;
	}

	/**
	 * Fetches the items for the given ids from the server
	 * @param {Array<string>} ids
	 * @return {*}
	 * @memberof UmbMediaItemServerDataSource
	 */
	async getItems(ids: Array<string>) {
		if (!ids) throw new Error('Ids are missing');
		return tryExecuteAndNotify(
			this.#host,
			MediaResource.getMediaItem({
				id: ids,
			}),
		);
	}
}
