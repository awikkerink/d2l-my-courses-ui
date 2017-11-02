# Performance Timings

As my-courses renders, various performance timings are tracked and are exposed through the [Navigation Timing API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_timing_API).

![my courses request timeline](/request-timeline.png?raw=true)

To see the marks & measures, run this in your browser console:
```javascript
window.performance.getEntriesByType('mark')
	.filter(function(e) { return e.name.indexOf('my-courses') > -1; });
performance.getEntriesByType('measure')
	.filter(function(e) { return e.name.indexOf('my-courses') > -1; });
```

## Marks

| Mark | Description |
| ---- | ----------- |
| `d2l.my-courses.attached` | Polymer `attached()` called. First opportunity for my-courses to do work. |
| `d2l.my-courses.root-enrollments.request` | Request initiated to enrollments root API. |
| `d2l.my-courses.root-enrollments.response` | Response received from enrollments root API. |
| `d2l.my-courses.search-enrollments.request` | Request initiated to enrollments search API. |
| `d2l.my-courses.search-enrollments.response` | Response received from enrollments search API. |
| `d2l.my-courses.tiles.rendered` | Approximation for when all course tiles skeletons have rendered (no organization, course image or notification data). |
| `d2l.my-courses.tiles.first-organization` | First request initiated to organizations API.  |
| `d2l.my-courses.tiles.organizations` | All API calls to fetch course tile organization information have returned and tiles have likely rendered that data. |
| `d2l.my-courses.tiles.images` | All course tile images have loaded. |
| `d2l.my-courses.complete` | My-courses is finished and complete. Notifications may still happen after this, but are purely additive. |

## Measures

| Measure | Description | Start Mark | End Mark |
| ------- | ----------- | ---------- | -------- |
| `d2l.my-courses.root-enrollments` | Duration of the enrollments root API request. Often includes time to fetch token. | `d2l.my-courses.root-enrollments.request` | `d2l.my-courses.root-enrollments.response` |
| `d2l.my-courses.search-enrollments` | Duration of the enrollments search API request. | `d2l.my-courses.search-enrollments.request` | `d2l.my-courses.search-enrollments.response` |
| `d2l.my-courses.tiles.rendered` | Once enrollments are available, total time for all tiles to initially render, minus organization/image/notification data. | `d2l.my-courses.search-enrollments.response` | `d2l.my-courses.tiles.rendered` |
| `d2l.my-courses.tiles.organizations` | Duration of all calls to organization APIs. | `d2l.my-courses.search-enrollments.response` | `d2l.my-courses.tiles.organizations` |
| `d2l.my-courses.tiles.images` | Estimation of time to for all course tile images to load. | `d2l.my-courses.tiles.first-organization` | `d2l.my-courses.tiles.images` |
| `d2l.my-courses` | Approximation of total time for my-courses to complete loading. | `d2l.my-courses.attached` | `d2l.my-courses.complete` |
