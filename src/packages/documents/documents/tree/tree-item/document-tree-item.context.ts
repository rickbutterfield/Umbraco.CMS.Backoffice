import type { UmbDocumentTreeItemModel, UmbDocumentTreeRootModel } from '../types.js';
import { UMB_USER_PERMISSION_DOCUMENT_READ, UmbDocumentUserPermissionCondition } from '../../user-permissions/index.js';
import { UmbDefaultTreeItemContext } from '@umbraco-cms/backoffice/tree';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { UmbIsTrashedEntityContext } from '@umbraco-cms/backoffice/recycle-bin';

export class UmbDocumentTreeItemContext extends UmbDefaultTreeItemContext<
	UmbDocumentTreeItemModel,
	UmbDocumentTreeRootModel
> {
	// TODO: Provide this together with the EntityContext, ideally this takes part via a extension-type [NL]
	#isTrashedContext = new UmbIsTrashedEntityContext(this);
	readonly isTrashed = this._treeItem.asObservablePart((item) => item?.isTrashed ?? false);

	#hasReadPermission = false;

	constructor(host: UmbControllerHost) {
		super(host);

		this._isDisabled.setValue(true);

		this.#observeIsTrashed();
		this.#observeReadDocumentUserPermission();
	}

	override checkAndSetIsDisabled(): void {
		super.checkAndSetIsDisabled();

		if (!this.#hasReadPermission) {
			this._isDisabled.setValue(true);
		}
	}

	#observeIsTrashed() {
		this.observe(
			this.isTrashed,
			(isTrashed) => {
				this.#isTrashedContext.setIsTrashed(isTrashed);
			},
			'umbObserveIsTrashed',
		);
	}

	#observeReadDocumentUserPermission() {
		const condition = new UmbDocumentUserPermissionCondition(this, {
			host: this,
			config: {
				alias: 'Umb.Condition.UserPermission.Document',
				oneOf: [UMB_USER_PERMISSION_DOCUMENT_READ],
			},
			onChange: () => {
				this.#hasReadPermission = condition.permitted;
				this.checkAndSetIsDisabled();
			},
		});
	}
}

export { UmbDocumentTreeItemContext as api };
