import type { UmbEntityCreateOptionAction } from './entity-create-option-action.interface.js';
import type { ManifestApi, ManifestWithDynamicConditions } from '@umbraco-cms/backoffice/extension-api';

export interface ManifestEntityCreateOptionAction<
	MetaType extends MetaEntityCreateOptionAction = MetaEntityCreateOptionAction,
> extends ManifestApi<UmbEntityCreateOptionAction<unknown>>,
		ManifestWithDynamicConditions<UmbExtensionConditionConfig> {
	type: 'entityCreateOptionAction';
	forEntityTypes: Array<string>;
	meta: MetaType;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MetaEntityCreateOptionAction {}