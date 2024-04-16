import { UMB_DATA_TYPE_ENTITY_TYPE, UMB_DATA_TYPE_FOLDER_ENTITY_TYPE } from '../entity.js';
import type { UmbDataTypeTreeItemModel } from './types.js';
import type {
	UmbTreeChildrenOfRequestArgs,
	UmbTreeRootItemsRequestArgs,
	UmbTreeAncestorsOfRequestArgs,
} from '@umbraco-cms/backoffice/tree';
import { UmbTreeServerDataSourceBase } from '@umbraco-cms/backoffice/tree';
import type { DataTypeTreeItemResponseModel } from '@umbraco-cms/backoffice/external/backend-api';
import { DataTypeService } from '@umbraco-cms/backoffice/external/backend-api';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';

/**
 * A data source for a data type tree that fetches data from the server
 * @export
 * @class UmbDataTypeTreeServerDataSource
 * @implements {DocumentTreeDataSource}
 */
export class UmbDataTypeTreeServerDataSource extends UmbTreeServerDataSourceBase<
	DataTypeTreeItemResponseModel,
	UmbDataTypeTreeItemModel
> {
	/**
	 * Creates an instance of UmbDataTypeTreeServerDataSource.
	 * @param {UmbControllerHost} host
	 * @memberof UmbDataTypeTreeServerDataSource
	 */
	constructor(host: UmbControllerHost) {
		super(host, {
			getRootItems,
			getChildrenOf,
			getAncestorsOf,
			mapper,
		});
	}
}

const getRootItems = async (args: UmbTreeRootItemsRequestArgs) => {
	// eslint-disable-next-line local-rules/no-direct-api-import
	return DataTypeService.getTreeDataTypeRoot({ skip: args.skip, take: args.take });
};

const getChildrenOf = (args: UmbTreeChildrenOfRequestArgs) => {
	if (args.parentUnique === null) {
		return getRootItems(args);
	} else {
		// eslint-disable-next-line local-rules/no-direct-api-import
		return DataTypeService.getTreeDataTypeChildren({
			parentId: args.parentUnique,
			skip: args.skip,
			take: args.take,
		});
	}
};

const getAncestorsOf = (args: UmbTreeAncestorsOfRequestArgs) =>
	// eslint-disable-next-line local-rules/no-direct-api-import
	DataTypeService.getTreeDataTypeAncestors({
		descendantId: args.descendantUnique,
	});

const mapper = (item: DataTypeTreeItemResponseModel): UmbDataTypeTreeItemModel => {
	return {
		unique: item.id,
		parentUnique: item.parent?.id || null,
		icon: 'icon-autofill',
		name: item.name,
		entityType: item.isFolder ? UMB_DATA_TYPE_FOLDER_ENTITY_TYPE : UMB_DATA_TYPE_ENTITY_TYPE,
		isFolder: item.isFolder,
		hasChildren: item.hasChildren,
		propertyEditorUiAlias: item.editorUiAlias || null,
		isDeletable: item.isDeletable,
	};
};
