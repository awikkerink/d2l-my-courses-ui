/* global Promise, describe, it, beforeEach, afterEach, fixture, expect, sinon */

'use strict';

var sandbox,
	component;

beforeEach(function() {
	sandbox = sinon.sandbox.create();
	component = fixture('d2l-filter-menu-tab-fixture');
});

afterEach(function() {
	sandbox.restore();
});

describe('d2l-filter-menu-tab', function() {
	it('should exist', function() {
		expect(component).to.exist;
	});
});
