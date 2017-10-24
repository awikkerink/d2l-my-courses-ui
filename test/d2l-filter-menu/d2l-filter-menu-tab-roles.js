/* global Promise, describe, it, beforeEach, afterEach, fixture, expect, sinon */

'use strict';

var sandbox,
	component,
	myEnrollmentsEntity,
	roleFilterEntity,
	roleFiltersEntity;

function parse(entity) {
	return window.D2L.Hypermedia.Siren.Parse(entity);
}

beforeEach(function() {
	sandbox = sinon.sandbox.create();
	myEnrollmentsEntity = {
		actions: [{
			name: 'set-role-filters',
			href: 'http://example.com',
			fields: [{
				name: 'include',
				value: ''
			}]
		}]
	};
	roleFilterEntity = parse({
		actions: [{
			name: 'add-filter',
			href: 'http://example.com/add'
		}, {
			name: 'remove-filter',
			href: 'http://example.com/remove'
		}]
	});
	roleFiltersEntity = parse({
		actions: [{
			name: 'apply-role-filters',
			href: 'http://example.com',
			fields: [{
				name: 'roles',
				value: '1,2,3,4'
			}]
		}]
	});
	component = fixture('d2l-filter-menu-tab-roles-fixture');
	component.fetchSirenEntity = sandbox.stub().returns(Promise.resolve({}));
	component.myEnrollmentsEntity = myEnrollmentsEntity;
});

afterEach(function() {
	sandbox.restore();
});

describe('d2l-filter-menu-tab-roles', function() {
	describe('DOM manipulation', function() {
		it('should show the empty state message initially', function() {
			expect(component.$$('.no-items-text').getAttribute('hidden')).to.be.null;
		});

		it('should show the empty state message if there are no role filters', function(done) {
			component.fetchSirenEntity = sandbox.stub().returns(Promise.resolve({
				entities: []
			}));
			component._myEnrollmentsEntityChanged(myEnrollmentsEntity);

			setTimeout(function() {
				expect(component._showContent).to.be.false;
				expect(component.$$('.no-items-text').getAttribute('hidden')).to.be.null;
				expect(component.fetchSirenEntity).to.have.been.called;
				done();
			});
		});

		it('should show content once the role filters have been fetched', function(done) {
			component.fetchSirenEntity = sandbox.stub().returns(Promise.resolve({
				entities: [1]
			}));
			component._myEnrollmentsEntityChanged(myEnrollmentsEntity);

			setTimeout(function() {
				expect(component._showContent).to.be.true;
				expect(component.$$('.no-items-text').getAttribute('hidden')).to.not.be.null;
				done();
			});
		});
	});

	describe('when a d2l-menu-item-change event occurs', function() {
		[
			{ name: 'should add the filter when selected', url: 'http://example.com/add', selected: true },
			{ name: 'should remove the filter when de-selected', url: 'http://example.com/remove', selected: false }
		].forEach(function(testCase) {
			it(testCase.name, function(done) {
				component.fetchSirenEntity = sandbox.stub().returns(Promise.resolve(roleFiltersEntity));
				var listener = function() {
					component.removeEventListener('role-filters-changed', listener);
					expect(component.fetchSirenEntity).to.have.been.calledWith(testCase.url);
					done();
				};
				component.addEventListener('role-filters-changed', listener);

				component.fire('d2l-menu-item-change', {
					selected: testCase.selected,
					value: roleFilterEntity
				});
			});
		});

		it('should fire a role-filters-changed event with the new URL and filterCount', function(done) {
			component.fetchSirenEntity = sandbox.stub().returns(Promise.resolve(roleFiltersEntity));
			var listener = function(e) {
				component.removeEventListener('role-filters-changed', listener);
				expect(e.detail.url).to.equal('http://example.com?roles=1,2,3,4');
				expect(e.detail.filterCount).to.equal(4);
				done();
			};
			component.addEventListener('role-filters-changed', listener);

			component.fire('d2l-menu-item-change', {
				selected: true,
				value: roleFilterEntity
			});
		});
	});

	describe('clear', function() {
		it('should reset the "selected" state to false on all filter items', function() {
			component._filterItems = [{ title: 'one' }, { title: 'two' }, { title: 'three' }];
			var filters = component.$$('d2l-menu').querySelectorAll('d2l-filter-list-item-role');
			filters.forEach(function(item) {
				item.selected = true;
			});

			return component.clear().then(function() {
				filters.forEach(function(item) {
					expect(item.selected).to.be.false;
				});
			});
		});

		it('should re-fetch the role filters with their updated states (all "off")', function() {
			return component.clear().then(function() {
				expect(component.fetchSirenEntity).to.have.been.calledWith(sinon.match(/\?include=$/));
			});
		});
	});
});
