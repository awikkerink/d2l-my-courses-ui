/* global Promise, describe, it, beforeEach, afterEach, fixture, expect, sinon */

'use strict';

var sandbox,
	component,
	organization;

beforeEach(function() {
	sandbox = sinon.sandbox.create();
	component = fixture('d2l-filter-menu-tab-fixture');
	component.searchAction = {
		name: 'search',
		href: '/'
	};
	organization = {
		class: ['active', 'semester'],
		rel: ['https://api.brightspace.com/rels/organization'],
		href: '/organizations/1'
	};
});

afterEach(function() {
	sandbox.restore();
});

describe('d2l-filter-menu-tab', function() {
	describe('DOM manipulation', function() {
		it('should show empty state message initially', function() {
			expect(component.$$('.no-items-text').getAttribute('hidden')).to.be.null;
		});

		it('should show content once the tab has loaded', function() {
			component.fetchSirenEntity = sandbox.stub().returns(Promise.resolve({
				entities: [organization]
			}));

			return component.load().then(function() {
				expect(component.$$('.no-items-text').getAttribute('hidden')).to.not.be.null;
			});
		});

		it('should show the No Results message when there are no search results', function() {
			component.fire('d2l-search-widget-results-changed', {
				entities: []
			});

			expect(component._allFilters.length).to.equal(0);
			expect(component._hasSearchResults).to.be.false;
			expect(component.$$('div > div.no-items-text').getAttribute('hidden')).to.be.null;
		});

		it('should not show the No Results message when there are search results', function() {
			component.fire('d2l-search-widget-results-changed', {
				entities: [organization]
			});

			expect(component._allFilters.length).to.equal(1);
			expect(component._hasSearchResults).to.be.true;
			expect(component.$$('div > div.no-items-text').getAttribute('hidden')).to.not.be.null;
		});
	});

	describe('selectedFilters', function() {
		it('should generate an event when selectedFilters is changed', function(done) {
			var listener = function() {
				component.removeEventListener('selected-filters-changed', listener);
				done();
			};
			component.addEventListener('selected-filters-changed', listener);

			component.selectedFilters = [organization];
		});
	});

	describe('when a d2l-menu-item-change event occurs', function() {
		it('should add the filter if it was selected', function(done) {
			component._allFilters = [organization];
			component.selectedFilters = [];

			var listener = function() {
				component.removeEventListener('d2l-menu-item-change', listener);
				expect(component.selectedFilters.length).to.equal(1);

				done();
			};
			component.addEventListener('d2l-menu-item-change', listener);

			component.fire('d2l-menu-item-change', {
				selected: true,
				value: organization
			});
		});

		it('should remove the filter if it was deselected', function(done) {
			component._allFilters = [organization];
			component.selectedFilters = [organization];

			var listener = function() {
				component.removeEventListener('d2l-menu-item-change', listener);
				expect(component.selectedFilters.length).to.equal(0);

				done();
			};
			component.addEventListener('d2l-menu-item-change', listener);

			component.fire('d2l-menu-item-change', {
				selected: false,
				value: organization
			});
		});

		it('should fire a selected-filters-changed event', function(done) {
			var listener = function() {
				component.removeEventListener('selected-filters-changed', listener);
				done();
			};
			component.addEventListener('selected-filters-changed', listener);

			component.fire('d2l-menu-item-change', {
				selected: false,
				value: organization
			});
		});
	});

	describe('_checkSelected', function() {
		it('should return true if item should be selected', function() {
			component.selectedFilters = [organization.href];
			expect(component._checkSelected(organization)).to.be.true;
		});

		it('should return false if the item should not be selected', function() {
			component.selectedFilters = ['foo'];
			expect(component._checkSelected(organization)).to.be.false;
		});
	});
});
