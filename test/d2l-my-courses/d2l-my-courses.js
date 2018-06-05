describe('d2l-my-courses', () => {
	var component,
		sandbox;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		component = fixture('d2l-my-courses-fixture');
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('should properly implement the d2l-my-courses-behavior', () => {
		expect(component.courseImageUploadCompleted).to.be.a('function');
		expect(component.getLastOrgUnitId).to.be.a('function');
		expect(component.updatedSortLogic).to.equal(false);
	});

	describe('Public API', () => {
		it('should call d2l-my-courses-content-animated.courseImageUploadCompleted', done => {
			component.updatedSortLogic = false;
			setTimeout(() => {
				var stub = sandbox.stub(component.$$('d2l-my-courses-content-animated'), 'courseImageUploadCompleted');
				component.courseImageUploadCompleted();
				expect(stub).to.have.been.called;
				done();
			});
		});

		it('should call d2l-my-courses-content.courseImageUploadCompleted', done => {
			component.updatedSortLogic = true;
			setTimeout(() => {
				var stub = sandbox.stub(component.$$('d2l-my-courses-content'), 'courseImageUploadCompleted');
				component.courseImageUploadCompleted();
				expect(stub).to.have.been.called;
				done();
			});
		});

		it('should call d2l-my-courses-content-animated.getLastOrgUnitId', done => {
			component.updatedSortLogic = false;
			setTimeout(() => {
				var stub = sandbox.stub(component.$$('d2l-my-courses-content-animated'), 'getLastOrgUnitId');
				component.getLastOrgUnitId();
				expect(stub).to.have.been.called;
				done();
			});
		});

		it('should call d2l-my-courses-content.getLastOrgUnitId', done => {
			component.updatedSortLogic = true;
			setTimeout(() => {
				var stub = sandbox.stub(component.$$('d2l-my-courses-content'), 'getLastOrgUnitId');
				component.getLastOrgUnitId();
				expect(stub).to.have.been.called;
				done();
			});
		});
	});
});
