import { UMB_MEDIA_TREE_STORE_CONTEXT, UmbMediaTreeStore } from '../../tree/media-tree.store.js';
import { UmbMediaMoveServerDataSource } from './media-move.server.data-source.js';
import { UMB_NOTIFICATION_CONTEXT_TOKEN, UmbNotificationContext } from '@umbraco-cms/backoffice/notification';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { UmbMoveDataSource, UmbMoveRepository, UmbRepositoryBase } from '@umbraco-cms/backoffice/repository';

export class UmbMoveMediaRepository extends UmbRepositoryBase implements UmbMoveRepository {
	#init: Promise<unknown>;
	#moveSource: UmbMoveDataSource;
	#treeStore?: UmbMediaTreeStore;
	#notificationContext?: UmbNotificationContext;

	constructor(host: UmbControllerHost) {
		super(host);
		this.#moveSource = new UmbMediaMoveServerDataSource(this);

		this.#init = Promise.all([
			this.consumeContext(UMB_MEDIA_TREE_STORE_CONTEXT, (instance) => {
				this.#treeStore = instance;
			}).asPromise(),

			this.consumeContext(UMB_NOTIFICATION_CONTEXT_TOKEN, (instance) => {
				this.#notificationContext = instance;
			}).asPromise(),
		]);
	}

	async move(unique: string, targetUnique: string | null) {
		await this.#init;
		const { error } = await this.#moveSource.move(unique, targetUnique);

		if (!error) {
			// TODO: Be aware about this responsibility.
			this.#treeStore!.updateItem(unique, { parentUnique: targetUnique });

			const notification = { data: { message: `Data type moved` } };
			this.#notificationContext!.peek('positive', notification);
		}

		return { error };
	}
}
