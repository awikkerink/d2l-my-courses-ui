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
		[
			{ isSearched: true, totalFilterCount: 0, enrollmentsChanged: 0, noCoursesInSearch: true, noCoursesInSelection: false },
			{ isSearched: true, totalFilterCount: 0, enrollmentsChanged: 3, noCoursesInSearch: false, noCoursesInSelection: false },
			{ isSearched: false, totalFilterCount: 2, enrollmentsChanged: 0, noCoursesInSearch: false, noCoursesInSelection: true }
		].forEach(testCase => {
			it(`should set noCoursesInSearch to ${testCase.noCoursesInSearch} and noCoursesInSelection to ${testCase.noCoursesInSelection} when enrollments change to ${testCase.enrollmentsChanged}, isSearched is ${testCase.isSearched} and totalFilterCount is ${testCase.totalFilterCount}`, () => {
				widget.isSearched = testCase.isSearched;
				widget.totalFilterCount = testCase.totalFilterCount;
				widget._enrollmentsChanged(testCase.enrollmentsChanged);
				expect(widget._noCoursesInSearch).to.equal(testCase.noCoursesInSearch);
				expect(widget._noCoursesInSelection).to.equal(testCase.noCoursesInSelection);
			});
		});

		[
			{ isSearched: false, totalFilterCount: 0, enrollmentsChanged: 3, itemCount: 3 },
			{ isSearched: true, totalFilterCount: 0, enrollmentsChanged: 2, itemCount: 0 },
			{ isSearched: false, totalFilterCount: 1, enrollmentsChanged: 2, itemCount: 0 }
		].forEach(testCase => {
			it(`should set itemCount to ${testCase.itemCount} when enrollments change to ${testCase.enrollmentsChanged}, isSearched is ${testCase.isSearched} and totalFilterCount is ${testCase.totalFilterCount}`, () => {
				widget.isSearched = testCase.isSearched;
				widget.totalFilterCount = testCase.totalFilterCount;
				widget._enrollmentsChanged(testCase.enrollmentsChanged);
				expect(widget._itemCount).to.equal(testCase.itemCount);
			});
		});
	});
});
