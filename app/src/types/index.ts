export type ModuleKey = 'dashboard' | 'feedback' | 'applications' | 'reports' | 'settings'

export type FeedbackStatus = 'New' | 'In Progress' | 'Resolved'
export type FeedbackCategory = 'Complaint' | 'Compliment' | 'Suggestion' | 'Product request' | 'Service'

export interface FeedbackRecord {
  id: string
  customer: string
  subject: string
  category: FeedbackCategory
  department: string
  rating: number
  submittedAt: string
  status: FeedbackStatus
  summary: string
  internalNotes: string[]
}

export type ApplicationStatus =
  | 'Received'
  | 'Under Review'
  | 'Shortlisted'
  | 'Interview Scheduled'
  | 'Unsuccessful'
  | 'Hired'

export type EmploymentType = 'Full-time' | 'Part-time' | 'Temporary' | 'Weekend' | 'Holiday'
export type Department =
  | 'Customer Service'
  | 'Administration'
  | 'Stock Management'
  | 'Operations'
  | 'General Application'

export interface JobApplication {
  id: string
  applicant: string
  initials: string
  email: string
  department: Department
  employmentType: EmploymentType
  availability: string
  experience: string
  receivedAt: string
  status: ApplicationStatus
  summary: string
  internalNotes: string[]
  cvOnFile: boolean
}

export interface OrganizationSettings {
  name: string
  type: string
  email: string
  phone: string
  description: string
  brandColor: string
}