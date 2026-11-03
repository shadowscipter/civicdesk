import type { ApplicationStatus, FeedbackRecord, JobApplication } from '../types'

export const initialFeedback: FeedbackRecord[] = [
  {
    id: 'FDB-2841', customer: 'Nandi Mokoena', subject: 'Long wait at the service desk',
    category: 'Complaint', department: 'Customer Service', rating: 2, submittedAt: '2026-10-28',
    status: 'In Progress', summary: 'Waited around 25 minutes for help with a return. The team member was kind once available.',
    internalNotes: ['Service desk lead has been asked to review peak-hour cover.'],
  },
  {
    id: 'FDB-2840', customer: 'Ethan Jacobs', subject: 'A thoughtful in-store experience',
    category: 'Compliment', department: 'Customer Service', rating: 5, submittedAt: '2026-10-28',
    status: 'Resolved', summary: 'A team member helped locate a suitable product and made the visit feel easy.',
    internalNotes: [],
  },
  {
    id: 'FDB-2839', customer: 'Lerato Dlamini', subject: 'Suggestion for clearer aisle signs',
    category: 'Suggestion', department: 'Operations', rating: 4, submittedAt: '2026-10-27',
    status: 'New', summary: 'Would appreciate clearer signs near the home and seasonal sections.',
    internalNotes: [],
  },
  {
    id: 'FDB-2838', customer: 'Oliver Naidoo', subject: 'Product availability request',
    category: 'Product request', department: 'Stock Management', rating: 3, submittedAt: '2026-10-26',
    status: 'New', summary: 'Asked whether more locally made kitchenware could be considered for the range.',
    internalNotes: [],
  },
  {
    id: 'FDB-2837', customer: 'Amara Petersen', subject: 'Helpful assistance with an exchange',
    category: 'Compliment', department: 'Customer Service', rating: 5, submittedAt: '2026-10-25',
    status: 'Resolved', summary: 'The exchange was handled quickly and with clear communication.',
    internalNotes: ['Shared with the branch team during the weekly huddle.'],
  },
  {
    id: 'FDB-2836', customer: 'Sibusiso Khumalo', subject: 'Checkout queue moved slowly',
    category: 'Service', department: 'Operations', rating: 2, submittedAt: '2026-10-24',
    status: 'In Progress', summary: 'Only two tills were open during a busy afternoon visit.',
    internalNotes: [],
  },
  {
    id: 'FDB-2835', customer: 'Mia van der Merwe', subject: 'Packaging suggestion',
    category: 'Suggestion', department: 'Operations', rating: 4, submittedAt: '2026-10-23',
    status: 'Resolved', summary: 'Suggested offering a paper option for smaller purchases.',
    internalNotes: ['Forwarded to the operations coordinator.'],
  },
]

export const initialApplications: JobApplication[] = [
  {
    id: 'APP-1924', applicant: 'Thandi Nkosi', initials: 'TN', email: 'thandi.nkosi@example.test',
    department: 'Customer Service', employmentType: 'Part-time', availability: 'Two weeks',
    experience: '2 years', receivedAt: '2026-10-29', status: 'Under Review',
    summary: 'Customer-facing experience in a busy community setting; interested in flexible shifts.',
    internalNotes: ['Review availability against December rota.'], cvOnFile: true,
  },
  {
    id: 'APP-1923', applicant: 'Daniel Botha', initials: 'DB', email: 'daniel.botha@example.test',
    department: 'Stock Management', employmentType: 'Full-time', availability: 'Immediately',
    experience: '4 years', receivedAt: '2026-10-28', status: 'Shortlisted',
    summary: 'Inventory and goods-receiving experience with a focus on accurate stock records.',
    internalNotes: ['Shortlisted for an initial conversation.'], cvOnFile: true,
  },
  {
    id: 'APP-1922', applicant: 'Zanele Mthembu', initials: 'ZM', email: 'zanele.mthembu@example.test',
    department: 'Administration', employmentType: 'Temporary', availability: 'One month',
    experience: '1 year', receivedAt: '2026-10-27', status: 'Received',
    summary: 'Organised applicant with office support and document management experience.',
    internalNotes: [], cvOnFile: true,
  },
  {
    id: 'APP-1921', applicant: 'Kabelo Molefe', initials: 'KM', email: 'kabelo.molefe@example.test',
    department: 'Operations', employmentType: 'Weekend', availability: 'Weekends',
    experience: '3 years', receivedAt: '2026-10-26', status: 'Interview Scheduled',
    summary: 'Experienced in team coordination and day-to-day operations support.',
    internalNotes: ['Interview scheduled for 4 November.'], cvOnFile: true,
  },
  {
    id: 'APP-1920', applicant: 'Ayesha Khan', initials: 'AK', email: 'ayesha.khan@example.test',
    department: 'General Application', employmentType: 'Holiday', availability: 'School holidays',
    experience: 'No prior experience', receivedAt: '2026-10-24', status: 'Received',
    summary: 'Seeking a first role during school breaks; available for training.',
    internalNotes: [], cvOnFile: false,
  },
  {
    id: 'APP-1919', applicant: 'Liam Petersen', initials: 'LP', email: 'liam.petersen@example.test',
    department: 'Customer Service', employmentType: 'Full-time', availability: 'One month',
    experience: '5 years', receivedAt: '2026-10-22', status: 'Unsuccessful',
    summary: 'Strong service background; experience does not currently match the role requirements.',
    internalNotes: ['Decision recorded after the first review.'], cvOnFile: true,
  },
]

export const applicationStatuses: ApplicationStatus[] = [
  'Received', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Unsuccessful', 'Hired',
]

export const feedbackTrend = [
  { label: 'Wk 1', value: 31 }, { label: 'Wk 2', value: 37 }, { label: 'Wk 3', value: 34 },
  { label: 'Wk 4', value: 46 }, { label: 'Wk 5', value: 41 }, { label: 'Wk 6', value: 54 },
  { label: 'Wk 7', value: 49 }, { label: 'Wk 8', value: 62 },
]