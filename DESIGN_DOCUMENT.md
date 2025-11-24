# VOX Academic Journal Platform

## Overview
VOX is an academic journal management platform designed for research institutions to showcase their labs, researchers, and publish peer-reviewed articles. The platform serves as both a public-facing research directory and an internal content management system. It features a comprehensive lab directory where each lab displays its principal investigators, students, research areas, and published work. A people directory highlights all researchers with their profiles, affiliations, and academic credentials (ORCID, Google Scholar). The core functionality centers on journal article management with a complete review workflow - from submission through peer review to final publication with DOI assignment and volume/issue organization.

The system is admin-centric: administrators have full control over all content including lab information, researcher profiles, article submissions, and the entire peer review process. Non-admin users (PIs and students) can only update their own profile information - they are displayed on the platform but do not participate in content management or editorial workflows. This simplified permission model makes VOX ideal for institutions that want centralized control over their academic publication platform while maintaining a rich, searchable directory of their research community and scholarly output.

## Stack
- **CMS**: Payload 3.x + TypeScript + Node.js 18+
- **Database**: PostgreSQL
- **Frontend**: React 18+
- **Storage**: Media uploads for images/PDFs

## Core Data Models

### Users
```ts
{
  type: 'admin' | 'pi' | 'student',
  firstName, lastName, email (unique),
  profileImage, bio (richText),
  affiliation: [Lab],  // multiple labs
  title, researchInterests: string[],
  website, orcid, googleScholar
}
```
**Access**: Admins have full control. Non-admins can only update their own profile.

### Labs
```ts
{
  name, slug (unique),
  principalInvestigators: [User],  // filter: type='pi'
  students: [User],  // filter: type='student'
  description (richText), labImage,
  researchAreas: string[],
  department, institution (required),
  location: { building, room, address },
  contactEmail, website, established (date)
}
```
**Access**: Public read. Admin-only create/update.

### Articles
```ts
{
  title, slug (unique),
  authors: [User], correspondingAuthor: User,
  lab: Lab, journal: Journal,
  abstract (textarea), content (richText),
  keywords: string[], doi,
  publishedDate, submittedDate,
  
  // Workflow
  status: 'draft' | 'ready_for_review' | 'under_review' | 
          'changes_requested' | 'approved' | 'ready_for_publishing' | 
          'published' | 'rejected',
  
  reviews: [{
    reviewer: User, reviewDate, 
    decision: 'approve' | 'request_changes' | 'reject',
    comments (richText), confidentialNotes (richText)
  }],
  
  changeRequests: [{
    requestedBy: User, requestDate,
    changes (richText), resolved (boolean), resolvedDate
  }],
  
  assignedReviewers: [User],
  
  // Publication metadata
  volume, issue, pages: { start, end },
  citations (richText),
  supplementaryMaterials: [{ file, description }],
  pdfVersion (upload)
}
```
**Access**: 
- Public: Read published only
- Admin: Full CRUD
- Drafts enabled for versioning

### Journals
```ts
{
  name (default: 'VOX'), slug (unique),
  description (richText), issn, coverImage,
  editors: [User],  // filter: type='admin'
  scope (richText), submissionGuidelines (richText),
  frequency: 'monthly' | 'quarterly' | 'biannually' | 'annually',
  openAccess (boolean, default: true)
}
```
**Access**: Public read. Admin-only write.

### Media
```ts
{
  upload: { staticDir: 'media', mimeTypes: ['image/*', 'application/pdf', 'application/zip'] },
  alt, caption
}
```

## Review Workflow States
```
draft → ready_for_review → under_review → [approved | changes_requested | rejected]
                                            ↓              ↓
                                   ready_for_publishing  ← (revision cycle)
                                            ↓
                                        published
```

**Admin-Only Actions**: All status transitions, reviewer assignment, publishing, DOI assignment.

## Key Hooks
```ts
// Articles collection
beforeChange: [
  // Auto-set submittedDate when status → ready_for_review
  // Auto-set publishedDate when status → published
],
afterChange: [
  // Send email notifications on status changes
  // Notify authors: under_review, changes_requested, approved, published
]
```

## Custom Endpoints
```ts
POST /api/articles/:id/submit-review
  // Body: { decision, comments, confidentialNotes }
  // Admin only, updates reviews array + status

POST /api/articles/:id/assign-reviewers
  // Body: { reviewerIds: string[] }
  // Admin only, sets assignedReviewers + status=under_review
```

## Public Pages
- `/` - Landing (featured articles)
- `/labs` - Lab directory (grid + search)
- `/labs/[slug]` - Lab detail (members, publications)
- `/people` - People directory (filterable)
- `/people/[id]` - Person profile
- `/journals/vox` - Journal + articles by volume/issue
- `/articles/[slug]` - Full article view

## Admin Pages
- `/admin` - Dashboard (review queue, stats)
- `/admin/reviews` - Review queue list
- `/admin/reviews/[id]` - Review form + decision

## Environment Variables
```
DATABASE_URI=
PAYLOAD_SECRET=
PAYLOAD_PUBLIC_SERVER_URL=https://vox-journal.org
S3_BUCKET=
SMTP_HOST=
```

## Directory Structure
```
src/
├── collections/
│   ├── Users.ts
│   ├── Labs.ts
│   ├── Articles.ts
│   ├── Journals.ts
│   └── Media.ts
├── access/
│   └── isAdmin.ts
├── payload.config.ts
└── server.ts
```

## Key Implementation Notes
1. **Single Admin Role**: Only admins manage all content, submissions, reviews, publishing
2. **User Self-Service**: PIs/students only update their own profiles
3. **Review System**: Admins act as reviewers, manage entire workflow
4. **Email Notifications**: Trigger on status changes (changes_requested, approved, published)
5. **Public Access**: Labs, people, published articles are publicly readable