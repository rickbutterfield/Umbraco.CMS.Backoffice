import { UmbMediaDetailModel, UmbMediaPropertyModel } from '../../types.js';
import { UMB_MEDIA_ENTITY_TYPE } from '../../entity.js';
import { UmbId } from '@umbraco-cms/backoffice/id';
import { UmbDetailDataSource } from '@umbraco-cms/backoffice/repository';
import { CreateMediaRequestModel, MediaModelBaseModel, MediaResource } from '@umbraco-cms/backoffice/backend-api';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';

/**
 * A data source for the Data Type that fetches data from the server
 * @export
 * @class UmbMediaServerDataSource
 * @implements {RepositoryDetailDataSource}
 */
export class UmbMediaServerDataSource implements UmbDetailDataSource<UmbMediaDetailModel> {
	#host: UmbControllerHost;

	/**
	 * Creates an instance of UmbMediaServerDataSource.
	 * @param {UmbControllerHost} host
	 * @memberof UmbMediaServerDataSource
	 */
	constructor(host: UmbControllerHost) {
		this.#host = host;
	}

	/**
	 * Creates a new Data Type scaffold
	 * @param {(string | null)} parentUnique
	 * @return { CreateMediaRequestModel }
	 * @memberof UmbMediaServerDataSource
	 */
	async createScaffold(parentUnique: string | null) {
		const data: UmbMediaDetailModel = {
			entityType: UMB_MEDIA_ENTITY_TYPE,
			unique: UmbId.new(),
			parentUnique,
			name: '',
			editorAlias: undefined,
			editorUiAlias: null,
			values: [],
		};

		return { data };
	}

	/**
	 * Fetches a Data Type with the given id from the server
	 * @param {string} unique
	 * @return {*}
	 * @memberof UmbMediaServerDataSource
	 */
	async read(unique: string) {
		if (!unique) throw new Error('Unique is missing');

		const { data, error } = await tryExecuteAndNotify(this.#host, MediaResource.getMediaById({ id: unique }));

		if (error || !data) {
			return { error };
		}

		// TODO: make data mapper to prevent errors
		const media: UmbMediaDetailModel = {
			entityType: UMB_MEDIA_ENTITY_TYPE,
			unique: data.id,
			parentUnique: data.parentId || null,
			name: data.name,
			editorAlias: data.editorAlias,
			editorUiAlias: data.editorUiAlias || null,
			values: data.values as Array<UmbMediaPropertyModel>,
		};

		return { data: media };
	}

	/**
	 * Inserts a new Data Type on the server
	 * @param {UmbMediaDetailModel} media
	 * @return {*}
	 * @memberof UmbMediaServerDataSource
	 */
	async create(media: UmbMediaDetailModel) {
		if (!media) throw new Error('Data Type is missing');
		if (!media.unique) throw new Error('Data Type unique is missing');
		if (!media.editorAlias) throw new Error('Property Editor Alias is missing');

		// TODO: make data mapper to prevent errors
		const requestBody: CreateMediaRequestModel = {
			id: media.unique,
			parentId: media.parentUnique,
			name: media.name,
			editorAlias: media.editorAlias,
			editorUiAlias: media.editorUiAlias,
			values: media.values,
		};

		const { error: createError } = await tryExecuteAndNotify(
			this.#host,
			MediaResource.postMedia({
				requestBody,
			}),
		);

		if (createError) {
			return { error: createError };
		}

		// We have to fetch the data type again. The server can have modified the data after creation
		return this.read(media.unique);
	}

	/**
	 * Updates a Media on the server
	 * @param {UmbMediaDetailModel} Media
	 * @return {*}
	 * @memberof UmbMediaServerDataSource
	 */
	async update(data: UmbMediaDetailModel) {
		if (!data.unique) throw new Error('Unique is missing');
		if (!data.editorAlias) throw new Error('Property Editor Alias is missing');

		// TODO: make data mapper to prevent errors
		const requestBody: MediaModelBaseModel = {
			name: data.name,
			editorAlias: data.editorAlias,
			editorUiAlias: data.editorUiAlias,
			values: data.values,
		};

		const { error } = await tryExecuteAndNotify(
			this.#host,
			MediaResource.putMediaById({
				id: data.unique,
				requestBody,
			}),
		);

		if (error) {
			return { error };
		}

		// We have to fetch the data type again. The server can have modified the data after update
		return this.read(data.unique);
	}

	/**
	 * Deletes a Data Type on the server
	 * @param {string} unique
	 * @return {*}
	 * @memberof UmbMediaServerDataSource
	 */
	async delete(unique: string) {
		if (!unique) throw new Error('Unique is missing');

		return tryExecuteAndNotify(
			this.#host,
			MediaResource.deleteMediaById({
				id: unique,
			}),
		);
	}
}
