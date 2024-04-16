import type { UmbDataTypeTreeItemModel } from '../types.js';
import { html, customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbTreeItemElementBase } from '@umbraco-cms/backoffice/tree';

const elementName = 'umb-data-type-tree-item';
@customElement(elementName)
export class UmbDataTypeTreeItemElement extends UmbTreeItemElementBase<UmbDataTypeTreeItemModel> {
	renderIcon() {
		return html`<umb-data-type-icon
			.propertyEditorUiAlias=${this.item?.propertyEditorUiAlias || undefined}></umb-data-type-icon>`;
	}
}

export { UmbDataTypeTreeItemElement as element };

declare global {
	interface HTMLElementTagNameMap {
		[elementName]: UmbDataTypeTreeItemElement;
	}
}
