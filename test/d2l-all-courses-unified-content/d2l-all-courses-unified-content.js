describe('d2l-all-courses-unified-content', function() {
	var widget, sandbox, clock;

	beforeEach(function() {
		sandbox = sinon.sandbox.create();
		widget = fixture('d2l-all-courses-unified-content-fixture');
	});

	afterEach(function() {
		if (clock) {
			clock.restore();
		}
		sandbox.restore();
	});

	describe('setting course image', function() {
		it('should remove and course image failure alerts before adding and new ones', function() {
			var removeAlertSpy = sandbox.spy(widget, '_removeAlert');
			widget.setCourseImage();
			expect(removeAlertSpy.called);
		});

		it('should add an alert after setting the course image results in failure (after a timeout)', function() {
			clock = sinon.useFakeTimers();
			var setCourseImageEvent = { detail: { status: 'failure'} };
			widget.setCourseImage(setCourseImageEvent);
			clock.tick(1001);
			expect(widget._alerts).to.include({ alertName: 'setCourseImageFailure', alertType: 'warning', alertMessage: 'Sorry, we\'re unable to change your image right now. Please try again later.' });
		});
	});

	describe('changing enrollment entities', function() {
		it('should determine if there are no results in search', function() {
			widget.isSearched = true;
			widget._enrollmentsChanged(0);
			expect(widget._noCoursesInSearch).to.be.true;
		});

		it('should determine if there are results in search', function() {
			widget.isSearched = true;
			widget._enrollmentsChanged(3);
			expect(widget._noCoursesInSearch).to.be.false;
		});

		it('should determine if there no results in filtered results', function() {
			widget.isSearched = false;
			widget.filterCount = 2;
			widget._enrollmentsChanged(0);
			expect(widget._noCoursesInSelection).to.be.true;
		});

		it('should determine if there results in filtered results', function() {
			widget.isSearched = false;
			widget.filterCount = 2;
			widget._enrollmentsChanged(3);
			expect(widget._noCoursesInSelection).to.be.false;
		});

		it('should update the item count if not searched or filtered', function() {
			widget.isSearched = false;
			widget.filterCount = 0;
			widget._enrollmentsChanged(3);
			expect(widget._itemCount).to.equal(3);
		});

		it('should not update the item count if searched', function() {
			widget._itemCount = 3;
			widget.isSearched = true;
			widget.filterCount = 0;
			widget._enrollmentsChanged(2);
			expect(widget._itemCount).to.equal(3);
		});

		it('should not update the item count if filtered', function() {
			widget._itemCount = 3;
			widget.isSearched = false;
			widget.filterCount = 1;
			widget._enrollmentsChanged(2);
			expect(widget._itemCount).to.equal(3);
		});
	});
});
