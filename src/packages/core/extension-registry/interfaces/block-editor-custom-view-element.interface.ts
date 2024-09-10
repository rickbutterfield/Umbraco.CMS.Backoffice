import type { ManifestBlockEditorCustomView } from '../index.js';
import type { UUIModalSidebarSize } from '@umbraco-cms/backoffice/external/uui';
// Shared with the Property Editor
export interface UmbBlockTypeBaseModel {
	contentElementTypeKey: string;
	settingsElementTypeKey?: string;
	label?: string;
	thumbnail?: string;
	iconColor?: string;
	backgroundColor?: string;
	editorSize?: UUIModalSidebarSize;
	forceHideContentEditorInOverlay: boolean;
}

// Shared with the Property Editor
export interface UmbBlockLayoutBaseModel {
	contentKey: string;
	settingsKey?: string | null;
}

export interface UmbBlockDataValueModel<ValueType = unknown> {
	culture: string | null;
	segment: string | null;
	alias: string;
	value: ValueType;
}

// Shared with the Property Editor
export interface UmbBlockDataModel {
	key: string;
	contentTypeKey: string;
	values: Array<UmbBlockDataValueModel>;
}

// Shared with the Property Editor
/**
 * Type for the values parsed to Custom Views.
 */
export interface UmbBlockDataType {
	//udi: string; // I want to try to leave these out for now [NL]
	//contentTypeKey: string; // I want to try to leave these out for now [NL]
	[key: string]: unknown;
}

export interface UmbBlockEditorCustomViewConfiguration {
	editContentPath?: string;
	editSettingsPath?: string;
	showContentEdit: boolean;
	showSettingsEdit: boolean;
}

export interface UmbBlockEditorCustomViewProperties<
	LayoutType extends UmbBlockLayoutBaseModel = UmbBlockLayoutBaseModel,
	BlockType extends UmbBlockTypeBaseModel = UmbBlockTypeBaseModel,
> {
	manifest?: ManifestBlockEditorCustomView;
	config?: Partial<UmbBlockEditorCustomViewConfiguration>;
	blockType?: BlockType;
	contentKey?: string;
	label?: string;
	icon?: string;
	index?: number;
	layout?: LayoutType;
	content?: UmbBlockDataType;
	settings?: UmbBlockDataType;
	contentInvalid?: boolean;
	settingsInvalid?: boolean;
}

export interface UmbBlockEditorCustomViewElement<
	LayoutType extends UmbBlockLayoutBaseModel = UmbBlockLayoutBaseModel,
	BlockType extends UmbBlockTypeBaseModel = UmbBlockTypeBaseModel,
> extends UmbBlockEditorCustomViewProperties<LayoutType, BlockType>,
		HTMLElement {}
