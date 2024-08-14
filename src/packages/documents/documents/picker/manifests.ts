import { UMB_DOCUMENT_ENTITY_TYPE } from '../entity.js';
import type { ManifestTypes, UmbBackofficeManifestKind } from '@umbraco-cms/backoffice/extension-registry';

export const manifests: Array<ManifestTypes | UmbBackofficeManifestKind> = [
	{
		type: 'pickerSearchResultItem',
		alias: 'Umb.PickerSearchResultItem.Document',
		name: 'Document Picker Search Result Item',
		element: () => import('./document-picker-search-result-item.element.js'),
		api: () => import('./document-picker-search-result-item.context.js'),
		forEntityTypes: [UMB_DOCUMENT_ENTITY_TYPE],
	},
];