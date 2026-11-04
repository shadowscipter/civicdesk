# CivicDesk

CivicDesk is an independent customer experience and employment management platform for organizations that need one place to review customer feedback, coordinate recruitment, and understand operational activity. The product is designed to be adaptable to retailers, educational institutions, and other organizations. It is not affiliated with any existing company.

## Problem Statement

Customer feedback and recruitment applications often arrive through disconnected channels. This makes ownership, follow-up, and reporting difficult to track. CivicDesk brings those workflows into a shared management workspace while keeping customer and applicant processes distinct.

## Objectives

- Give teams a clear overview of feedback, recruitment activity, and outstanding work.
- Make feedback and application queues searchable, filterable, and actionable.
- Provide organization-level branding and a role model that can grow with different teams.
- Establish a documented path to tenant-isolated storage and access control.
- Treat personal information and applicant documents as sensitive by design.

## Phase 1 Features

- Responsive management dashboard with activity trends and attention queues.
- Customer feedback list with search, category/status filters, assignment, internal notes, and status updates.
- Recruitment list with search, department/employment/status filters, applicant details, internal notes, and status updates.
- Recruitment pipeline overview that includes general expressions of interest.
- Reports for feedback trends, satisfaction, categories, resolution, departments, and application statuses.
- Organization profile and brand color settings, role overview, notification preferences, and privacy notes.
- Fictional demonstration records only. Feedback and application edits are held in memory; organization settings are saved in the current browser's local storage.

Public customer and applicant portals, authentication, database persistence, and CV uploads are future phases and are not implemented. The UI does not claim that authentication, notifications, or secure document storage are operational.

## Technology Stack

- React 19 and TypeScript
- Vite
- CSS
- Lucide React icons
- Supabase / PostgreSQL planned for a future backend; no Supabase client or credentials are configured

## Architecture

The frontend lives in `app/`. Shared types and fictional records are in `app/src/types/` and `app/src/data/`. Reusable navigation and display elements are in `app/src/components/`; each management module is in `app/src/pages/`; the app-wide visual system is in `app/src/styles/`. `App.tsx` owns the current module, record state, and locally saved organization identity.

The planned backend is organized around an `organisations` tenant boundary. User profiles and roles belong to an organization; feedback, applications, notes, notifications, documents, and audit events carry organization ownership. See [System Architecture](documentation/system-architecture.md) for the planned entities and access policy.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Installation and Development

```bash
cd app
npm install
npm run dev
```

Vite prints the local development URL after startup. To run the production checks:

```bash
npm run build
npm run lint
npm run preview
```

No environment variables are needed for the frontend prototype. Do not add credentials to source files. A future Supabase setup should use environment variables and server-enforced policies; the browser must never receive a service-role key.

## Database Architecture

The planned Supabase schema contains `organisations`, `profiles`, `user_roles`, `customer_feedback`, `feedback_categories`, `feedback_notes`, `job_applications`, `application_documents`, `application_notes`, `notifications`, and `audit_logs`. UUID primary keys, organization foreign keys, created/updated timestamps, restrictive storage access, and organization-scoped Row Level Security are part of the design. This schema has not been deployed. See [System Architecture](documentation/system-architecture.md).

## Security and Privacy

This is a frontend demonstration and is not suitable for real customer or applicant information. It has no authentication, authorization, server-side validation, database, secure file storage, email delivery, or audit trail. The sample names and addresses are fictional `.test` data. Do not upload CVs or enter personal information.

The planned design considers South Africa's Protection of Personal Information Act (POPIA), including purpose limitation, notice and consent, least-privilege access, controlled retention, secure document handling, and organization-level data separation. Planning these controls does not make the prototype POPIA-compliant. See [Privacy and Security](documentation/privacy-and-security.md) for limitations and production requirements.

## Roadmap

1. **Phase 1: Management frontend** — dashboard, navigation, customer feedback, recruitment management, reports, and settings. Implemented as a local demonstration.
2. **Phase 2: Public portals** — customer feedback submission, employment applications, consent notices, secure upload UX, and reference/status tracking.
3. **Phase 3: Backend** — Supabase/PostgreSQL, authentication, role management, tenant isolation, private document storage, and RLS.
4. **Phase 4: Advanced workflows** — email notifications, status alerts, expanded analytics, exports, and audit logs.
5. **Phase 5: Deployment** — production environment configuration, hosting, security review, accessibility checks, and end-to-end testing.

## Screenshots

Add reviewed desktop and mobile captures to `screenshots/` and link them here. No screenshots are checked in yet.

## License

This project is distributed under the MIT License. See [LICENSE](LICENSE).
