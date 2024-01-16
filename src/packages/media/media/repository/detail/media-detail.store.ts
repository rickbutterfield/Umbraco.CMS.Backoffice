import { UmbMediaDetailModel } from '../../types.js';
import { UmbContextToken } from '@umbraco-cms/backoffice/context-api';
import { UmbDetailStoreBase } from '@umbraco-cms/backoffice/store';
import { UmbControllerHostElement } from '@umbraco-cms/backoffice/controller-api';

/**
 * @export
 * @class UmbMediaDetailStore
 * @extends {UmbStoreBase}
 * @description - Data Store for Data Type Details
 */
export class UmbMediaDetailStore extends UmbDetailStoreBase<UmbMediaDetailModel> {
	/**
	 * Creates an instance of UmbMediaDetailStore.
	 * @param {UmbControllerHostElement} host
	 * @memberof UmbMediaDetailStore
	 */
	constructor(host: UmbControllerHostElement) {
		super(host, UMB_MEDIA_DETAIL_STORE_CONTEXT.toString());
	}

	withPropertyEditorUiAlias(propertyEditorUiAlias: string) {
		// TODO: Use a model for the media tree items: ^^Most likely it should be parsed to the UmbEntityTreeStore as a generic type.
		return this._data.asObservablePart((items) => items.filter((item) => item.editorUiAlias === propertyEditorUiAlias));
	}
}

export const UMB_MEDIA_DETAIL_STORE_CONTEXT = new UmbContextToken<UmbMediaDetailStore>('UmbMediaDetailStore');
