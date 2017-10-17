/* global describe, it, beforeEach, fixture, expect */

'use strict';

var listItem;

beforeEach(function() {
	listItem = fixture('d2l-filter-list-item-role-fixture');
});

describe('d2l-filter-list-item-role', function() {
	it('should change the icon when the selected state changes', function() {
		expect(listItem.$$('d2l-icon').icon).to.equal('d2l-tier2:check-box-unchecked');

		listItem.set('selected', true);

		expect(listItem.$$('d2l-icon').icon).to.equal('d2l-tier2:check-box');
	});
});
