/* global Promise, describe, it, beforeEach, afterEach, fixture, expect, sinon */

'use strict';

var sandbox,
	component,
	myEnrollmentsEntity;

beforeEach(function() {
	myEnrollmentsEntity = window.D2L.Hypermedia.Siren.Parse({
		actions: [{
			name: 'search-my-semesters',
			href: '/enrollments'
		}, {
			name: 'search-my-departments',
			href: '/enrollments'
		}]
	});
	sandbox = sinon.sandbox.create();
	component = fixture('d2l-filter-menu-fixture');
});

afterEach(function() {
	sandbox.restore();
});

describe('d2l-filter-menu', function() {
	it('should update actions from myEnrollmentsEntity', function() {
		var spy = sandbox.spy(component, '_myEnrollmentsEntityChanged');

		component.myEnrollmentsEntity = myEnrollmentsEntity;

		expect(spy.called).to.be.true;
		expect(component._searchDepartmentsAction.name).to.equal('search-my-departments');
		expect(component._searchDepartmentsAction.href).to.equal('/enrollments');
		expect(component._searchSemestersAction.name).to.equal('search-my-semesters');
		expect(component._searchSemestersAction.href).to.equal('/enrollments');
	});

	describe('setting org unit type names', function() {
		it('should set the noFilterText correctly', function() {
			component.filterStandardSemesterName = 'foo';
			component.filterStandardDepartmentName = 'bar';

			var expectedText = 'You do not currently have any filter options as you are not enrolled in a foo or bar.';
			expect(component._noFiltersText).to.equal(expectedText);
		});

		describe('tab text', function() {
			it('should render semester name', function() {
				component.filterStandardSemesterName = 'foo';

				var button = component.$.semestersTabButton;
				expect(button.innerText).to.equal('foo');
			});

			it('should render semester name with 1 filter', function() {
				component.filterStandardSemesterName = 'foo';
				component.semesterFilters = [1];

				var button = component.$.semestersTabButton;
				expect(button.innerText).to.equal('foo (1)');
			});

			it('should render department name', function() {
				component.filterStandardDepartmentName = 'foo';

				var button = component.$.departmentsTabButton;
				expect(button.innerText).to.equal('foo');
			});

			it('should render department name with 1 filter', function() {
				component.filterStandardDepartmentName = 'foo';
				component.departmentFilters = [1];

				var button = component.$.departmentsTabButton;
				expect(button.innerText).to.equal('foo (1)');
			});
		});

		describe('search input placeholder text', function() {
			it('should set the search placeholder text for semesters', function() {
				component.filterStandardSemesterName = 'foo';

				expect(component._semestersSearchPlaceholderText).to.equal('Search by foo');
			});

			it('should set the search placeholder text for departments', function() {
				component.filterStandardDepartmentName = 'foo';

				expect(component._departmentsSearchPlaceholderText).to.equal('Search by foo');
			});
		});
	});

	describe('clear button', function() {
		beforeEach(function() {
			component.semesterFilters = [];
			component.departmentFilters = [];
		});

		it('should be hidden when there are no filters selected', function() {
			expect(component.$$('.clear-button').getAttribute('hidden')).to.not.be.null;
		});

		it('should appear when at least one semester filter is selected', function() {
			component.semesterFilters = [1];
			component.fire('selected-filters-changed');

			expect(component.$$('.clear-button').getAttribute('hidden')).to.be.null;
		});

		it('should appear when at least one department filter is selected', function() {
			component.departmentFilters = [1];
			component.fire('selected-filters-changed');

			expect(component.$$('.clear-button').getAttribute('hidden')).to.be.null;
		});

		it('should clear filters when clicked', function() {
			component.semesterFilters = [1];
			component.fire('selected-filters-changed');

			expect(component.$$('.clear-button').getAttribute('hidden')).to.be.null;

			component.$$('.clear-button').click();
			expect(component.$$('.clear-button').getAttribute('hidden')).to.not.be.null;
		});
	});

	describe('currentFilters', function() {
		it('should update currentFilters when selected-filters-changed is fired', function() {
			component.semesterFilters = [1];
			component.departmentFilters = [1];
			expect(component.currentFilters.length).to.equal(0);

			component.fire('selected-filters-changed');
			expect(component.currentFilters.length).to.equal(2);
		});

		it('should fire a d2l-filter-menu-change event when currentFilters changes', function(done) {
			var listener = function() {
				expect(component.currentFilters.length).to.equal(2);
				component.removeEventListener('d2l-filter-menu-change', listener);
				done();
			};

			component.addEventListener('d2l-filter-menu-change', listener);

			component.semesterFilters = [1];
			component.departmentFilters = [1];
			component.fire('selected-filters-changed');
		});
	});
});
