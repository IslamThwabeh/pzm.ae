# Google Maps hours alignment — 19 November 2026

Source: the current Google Maps business-hours screenshot supplied directly by
the owner, who requested website parity and publication of all pending changes.

| Days | Opens | Closes |
| --- | --- | --- |
| Monday through Thursday | 11:00 AM | 11:00 PM |
| Friday | 10:30 AM | 11:00 PM |
| Saturday and Sunday | 10:30 AM | 11:30 PM |

All times are for the store in Dubai (Asia/Dubai).

Updated English/Arabic visible hours, all 29 business-hours JSON-LD schedules,
FAQ answers, llms.txt, historical contact/about fallback text and the public
alternate homepage. The alternate homepage's earliest-opening badge now says
10:30 AM and directs visitors to the daily schedule. The main homepage's
generic callback time choices remain available independently of walk-in hours.

Updated the local opening-status calculation and weekday text. Published new
content-hashed store-status and contact-loader assets under `assets/v20261119/`
and changed current HTML references to use them. Source and deployed copies
must match byte for byte. Previous assets remain available for cached pages.

The existing remote hours endpoint returned HTTP 403 during the terminal
check. The existing fetch failure handling keeps the verified local schedule;
the existing safeguard also ignores remote payloads marked `source: fallback`.
No Worker, DNS, hosting or Google Maps settings were changed.

Updated `copilot-instructions.md` to record the owner-confirmed schedule so
future edits do not restore the previous 10:00 AM weekend opening.

Verification passed for all 29 complete seven-day JSON-LD schedules, all
current shared script references and byte parity, English/Arabic hours display,
opening and closing boundaries for every day, fetch failure and remote fallback
handling, the 131 canonical sitemap targets, inventory/feed parity, contact
numbers, launch pages and the legacy decision register. Updated 37 content-change
sitemap dates while retaining article dates for script-reference-only changes.
