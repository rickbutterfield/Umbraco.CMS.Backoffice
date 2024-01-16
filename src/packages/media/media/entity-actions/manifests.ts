import type { ManifestEntityAction } from '@umbraco-cms/backoffice/extension-registry';

const entityActions: Array<ManifestEntityAction> = [
	// {
	// 	type: 'entityAction',
	// 	alias: 'Umb.EntityAction.Media.Trash',
	// 	name: 'Trash Media Entity Action ',
	// 	api: UmbTrashEntityAction,
	// 	meta: {
	// 		icon: 'icon-trash',
	// 		label: 'Trash',
	// 		repositoryAlias: UMB_MEDIA_TREE_REPOSITORY_ALIAS,
	// 		entityTypes: ['media'],
	// 	},
	// },
];

export const manifests = [...entityActions];
