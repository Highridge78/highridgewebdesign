# CRM Usage SOP

## Statuses

- Prospect Identified
- Rapid Screen Complete
- Loom Queued
- Loom Recorded
- Loom Sent
- Summary Sent
- Viewed / No Reply
- Replied
- Call Booked
- Proposal Opportunity
- Won
- Lost
- Dormant

## Next Action Logic

- Every row must always have `next_action` + `next_action_date`.
- No "floating" leads without scheduled action.

## Follow-up Logic

- If no response: follow up on Day 2, Day 5, Day 9.
- If viewed/no reply: send value recap within 24-48h.
- If replied: move to booking action same day.

## Priority Rules

- A: high fit + obvious conversion leaks + likely budget
- B: medium fit or weaker urgency
- C: low fit or low probability

## Dormant Rules

Move to Dormant when:

- 4+ touches with no engagement
- Explicit "not now"
- Timing mismatch > 45 days

Set future `next_action_date` for reactivation.

## Weekly Hygiene

- Remove stale rows missing next action
- Update days-since-last-touch
- Promote/demote priority based on new data
