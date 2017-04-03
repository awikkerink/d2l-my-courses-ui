/* global describe, it, expect, fixture, before, beforeEach */

'use strict';

describe('d2l-utility-behavior', function() {
	var
		component,
		enrollment = {
			class: ['pinned', 'enrollment'],
			rel: ['https://api.brightspace.com/rels/user-enrollment'],
			actions: [{
				name: 'unpin-course',
				method: 'PUT',
				href: '/enrollments/users/169/organizations/1',
				fields: [{
					name: 'pinned',
					type: 'hidden',
					value: false
				}]
			}],
			links: [{
				rel: ['https://api.brightspace.com/rels/organization'],
				href: '/organizations/1'
			}, {
				rel: ['self'],
				href: '/enrollments/users/169/organizations/1'
			}]
		},
		enrollmentEntity;

	before(function() {
		enrollmentEntity = window.D2L.Hypermedia.Siren.Parse(enrollment);
	});

	beforeEach(function() {
		component = fixture('default-fixture');
	});

	describe('createActionUrl', function() {
		it('should return the URL with default values if no parameters are specified', function() {
			var url = component.createActionUrl(enrollmentEntity.getActionByName('unpin-course'));

			expect(url).to.equal(enrollment.actions[0].href + '?pinned=false');
		});

		it('should return the URL with the specified query parameter(s)', function() {
			var url = component.createActionUrl(
				enrollmentEntity.getActionByName('unpin-course'),
				{ pinned: 'foo' }
			);

			expect(url).to.equal(enrollment.actions[0].href + '?pinned=foo');
		});

		it('should not add any fields that are not on the action', function() {
			var url = component.createActionUrl(
				enrollmentEntity.getActionByName('unpin-course'),
				{ foo: 'bar' }
			);

			expect(url).to.not.match(/foo=bar/);
		});
	});

	describe('getEntityIdentifier', function() {
		it('should get the unique enrollment ID based off the self link', function() {
			var id = component.getEntityIdentifier(enrollmentEntity);

			expect(id).to.equal(enrollment.links[1].href);
		});
	});

	describe('getOrgunitId', function() {

		it('should parse orgunitid from enrollment id', function() {
			var enrollmentid = '/enrollments/users/169/organizations/1';
			expect(component.getOrgUnitId(enrollmentid)).to.equal('1');
		});

		it('should parse orgunitid from non-canonical namespaced url', function() {
			var enrollmentid = 'https://blah.whatever.d2l/d2l/api/hm/organizations/121535';
			expect(component.getOrgUnitId(enrollmentid)).to.equal('121535');
		});

		it('should parse orgunit from canonical namespaced urls', function() {
			var enrollmentid = 'https://f41cc6fe-7210-423b-8436-7ad7b0444453.organizations.api.proddev.d2l/121535';
			expect(component.getOrgUnitId(enrollmentid)).to.equal('121535');
		});

		it('should return nothing if nothing is passed in', function() {
			expect(component.getOrgUnitId(undefined)).to.equal(undefined);
		});
	});
});
