import type { UUIFileFolder } from '@umbraco-cms/backoffice/external/uui';
import type { UmbAllowedMediaTypeModel } from '@umbraco-cms/backoffice/media-type';
import type { UmbTemporaryFileModel } from '@umbraco-cms/backoffice/temporary-file';

export interface UmbFileDropzoneDroppedItems {
	files: Array<File>;
	folders: Array<UUIFileFolder>;
}

export interface UmbUploadableItem {
	unique: string;
	parentUnique: string | null;
	status: UmbFileDropzoneItemStatus;
	folder?: { name: string };
	temporaryFile?: UmbTemporaryFileModel;
}

export interface UmbUploadableFile extends UmbUploadableItem {
	temporaryFile: UmbTemporaryFileModel;
}

export interface UmbUploadableFolder extends UmbUploadableItem {
	folder: { name: string };
}

export interface UmbAllowedMediaByExtension {
	extension: string | null;
	mediaTypes: Array<UmbAllowedMediaTypeModel>;
}
export interface UmbAllowedChildrenByMediaType {
	mediaType: string | null;
	allowed: Array<UmbAllowedMediaTypeModel>;
}

export interface UmbFileDropzoneProgress {
	total: number;
	completed: number;
}

export interface UmbFileDropzoneProgressItemDetail {
	items: Array<UmbUploadableItem>;
}

export enum UmbFileDropzoneItemStatus {
	WAITING = 'waiting',
	UPLOADED = 'uploaded',
	CREATED = 'created',
	NOT_ALLOWED = 'not allowed',
	CANCELLED = 'cancelled',
	ERROR = 'error',
}
