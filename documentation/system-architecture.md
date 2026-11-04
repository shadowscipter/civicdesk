# System Architecture

## Current Prototype

The application is a Vite single-page frontend in `app/`:

- `src/App.tsx` owns module navigation, in-memory feedback and application records, and organization settings.
- `src/components/` contains the sidebar, top bar, page header, statistics card, and status badge.
- `src/pages/` contains dashboard, feedback, recruitment, reporting, and settings views.
- `src/data/mockData.ts` provides fictional demonstration records.
- `src/types/` defines the UI domain contracts.
- `src/styles/` holds shared styles, layout rules, and component styles.

There is no backend client or data persistence for feedback and applications. Organization settings use browser local storage and are not an authoritative organization record. The frontend is not an access-control boundary.

## Planned Supabase Components

Supabase Auth would provide identities. PostgreSQL would hold organization-scoped business data. Supabase Storage would hold private application documents. A production design should use migrations, server-side validation, RLS on every exposed table, private buckets, and least-privilege access. The browser must use only a public/anon key; privileged operations belong in trusted server functions.

## Planned Data Model

All primary keys should be UUIDs. Business tables should include `organisation_id` as a non-null foreign key and `created_at` / `updated_at` timestamps. Use database constraints for valid status values and indexes on `organisation_id`, status, and common search/sort fields.

| Table | Purpose and relationships |
| --- | --- |
| `organisations` | Tenant root; owns all organization data and stores configurable branding and contact details. |
| `profiles` | User profile linked one-to-one to `auth.users`; scoped to an organization. |
| `user_roles` | Role assignments for a profile and organization; constrain values to Administrator, HR / Recruitment, Customer Service, or Management. |
| `feedback_categories` | Organization-defined feedback categories; optionally seeded with standard categories. |
| `customer_feedback` | Submission details, rating, category, department, status, reference, and timestamps; belongs to an organization. |
| `feedback_notes` | Internal notes linked to feedback and the author profile; never returned to public submitters. |
| `job_applications` | Applicant details, preferences, availability, qualifications, experience, status, consent metadata, and reference; belongs to an organization. |
| `application_documents` | Private Storage object metadata linked to an application; store object path and access/retention metadata, not public URLs. |
| `application_notes` | Internal recruitment notes linked to an application and author profile. |
| `notifications` | Recipient-scoped notification metadata with read state and related record references. |
| `audit_logs` | Append-oriented record of sensitive administrative and workflow actions, actor, tenant, timestamp, and minimal change metadata. |

Recommended relationships include `organisations 1:N profiles`, `profiles 1:N user_roles`, `organisations 1:N customer_feedback`, `customer_feedback 1:N feedback_notes`, `organisations 1:N job_applications`, and `job_applications 1:N application_documents` / `application_notes`. Use `ON DELETE RESTRICT` or a reviewed soft-delete/retention process for records containing personal information; avoid cascading deletion that bypasses retention obligations.

## Authorization and RLS Plan

Enable RLS on every table reachable through the Supabase API. A shared, reviewed authorization helper should establish the caller's organization membership and role from trusted database records, not client-provided organization IDs. Policies should require both organization membership and role permission for each operation. For example:

- Administrators manage organization configuration and membership.
- HR / Recruitment can read and update applications and recruitment notes only in their organization.
- Customer Service can read and update feedback and feedback notes only in their organization.
- Management can read aggregate reporting data and only the personal details needed for an approved workflow.
- Public submission endpoints can insert a validated submission through a narrowly scoped server function, but cannot select applicant/customer records, notes, users, or documents.
- Storage policies validate the object path's organization and application ownership and allow access only to authorized staff. Files remain in a private bucket with short-lived signed access where appropriate.

RLS policies must cover `SELECT`, `INSERT`, `UPDATE`, and `DELETE` independently. Test cross-tenant access and role boundaries with automated tests before production. This policy set is a design plan; no SQL migrations or policies currently exist.

## Integration Sequence

1. Define migrations, constraints, indexes, and tenant membership model.
2. Configure Supabase Auth and server-verified organization/role assignment.
3. Add repository/service boundaries to the frontend and replace in-memory data incrementally.
4. Add RLS and cross-tenant authorization tests before exposing any table.
5. Implement private document upload/download, consent capture, retention jobs, and audit events.
6. Conduct security, privacy, accessibility, and operational review before production use.