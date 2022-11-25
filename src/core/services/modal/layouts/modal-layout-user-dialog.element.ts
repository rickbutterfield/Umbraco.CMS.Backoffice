import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { UmbModalHandler, UmbModalService } from '@umbraco-cms/services';
import type { ManifestExternalLoginProvider, ManifestUserDashboard, UserDetails } from '@umbraco-cms/models';
import { UmbUserStore } from 'src/core/stores/user/user.store';
import { UmbObserverMixin } from '@umbraco-cms/observable-api';
import { UmbContextConsumerMixin } from '@umbraco-cms/context-api';
import { umbExtensionsRegistry } from '@umbraco-cms/extensions-registry';
import '../../../../backoffice/external-login-providers/external-login-provider-extension.element';
import '../../../../backoffice/user-dashboards/user-dashboard-extension.element';

@customElement('umb-modal-layout-user-dialog')
export class UmbModalLayoutUserDialogElement extends UmbContextConsumerMixin(UmbObserverMixin(LitElement)) {
	static styles: CSSResultGroup = [
		UUITextStyles,
		css`
			:host {
				display: block;
			}
			:host,
			umb-editor-entity-layout {
				width: 100%;
				height: 100%;
			}
			#main {
				padding: var(--uui-size-space-5);
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-3);
			}
			#umbraco-id-buttons {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-3);
			}
			umb-external-login-provider-extension:not(:last-child) {
				margin-bottom: var(--uui-size-space-3);
				display: block;
			}
		`,
	];

	@property({ attribute: false })
	modalHandler?: UmbModalHandler;

	@state()
	private _currentUser?: UserDetails;

	@state()
	private _externalLoginProviders: Array<ManifestExternalLoginProvider> = [];

	@state()
	private _userDashboards: Array<ManifestUserDashboard> = [];

	private _userStore?: UmbUserStore;
	private _modalService?: UmbModalService;

	constructor() {
		super();
		this.consumeAllContexts(['umbUserStore', 'umbModalService'], (instances) => {
			this._userStore = instances['umbUserStore'];
			this._modalService = instances['umbModalService'];
			this._observeCurrentUser();
		});

		this._observeExternalLoginProviders();
		this._observeUserDashboards();
	}

	private async _observeCurrentUser() {
		if (!this._userStore) return;

		this.observe<UserDetails>(this._userStore.currentUser, (currentUser) => {
			this._currentUser = currentUser;
		});
	}

	private _observeExternalLoginProviders() {
		this.observe<ManifestExternalLoginProvider[]>(
			umbExtensionsRegistry.extensionsOfType('externalLoginProvider'),
			(loginProvider) => {
				this._externalLoginProviders = loginProvider;
			}
		);
	}

	private _observeUserDashboards() {
		this.observe<ManifestUserDashboard[]>(umbExtensionsRegistry.extensionsOfType('userDashboard'), (userDashboard) => {
			this._userDashboards = userDashboard;
			console.log(this._userDashboards);
		});
	}

	private _close() {
		this.modalHandler?.close();
	}

	private _edit() {
		if (!this._currentUser) return;
		history.pushState(null, '', '/section/users/view/users/user/' + this._currentUser.key); //TODO Change to a tag with href and make dynamic
		this._close();
	}

	private _changePassword() {
		if (!this._modalService) return;
		this._modalService.changePassword();
	}

	render() {
		return html`
			<umb-editor-entity-layout headline="${this._currentUser?.name || ''}">
				<div id="main">
					<uui-box>
						<b slot="headline">Your profile</b>
						<uui-button look="primary" @click=${this._edit}>Edit</uui-button>
						<uui-button look="primary" @click=${this._changePassword}>Change password</uui-button>
					</uui-box>
					<uui-box>
						<b slot="headline">External login providers</b>
						${this._externalLoginProviders.map(
							(provider) =>
								html`<umb-external-login-provider-extension
									.externalLoginProvider=${provider}></umb-external-login-provider-extension>`
						)}
					</uui-box>
					<uui-box>
						<b slot="headline">User Dashboards</b>
						${this._userDashboards.map(
							(provider) =>
								html`<umb-user-dashboard-extension .userDashboard=${provider}></umb-user-dashboard-extension>`
						)}
					</uui-box>
				</div>
				<div slot="actions">
					<uui-button @click=${this._close} look="secondary">Close</uui-button>
					<uui-button look="primary" color="danger">Logout</uui-button>
				</div>
			</umb-editor-entity-layout>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-modal-layout-user-dialog': UmbModalLayoutUserDialogElement;
	}
}
