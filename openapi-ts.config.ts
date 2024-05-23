import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
	input: 'https://raw.githubusercontent.com/umbraco/Umbraco-CMS/v14/dev/src/Umbraco.Cms.Api.Management/OpenApi.json',
	output: {
		path: 'src/external/backend-api/src',
		format: 'prettier',
		lint: 'eslint',
	},
	types: {
		enums: 'typescript',
	},
	services: {
		asClass: true,
	},
	schemas: false,
});
