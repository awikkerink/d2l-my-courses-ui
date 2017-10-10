# Performance Timings

As my-courses renders, various performance timings are tracked and are exposed through the [Navigation Timing API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_timing_API).

![my courses request timeline](/request-timeline.png?raw=true)

To see the marks & measures, run this in your browser console:
```javascript
window.performance.getEntriesByType('mark');
window.performance.getEntriesByType('measure');
```

## Marks

| Mark | Description |
| ---- | ----------- |
| `my-courses.attached` | Polymer `attached()` called. First opportunity for my-courses to do work. |
| `my-courses.root-enrollments.request` | Request initiated to enrollments root API. |
| `my-courses.root-enrollments.response` | Response received from enrollments root API. |
| `my-courses.search-enrollments.request` | Request initiated to enrollments search API. |
| `my-courses.search-enrollments.response` | Response received from enrollments search API. |
| `my-courses.tiles.rendered` | Approximation for when all course tiles skeletons have rendered (no organization, course image or notification data). |
| `my-courses.tiles.first-organization` | First request initiated to organizations API.  |
| `my-courses.tiles.organizations` | All API calls to fetch course tile organization information have returned and tiles have likely rendered that data. |
| `my-courses.tiles.images` | All course tile images have loaded. |
| `my-courses.complete` | My-courses is finished and complete. Notifications may still happen after this, but are purely additive. |

## Measures

| Measure | Description | Start Mark | End Mark |
| ------- | ----------- | ---------- | -------- |
| `my-courses.root-enrollments` | Duration of the enrollments root API request. Often includes time to fetch token. | `my-courses.root-enrollments.request` | `my-courses.root-enrollments.response` |
| `my-courses.search-enrollments` | Duration of the enrollments search API request. | `my-courses.search-enrollments.request` | `my-courses.search-enrollments.response` |
| `my-courses.tiles.rendered` | Once enrollments are available, total time for all tiles to initially render, minus organization/image/notification data. | `my-courses.search-enrollments.response` | `my-courses.tiles.rendered` |
| `my-courses.tiles.organizations` | Duration of all calls to organization APIs. | `my-courses.search-enrollments.response` | `my-courses.tiles.organizations` |
| `my-courses.tiles.images` | Estimation of time to for all course tile images to load. | `my-courses.tiles.first-organization` | `my-courses.tiles.images` |
| `my-courses` | Approximation of total time for my-courses to complete loading. | `my-courses.attached` | `my-courses.complete` |
