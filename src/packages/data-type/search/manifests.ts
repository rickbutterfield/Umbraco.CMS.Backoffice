import { UMB_DATA_TYPE_ENTITY_TYPE } from '../entity.js';
import type { ManifestTypes } from '@umbraco-cms/backoffice/extension-registry';

export const manifests: Array<ManifestTypes> = [
	{
		name: 'Data Type Search Provider',
		alias: 'Umb.SearchProvider.DataType',
		type: 'searchProvider',
		api: () => import('./data-type.search-provider.js'),
		weight: 800,
		meta: {
			label: 'Data Types',
		},
	},
	{
		name: 'Data Type Search Result Item ',
		alias: 'Umb.SearchResultItem.DataType',
		type: 'searchResultItem',
		forEntityTypes: [UMB_DATA_TYPE_ENTITY_TYPE],
	},
];
