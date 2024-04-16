import type { UmbDataTypeTreeItemModel } from '../types.js';
import { UmbDefaultTreeItemContext } from '@umbraco-cms/backoffice/tree';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';

export class UmbDataTypeTreeItemContext extends UmbDefaultTreeItemContext<UmbDataTypeTreeItemModel> {
	constructor(host: UmbControllerHost) {
		super(host);
	}
}

export { UmbDataTypeTreeItemContext as api };
