import { MediaResource } from '@umbraco-cms/backoffice/backend-api';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';
import { UmbMoveDataSource } from '@umbraco-cms/backoffice/repository';

/**
 * A data source for Data Type items that fetches data from the server
 * @export
 * @class UmbMediaMoveServerDataSource
 */
export class UmbMediaMoveServerDataSource implements UmbMoveDataSource {
	#host: UmbControllerHost;

	/**
	 * Creates an instance of UmbMediaMoveServerDataSource.
	 * @param {UmbControllerHost} host
	 * @memberof UmbMediaMoveServerDataSource
	 */
	constructor(host: UmbControllerHost) {
		this.#host = host;
	}

	/**
	 * Move an item for the given id to the target unique
	 * @param {string} unique
	 * @param {(string | null)} targetUnique
	 * @return {*}
	 * @memberof UmbMediaMoveServerDataSource
	 */
	async move(unique: string, targetUnique: string | null) {
		if (!unique) throw new Error('Unique is missing');
		if (targetUnique === undefined) throw new Error('Target unique is missing');

		return tryExecuteAndNotify(
			this.#host,
			MediaResource.postMediaByIdMove({
				id: unique,
				requestBody: {
					targetId: targetUnique,
				},
			}),
		);
	}
}
