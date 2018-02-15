'use strict';
(function() {

	function createEntity() {
		var baseEntity = {
			name: 'search-my-enrollments',
			method: 'GET',
			href: '/enrollments/users/169',
			fields: [{
				name: 'search',
				type: 'search',
				value: ''
			}, {
				name: 'pageSize',
				type: 'number',
				value: 20
			}, {
				name: 'embedDepth',
				type: 'number',
				value: 0
			}, {
				name: 'sort',
				type: 'text',
				value: 'OrgUnitName,OrgUnitId'
			}, {
				name: 'parentOrganizations',
				type: 'hidden',
				value: ''
			}]
		};
		return baseEntity;
	}

	window.d2lfetch = window.d2lfetch || { fetch: function() {} };
	var stub = sinon.stub(window.d2lfetch, 'fetch');

	stub.withArgs(sinon.match.has('url', sinon.match(/organizations/)))
		.returns(Promise.resolve({
			ok: true,
			json: function() {
				return Promise.resolve(createEntity());
			}
		}));

})();
