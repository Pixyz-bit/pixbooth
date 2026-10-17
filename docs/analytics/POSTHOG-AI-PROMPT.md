Create and save a dashboard named "Pixbooth — Product Overview" in US Cloud project 670283. Tag it pixbooth. This project contains multiple apps: EVERY insight and EVERY funnel step MUST filter event property app = pixbooth AND environment = production. Dashboard tags alone do not isolate data. Allow switching environment explicitly.

Use the last 30 days, daily intervals and previous-period comparisons where supported. Inspect available events and properties first. Reuse this dashboard if it exists.

Create these insights:
1. Daily unique visitors and total pageviews using $pageview.
2. Daily unique users for booth_started, customization_started and strip_downloaded.
3. Ordered unique-user funnel: booth_started → template_selected → camera_enabled → media_captured → customization_started → strip_downloaded. Use a one-hour conversion window and show conversion/drop-off. This measures visitors, not individual booth runs; direct-entry visitors may skip booth_started.
4. Layout popularity: template_selected counts by template_id and photo_count.
5. Captured media: media_captured counts by media_type (photo / live_clip). This event fires per captured item, not per strip.
6. Retake percentage: media_captured where is_retake = true divided by all media_captured.
7. Download requests: strip_downloaded counts by download_format and template_id. Label this Download requests because browser save completion is not observed.
8. Successful live MP4 compositions: live_strip_created counts and unique users. Composition does not mean downloaded.
9. Restarts: booth_session_restarted counts and unique users.
10. Page traffic: $pageview by route (/, /templates, /booth, /edit), and device/browser/country breakdowns using standard SDK properties where available.
11. Seven-day retention for booth_started users returning to booth_started, if sufficient data exists.

Arrange KPIs first, funnel second, then layout/media/export usage, traffic and retention. Add a text tile explaining filters and event semantics. Historical untagged events are excluded. Custom events send metadata, not photos, clips, captions or face landmarks. Autocapture and session recording are disabled.

Do not invent signup, revenue, completed-session, camera-denied or export-failed events. If data has not arrived, create what your tools allow and list which events require real production traffic; never fabricate results. Save the insights to this dashboard and return its link.