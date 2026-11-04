# CivicDesk Project Overview

## Product

CivicDesk is an independent customer experience and employment management platform. It provides organizations with a shared operational view of customer feedback, recruitment applications, and related administrative activity. The product is adaptable to retailers, schools, service providers, and other organizations; it has no affiliation with an existing company.

## Problem

Feedback and recruitment processes are frequently spread across inboxes and spreadsheets. Teams can lose track of ownership, response status, candidate progress, and recurring themes. CivicDesk aims to make these workflows visible and manageable without conflating customer records and applicant records.

## Objectives

- Centralize feedback and employment application review.
- Make ownership, status, and internal follow-up visible to authorized staff.
- Support applications for advertised opportunities and general expressions of interest.
- Provide useful customer experience and recruitment reporting.
- Allow basic organization identity to be configured without changing application code.
- Prepare for secure, organization-separated backend services.

## Phase 1 Demonstration

The frontend includes a management dashboard, customer feedback workflow, recruitment workflow, reports, and organization settings. Search and filters operate on the displayed records. Staff can update statuses, departments, and internal notes; the feedback module can add a demonstration entry. Organization name and color are saved in browser local storage. Feedback and application updates are held in memory and reset on reload.

All included people and contact details are fictional. Applicant email addresses use the reserved `.test` domain. CV availability is only a sample flag; no CV documents are present or accessible.

## Out of Scope

The prototype has no public portal, login, permission enforcement, database, Supabase integration, file upload, email notification, reference tracking, or production analytics. These are roadmap items, not working features.

## Users and Roles

- **Administrator:** organization configuration, user management, all modules, and reports.
- **HR / Recruitment:** applications, applicant records, recruitment notes, statuses, and recruitment reporting.
- **Customer Service:** customer feedback, complaint follow-up, categorization, and resolution.
- **Management:** dashboard and business reporting without unrestricted access to personal records.

The roles describe the planned authorization model only. The prototype does not authenticate users or enforce role restrictions.

## Development Phases

1. Management dashboard and internal workflows (current frontend demonstration).
2. Public customer feedback and employment application portals.
3. Supabase authentication, PostgreSQL, role enforcement, tenant isolation, and private storage.
4. Notifications, exports, audit history, and advanced analytics.
5. Production deployment, security review, accessibility review, and end-to-end testing.