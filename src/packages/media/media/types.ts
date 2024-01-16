export interface ContentProperty {
	alias: string;
	label: string;
	description: string;
	dataTypeId: string;
}

export interface ContentPropertyData {
	alias: string;
	value: any;
}

export interface UmbMediaDetailModel {
	id: string; // TODO: Remove this when the backend is fixed
	isTrashed: boolean; // TODO: remove only temp part of refactor
	properties: Array<ContentProperty>;
	data: Array<ContentPropertyData>;
	variants: Array<any>; // TODO: define variant data
	//layout?: any; // TODO: define layout type - make it non-optional
	icon?: string;
	name: string;
	unique: string;
	entityType: string;
	parentUnique: string | null;
}

export interface UmbMediaPropertyModel {
	alias: string;
	value: any;
}
