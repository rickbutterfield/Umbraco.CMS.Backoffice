import { html } from 'lit';

export interface PagedHealthCheck {
	total: number;
	items: HealthCheckGroup[];
}

export interface HealthCheckGroup {
	name?: string;
	checks?: HealthCheckGroupCheck[];
}

export interface HealthCheckGroupCheck {
	key?: string;
	name?: string;
	description?: string;
	results?: CheckResult[];
}

export interface CheckResult {
	message?: string;
	resultType?: HealthResult;
	action?: CheckResultAction[];
	readMoreLink?: string;
}

export interface CheckResultAction {
	key?: string;
	alias?: string;
	name?: string;
	description?: string;
	valueRequired?: boolean;
	providedValue?: string;
	providedValueValidation?: string;
	providedValueValidationRegex?: string;
}

export type HealthResult = 'Success' | 'Warning' | 'Error' | 'Info';

export const healthGroups: HealthCheckGroup[] = [
	{
		name: 'Configuration',
		checks: [
			{
				key: 'd0f7599e-9b2a-4d9e-9883-81c7edc5616f',
				name: 'Macro errors',
				description:
					'Checks to make sure macro errors are not set to throw a YSOD (yellow screen of death), which would prevent certain or all pages from loading completely.',
				results: [
					{
						message: `MacroErrors are set to 'Throw' which will prevent some or all pages in your site from loading
						completely if there are any errors in macros. Rectifying this will set the value to 'Inline'. `,
						resultType: 'Error',
						readMoreLink: 'https://umbra.co/healthchecks-macro-errors',
					},
				],
			},
			{
				key: '3e2f7b14-4b41-452b-9a30-e67fbc8e1206',
				name: 'Notification Email Settings',
				description:
					"If notifications are used, the 'from' email address should be specified and changed from the default value.",
				results: [
					{
						message: `Notification email is still set to the default value of <strong>your@email.here</strong>.`,
						resultType: 'Error',
						readMoreLink: 'https://umbra.co/healthchecks-notification-email',
					},
				],
			},
		],
	},
	{
		name: 'Data Integrity',
		checks: [
			{
				key: '73dd0c1c-e0ca-4c31-9564-1dca509788af',
				name: 'Database data integrity check',
				description: 'Checks for various data integrity issues in the Umbraco database.',
				//group: 'Data Integrity',
				results: [
					{
						message: `All document paths are valid`,
						resultType: 'Success',
					},
					{ message: `All media paths are valid`, resultType: 'Success' },
				],
			},
		],
	},
	{
		name: 'Live Environment',
		checks: [
			{
				key: '61214ff3-fc57-4b31-b5cf-1d095c977d6d',
				name: 'Debug Compilation Mode',
				description:
					'Leaving debug compilation mode enabled can severely slow down a website and take up more memory on the server.',
				//group: 'Live Environment',
				results: [
					{
						message: `Debug compilation mode is currently enabled. It is recommended to disable this setting before
						go live.`,
						resultType: 'Error',
						readMoreLink: 'https://umbra.co/healthchecks-compilation-debug',
					},
				],
			},
		],
	},
	{
		name: 'Permissions',
		checks: [
			{
				key: '53dba282-4a79-4b67-b958-b29ec40fcc23',
				name: 'Folder & File Permissions',
				description: 'Checks that the web server folder and file permissions are set correctly for Umbraco to run.',
				//group: 'Permissions',
				results: [
					{
						message: `Folder creation`,
						resultType: 'Success',
					},
					{
						message: `File writing for packages`,
						resultType: 'Success',
					},
					{
						message: `File writing`,
						resultType: 'Success',
					},
					{
						message: `Media folder creation`,
						resultType: 'Success',
					},
				],
			},
		],
	},
	{
		name: 'Security',
		checks: [
			{
				key: '6708ca45-e96e-40b8-a40a-0607c1ca7f28',
				name: 'Application URL Configuration',
				description: 'Checks if the Umbraco application URL is configured for your site.',
				//group: 'Security',
				results: [
					{
						message: `The appSetting 'Umbraco:CMS:WebRouting:UmbracoApplicationUrl' is not set`,
						resultType: 'Warning',
						readMoreLink: 'https://umbra.co/healthchecks-umbraco-application-url',
					},
				],
			},
			{
				key: 'ed0d7e40-971e-4be8-ab6d-8cc5d0a6a5b0',
				name: 'Click-Jacking Protection',
				description:
					'Checks if your site is allowed to be IFRAMEd by another site and thus would be susceptible to click-jacking.',
				//group: 'Security',
				results: [
					{
						message: `Error pinging the URL https://localhost:44361 - 'The SSL connection could not be established,
						see inner exception.'`,
						resultType: 'Error',
						readMoreLink: 'https://umbra.co/healthchecks-click-jacking',
					},
				],
			},
			{
				key: '1cf27db3-efc0-41d7-a1bb-ea912064e071',
				name: 'Content/MIME Sniffing Protection',
				description: 'Checks that your site contains a header used to protect against MIME sniffing vulnerabilities.',
				//group: 'Security',
				results: [
					{
						message: `Error pinging the URL https://localhost:44361 - 'The SSL connection could not be established,
						see inner exception.'`,
						resultType: 'Error',
						readMoreLink: 'https://umbra.co/healthchecks-no-sniff',
					},
				],
			},
			{
				key: 'e2048c48-21c5-4be1-a80b-8062162df124',
				name: 'Cookie hijacking and protocol downgrade attacks Protection (Strict-Transport-Security Header (HSTS))',
				description:
					'Checks if your site, when running with HTTPS, contains the Strict-Transport-Security Header (HSTS).',
				//group: 'Security',
				results: [
					{
						message: `Error pinging the URL https://localhost:44361 - 'The SSL connection could not be established,
						see inner exception.'`,
						resultType: 'Error',
						readMoreLink: 'https://umbra.co/healthchecks-hsts',
					},
				],
			},
			{
				key: 'f4d2b02e-28c5-4999-8463-05759fa15c3a',
				name: 'Cross-site scripting Protection (X-XSS-Protection header)',
				description:
					'This header enables the Cross-site scripting (XSS) filter in your browser. It checks for the presence of the X-XSS-Protection-header.',
				//group: 'Security',
				results: [
					{
						message: `Error pinging the URL https://localhost:44361 - 'The SSL connection could not be established,
						see inner exception.'`,
						resultType: 'Error',
						readMoreLink: 'https://umbra.co/healthchecks-xss-protection',
					},
				],
			},
			{
				key: '92abbaa2-0586-4089-8ae2-9a843439d577',
				name: 'Excessive Headers',
				description:
					'Checks to see if your site is revealing information in its headers that gives away unnecessary details about the technology used to build and host it.',
				//group: 'Security',
				results: [
					{
						message: `Error pinging the URL https://localhost:44361 - 'The SSL connection could not be established,
						see inner exception.'`,
						resultType: 'Warning',
						readMoreLink: 'https://umbra.co/healthchecks-excessive-headers',
					},
				],
			},
			{
				key: 'eb66bb3b-1bcd-4314-9531-9da2c1d6d9a7',
				name: 'HTTPS Configuration',
				description:
					'Checks if your site is configured to work over HTTPS and if the Umbraco related configuration for that is correct.',
				//group: 'Security',
				results: [
					{
						message: `You are currently viewing the site using HTTPS scheme`,
						resultType: 'Success',
					},
					{
						message: `The appSetting 'Umbraco:CMS:Global:UseHttps' is set to 'False' in your appSettings.json file,
						your cookies are not marked as secure.`,
						resultType: 'Error',
						readMoreLink: 'https://umbra.co/healthchecks-https-config',
					},
					{
						message: `Error pinging the URL https://localhost:44361/ - 'The SSL connection could not be established,
						see inner exception.'"`,
						resultType: 'Error',
						readMoreLink: 'https://umbra.co/healthchecks-https-request',
					},
				],
			},
		],
	},
	{
		name: 'Services',
		checks: [
			{
				key: '1b5d221b-ce99-4193-97cb-5f3261ec73df',
				name: 'SMTP Settings',
				description: 'Checks that valid settings for sending emails are in place.',
				//group: 'Services',
				results: [
					{
						message: `The 'Umbraco:CMS:Global:Smtp' configuration could not be found.`,
						readMoreLink: 'https://umbra.co/healthchecks-smtp',
						resultType: 'Error',
					},
				],
			},
		],
	},
];
export const healthGroups2: HealthCheckGroup[] = [
	{
		name: 'Configuration',
		checks: [
			{
				key: 'd0f7599e-9b2a-4d9e-9883-81c7edc5616f',
				name: 'Macro errors',
				description:
					'Checks to make sure macro errors are not set to throw a YSOD (yellow screen of death), which would prevent certain or all pages from loading completely.',
			},
			{
				key: '3e2f7b14-4b41-452b-9a30-e67fbc8e1206',
				name: 'Notification Email Settings',
				description:
					"If notifications are used, the 'from' email address should be specified and changed from the default value.",
			},
		],
	},
	{
		name: 'Data Integrity',
		checks: [
			{
				key: '73dd0c1c-e0ca-4c31-9564-1dca509788af',
				name: 'Database data integrity check',
				description: 'Checks for various data integrity issues in the Umbraco database.',
				//group: 'Data Integrity',
			},
		],
	},
	{
		name: 'Live Environment',
		checks: [
			{
				key: '61214ff3-fc57-4b31-b5cf-1d095c977d6d',
				name: 'Debug Compilation Mode',
				description:
					'Leaving debug compilation mode enabled can severely slow down a website and take up more memory on the server.',
				//group: 'Live Environment',
			},
		],
	},
	{
		name: 'Permissions',
		checks: [
			{
				key: '53dba282-4a79-4b67-b958-b29ec40fcc23',
				name: 'Folder & File Permissions',
				description: 'Checks that the web server folder and file permissions are set correctly for Umbraco to run.',
				//group: 'Permissions',
			},
		],
	},
	{
		name: 'Security',
		checks: [
			{
				key: '6708ca45-e96e-40b8-a40a-0607c1ca7f28',
				name: 'Application URL Configuration',
				description: 'Checks if the Umbraco application URL is configured for your site.',
				//group: 'Security',
			},
			{
				key: 'ed0d7e40-971e-4be8-ab6d-8cc5d0a6a5b0',
				name: 'Click-Jacking Protection',
				description:
					'Checks if your site is allowed to be IFRAMEd by another site and thus would be susceptible to click-jacking.',
				//group: 'Security',
			},
			{
				key: '1cf27db3-efc0-41d7-a1bb-ea912064e071',
				name: 'Content/MIME Sniffing Protection',
				description: 'Checks that your site contains a header used to protect against MIME sniffing vulnerabilities.',
				//group: 'Security',
			},
			{
				key: 'e2048c48-21c5-4be1-a80b-8062162df124',
				name: 'Cookie hijacking and protocol downgrade attacks Protection (Strict-Transport-Security Header (HSTS))',
				description:
					'Checks if your site, when running with HTTPS, contains the Strict-Transport-Security Header (HSTS).',
				//group: 'Security',
			},
			{
				key: 'f4d2b02e-28c5-4999-8463-05759fa15c3a',
				name: 'Cross-site scripting Protection (X-XSS-Protection header)',
				description:
					'This header enables the Cross-site scripting (XSS) filter in your browser. It checks for the presence of the X-XSS-Protection-header.',
				//group: 'Security',
			},
			{
				key: '92abbaa2-0586-4089-8ae2-9a843439d577',
				name: 'Excessive Headers',
				description:
					'Checks to see if your site is revealing information in its headers that gives away unnecessary details about the technology used to build and host it.',
				//group: 'Security',
			},
			{
				key: 'eb66bb3b-1bcd-4314-9531-9da2c1d6d9a7',
				name: 'HTTPS Configuration',
				description:
					'Checks if your site is configured to work over HTTPS and if the Umbraco related configuration for that is correct.',
				//group: 'Security',
			},
		],
	},
	{
		name: 'Services',
		checks: [
			{
				key: '1b5d221b-ce99-4193-97cb-5f3261ec73df',
				name: 'SMTP Settings',
				description: 'Checks that valid settings for sending emails are in place.',
				//group: 'Services',
			},
		],
	},
];
