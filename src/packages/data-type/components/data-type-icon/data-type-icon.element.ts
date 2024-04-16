import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { html, customElement, property, state, ifDefined, css } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { umbExtensionsRegistry } from '@umbraco-cms/backoffice/extension-registry';

const elementName = 'umb-data-type-icon';
@customElement(elementName)
export class UmbDataTypeIconElement extends UmbLitElement {
	@property({ type: String })
	public get propertyEditorUiAlias(): string | undefined {
		return this.#propertyEditorUiAlias;
	}
	public set propertyEditorUiAlias(value: string | undefined) {
		this.#propertyEditorUiAlias = value;
		this.#observePropertyEditorUI();
	}
	#propertyEditorUiAlias?: string | undefined;

	@state()
	_propertyEditorUiIcon?: string;

	#observePropertyEditorUI() {
		this.observe(
			umbExtensionsRegistry.byTypeAndFilter(
				'propertyEditorUI',
				(manifest) => manifest.alias === this.#propertyEditorUiAlias,
			),
			(value) => {
				console.log(value);
			},
		),
			'umbDataTypeIconObserver';
	}

	render() {
		return html`<uui-icon name=${ifDefined(this._propertyEditorUiIcon)}></uui-icon>`;
	}

	static styles = [UmbTextStyles];
}

declare global {
	interface HTMLElementTagNameMap {
		[elementName]: UmbDataTypeIconElement;
	}
}
