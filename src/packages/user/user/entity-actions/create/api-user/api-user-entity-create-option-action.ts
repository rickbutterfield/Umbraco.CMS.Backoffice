import { UmbEntityCreateOptionActionBase } from '@umbraco-cms/backoffice/entity-action';

export class UmbApiUserEntityCreateOptionAction extends UmbEntityCreateOptionActionBase<never> {
	override async execute() {
		debugger;
	}
}

export { UmbApiUserEntityCreateOptionAction as api };