import { css, html, LitElement } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, state, query } from 'lit/decorators.js';

import '@umbraco-ui/uui-modal';
import '@umbraco-ui/uui-modal-container';
import '@umbraco-ui/uui-modal-dialog';
import '@umbraco-ui/uui-modal-sidebar';
import { UUIModalSidebarElement } from '@umbraco-ui/uui-modal-sidebar';
import { UmbContextConsumerMixin } from '../../core/context';
import { UmbModalService } from '../../core/services/modal.service';
import { Subscription } from 'rxjs';

import '../../core/services/modal-content-picker.element';

@customElement('umb-property-editor-content-picker')
class UmbPropertyEditorContentPicker extends UmbContextConsumerMixin(LitElement) {
	static styles = [
		UUITextStyles,
		css`
			h3 {
				margin-left: 16px;
				margin-right: 16px;
			}

			uui-input {
				width: 100%;
			}

			hr {
				border: none;
				border-bottom: 1px solid var(--uui-color-divider);
				margin: 16px 0;
			}
		`,
	];

	@query('uui-modal-sidebar')
	sidebar?: UUIModalSidebarElement;

	private _modalService?: UmbModalService;

	constructor() {
		super();
		this.consumeContext('umbModalService', (modalService: UmbModalService) => {
			this._modalService = modalService;
		});
	}

	private _open() {
		const modalHandler = this._modalService?.open('umb-modal-content-picker');
		modalHandler?.onClose().then((result) => {
			console.log('result', result);
		});
	}

	render() {
		return html` <uui-button look="primary" @click=${this._open} label="open">Open</uui-button> `;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-property-editor-content-picker': UmbPropertyEditorContentPicker;
	}
}
