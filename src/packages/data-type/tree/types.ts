import type { UmbDataTypeEntityType, UmbDataTypeFolderEntityType, UmbDataTypeRootEntityType } from '../entity.js';
import type { UmbUniqueTreeItemModel, UmbUniqueTreeRootModel } from '@umbraco-cms/backoffice/tree';

export interface UmbDataTypeTreeItemModel extends UmbUniqueTreeItemModel {
	entityType: UmbDataTypeEntityType | UmbDataTypeFolderEntityType;
	propertyEditorUiAlias: string | null;
	isDeletable: boolean;
}

export interface UmbDataTypeTreeRootModel extends UmbUniqueTreeRootModel {
	entityType: UmbDataTypeRootEntityType;
}
