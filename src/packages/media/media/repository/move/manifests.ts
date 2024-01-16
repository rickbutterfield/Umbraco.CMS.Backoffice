import { UmbMoveMediaRepository } from './media-move.repository.js';
import type { ManifestRepository } from '@umbraco-cms/backoffice/extension-registry';

export const UMB_MOVE_MEDIA_REPOSITORY_ALIAS = 'Umb.Repository.Media.Move';

const moveRepository: ManifestRepository = {
	type: 'repository',
	alias: UMB_MOVE_MEDIA_REPOSITORY_ALIAS,
	name: 'Move Data Type Repository',
	api: UmbMoveMediaRepository,
};

export const manifests = [moveRepository];
