'use strict';

window.D2L = window.D2L || {};
window.D2L.MyCourses = window.D2L.MyCourses || {};
window.D2L.MyCourses.CourseTileSlidingGridBehaviorUtility = {
	/**
	 * this method, given an index in the grid, and a count of inserted
	 * or removed tiles, will describe the visual position change of the tile.
	 */
	calculatePositionChange: function calculatePositionChange(columns, i, insert, count) {
		// "current" position
		var col = i % columns;
		var row = Math.floor(i / columns);

		// position after change
		var newCol = insert
			? (col + count) % columns
			: (((col - count) % columns) + columns) % columns;
		var newRow = insert
			? row + Math.floor((col + count) / columns)
			: row + Math.floor((col - count) / columns);

		// difference in position
		var colChange = newCol - col;
		var rowChange = newRow - row;

		return {
			col: colChange,
			row: rowChange
		};
	},

	findDifferenceInLists: function findDifferenceInLists(a, b) {
		var largerList = a;
		var smallerList = b;
		if (a.length < b.length) {
			largerList = b;
			smallerList = a;
		}

		var count = largerList.length - smallerList.length;

		for (var i = 0; i < smallerList.length; ++i) {
			if (smallerList[i] !== largerList[i]) {
				return {
					pos: i,
					count: count
				};
			}
		}

		return {
			pos: smallerList.length,
			count: count
		};
	},

	verifyFunctionPresent: /* @this */ function verifyFunctionPresent(name) {
		if (!this[name]) {
			throw new TypeError('CourseTileSlidingGridBehavior requires "' + name + '" be implemented to function.');
		}
	}

};
