import { expect } from '@open-wc/testing';
import type { UmbDataTypeDetailModel } from '../../types.js';
import { UmbDataTypeServerDataSource } from './data-type-detail.server.data-source.js';
import { customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbControllerHostElementMixin } from '@umbraco-cms/backoffice/controller-api';

@customElement('test-my-controller-host')
class UmbTestControllerHostElement extends UmbControllerHostElementMixin(HTMLElement) {}

describe('UmbDataTypeServerDataSource', () => {
	let dataSource: UmbDataTypeServerDataSource;

	beforeEach(() => {
		const hostElement = new UmbTestControllerHostElement();
		dataSource = new UmbDataTypeServerDataSource(hostElement);
	});

	describe('Public API', () => {
		describe('methods', () => {
			it('has a createScaffold method', () => {
				expect(dataSource).to.have.property('createScaffold').that.is.a('function');
			});

			it('has a read method', () => {
				expect(dataSource).to.have.property('read').that.is.a('function');
			});

			it('has a create method', () => {
				expect(dataSource).to.have.property('create').that.is.a('function');
			});

			it('has a update method', () => {
				expect(dataSource).to.have.property('update').that.is.a('function');
			});

			it('has a delete method', () => {
				expect(dataSource).to.have.property('delete').that.is.a('function');
			});
		});
	});

	describe('Create Scaffold', () => {
		it('returns a scaffold', async () => {
			const { data } = await dataSource.createScaffold();
			expect(data.entityType).to.equal('data-type');
		});

		it('accepts a preset', async () => {
			const presetName = 'Preset Name';
			const { data } = await dataSource.createScaffold({ name: presetName });
			expect(data.name).to.equal(presetName);
		});
	});

	describe('Create', () => {
		it('returns a new detail model', async () => {
			const newDataType: UmbDataTypeDetailModel = {
				entityType: 'data-type',
				unique: '1234',
				name: 'New Data Type Test',
				editorAlias: 'testEditorAlias',
				editorUiAlias: 'testEditorUiAlias',
				values: [
					{
						alias: 'testAlias',
						value: 'testValue',
					},
				],
			};

			const { data } = await dataSource.create(newDataType);
			// Test data
			//expect(data).to.equal('data-type');
		});
	});

	describe('Read', () => {
		it('returns a detail model', async () => {
			const unique = '1234';
			const { data } = await dataSource.read(unique);
			// Test data
			//expect(data).to.equal('data-type');
		});
	});

	describe('Update', () => {
		it('returns an updated detail model', async () => {
			const newDataType: UmbDataTypeDetailModel = {
				entityType: 'data-type',
				unique: '1234',
				name: 'Updated Data Type Test',
				editorAlias: 'testEditorAlias',
				editorUiAlias: 'testEditorUiAlias',
				values: [
					{
						alias: 'testAlias',
						value: 'testUpdatedValue',
					},
				],
			};

			const { data } = await dataSource.update(newDataType);
			// Test data
			//expect(data).to.equal('data-type');
		});
	});

	describe('delete', () => {
		it('returns an updated detail model', async () => {
			const { error } = await dataSource.delete('1234');
			if (!error) {
				// Test data
				//expect(data).to.equal('data-type');
			}
		});
	});
});
