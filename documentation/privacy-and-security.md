# Privacy and Security

## Status and Scope

CivicDesk is a frontend-only demonstration. It is not suitable for real customer or applicant information and is not represented as POPIA-compliant. It has no authentication, role enforcement, backend validation, database, secure CV handling, encryption controls, audit logging, or deletion/retention automation. Feedback and application edits exist only in page memory; the organization settings are stored in the current browser's local storage. Do not enter real personal information or upload real CVs.

All sample people and contact data are fictional. Email addresses use `.test`; CV indicators are illustrative metadata and no documents are stored.

## POPIA-Aware Design Intent

Before a production deployment in South Africa, the organization operating CivicDesk must determine its lawful processing basis and responsibilities, provide appropriate privacy notices, define purposes and retention periods, and support applicable data-subject rights. Collect only information necessary for a stated purpose. Applicant consent text and notices must be reviewed for the actual recruitment process and must not imply that an application guarantees a vacancy or employment.

The system design should support:

- Clear notices at submission, including purpose, responsible party contact details, recipients, retention, and rights information.
- Explicit, recorded consent where required, separated from optional communications.
- Role-based least-privilege access and organization-level data isolation.
- Private CV storage, malware/content checks, access logging, and short-lived authorized access.
- Retention and deletion schedules for unsuccessful applications, feedback, documents, backups, and audit events.
- Secure authentication, MFA for privileged users, secret management, encryption in transit and at rest, and incident response.
- Access/change audit trails that avoid storing unnecessary sensitive content.
- Data-subject request handling and procedures for correction, access, objection, and deletion where applicable.

These are implementation requirements and review topics, not implemented controls or legal advice. Engage qualified privacy and security professionals before processing personal information.

## Applicant Documents

CVs and qualifications can contain sensitive personal information. The prototype accepts no files. A production implementation should use a private storage bucket, strict type and size validation, malware scanning, non-guessable object identifiers, tenant/application ownership checks, audited staff access, and expiring signed URLs. Never use public buckets or expose storage paths through public endpoints. Define document retention and deletion behavior before enabling uploads.

## Tenant and Role Boundaries

Every business record should have a validated organization relationship. Supabase RLS must enforce tenant and role boundaries in the database, including notes, notifications, audit logs, and storage objects. Hiding UI elements is not authorization. Public endpoints must be restricted to creating validated submissions and returning a non-sensitive reference/status response; they must not enumerate or disclose internal records.

## Production Readiness Checklist

- Approve the privacy notice, consent language, lawful basis, retention schedule, and responsible-party details.
- Implement and test authentication, MFA options, role checks, RLS policies, and cross-tenant isolation.
- Implement private CV storage and restricted, audited document access.
- Add server-side validation, rate limiting, abuse controls, secure error handling, and monitoring.
- Establish audit, backup, breach response, deletion, and data-subject request procedures.
- Complete threat modeling, dependency review, penetration testing, accessibility review, and operational sign-off.
- Verify deployment configuration and ensure secrets are absent from source, client bundles, logs, and screenshots.