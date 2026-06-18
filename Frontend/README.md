# Learning Management System (LMS) Frontend

A production-grade Learning Management System frontend built with **React 19 + Vite + Tailwind CSS**.

## Project Overview

This LMS platform provides comprehensive management for educational institutions with role-based dashboards for:
- **Admin**: Manage students, faculty, mentors, courses, and batches
- **Faculty**: Create and manage courses, assignments, sessions, and attendance
- **Students**: Access study materials, submit assignments, and track progress
- **Mentors**: Monitor mentees' performance and attendance

## Project Structure

```
src/
├── modules/                 # Feature-based modules
│   ├── admin/              # Admin portal
│   ├── faculty/            # Faculty portal
│   ├── student/            # Student portal
│   ├── mentor/             # Mentor portal
│   └── home/               # Landing page
│
├── shared/                 # Shared resources
│   ├── components/         # Reusable UI components
│   ├── layouts/            # Layout components
│   ├── constants/          # Application constants
│   └── utils/              # Utility functions
│
├── App.jsx                 # Main app with routing
└── main.jsx                # Entry point
```

## Key Features

### Reusable Components
- **DashboardCard**: Display key metrics
- **DataTable**: Searchable, filterable tables with pagination
- **Button**: Multi-variant button component
- **Sidebar**: Navigation sidebar with role-based menu
- **Navbar**: Header with user info and notifications
- **BadgeStatus**: Status indicators
- **LoadingState**: Loading indicator
- **EmptyState**: Empty state placeholder

### Role-Based Dashboards

#### Admin Dashboard
- Student, Faculty, Mentor management
- Course and batch management
- System overview and statistics

#### Faculty Dashboard
- Module and notes management
- Assignment creation and submission review
- Session scheduling
- Attendance tracking

#### Student Dashboard
- Course progress tracking
- Access to study materials
- Assignment submission and grading
- Attendance records

#### Mentor Dashboard
- Mentee performance monitoring
- Attendance overview
- Quick actions for common tasks

## Design System

### Colors
- **Primary**: #2563EB (Blue)
- **Sidebar**: #0F172A (Dark Blue)
- **Background**: #F8FAFC (Light Gray)
- **Card**: #FFFFFF (White)
- **Border**: #E2E8F0 (Gray)

### Typography
- **Font Family**: System fonts
- **Headings**: Bold, 24px - 48px
- **Body**: Regular, 14px - 16px

### Components Styling
- Rounded corners with soft shadows
- Hover effects for interactivity
- Responsive grid layouts
- Clean spacing and padding

## Installation & Setup

### Prerequisites
- Node.js 16+
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The application will be available at `http://localhost:5173`

## Routes

### Public Routes
- `/` - Home/Landing page

### Admin Routes
- `/admin` - Admin dashboard
- `/admin/students` - Student management
- `/admin/faculty` - Faculty management
- `/admin/mentors` - Mentor management
- `/admin/courses` - Course management
- `/admin/batches` - Batch management
- `/admin/student-batch` - Student-batch mapping

### Faculty Routes
- `/faculty` - Faculty dashboard
- `/faculty/modules` - Module management
- `/faculty/notes` - Notes distribution
- `/faculty/assignments` - Assignment management
- `/faculty/submissions` - Submission review
- `/faculty/sessions` - Session scheduling
- `/faculty/attendance` - Attendance tracking

### Student Routes
- `/student` - Student dashboard
- `/student/notes` - Study materials
- `/student/assignments` - Assignments
- `/student/submissions` - Submission history
- `/student/attendance` - Attendance records

### Mentor Routes
- `/mentor` - Mentor dashboard
- `/mentor/students` - Mentee management
- `/mentor/attendance` - Attendance tracking

## Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Architecture Highlights

### Module-Based Structure
Each feature module (admin, faculty, student, mentor) is self-contained with:
- `pages/` - Page components
- `components/` - Module-specific components
- `hooks/` - Custom React hooks
- `api/` - API integration layer

### Shared Components
Centralized, reusable components with consistent styling and behavior patterns

### Layout System
Responsive dashboard layout with:
- Fixed sidebar navigation
- Top navbar with user info
- Main content area with padding
- Mobile-optimized layout

## Customization

### Adding New Pages
1. Create a new file in the appropriate module's `pages/` folder
2. Export the component from the module's `index.js`
3. Add route in `App.jsx`

### Modifying Colors
Update the color values in `tailwind.config.js`:
```javascript
colors: {
  primary: '#2563EB',
  sidebar: '#0F172A',
  // ... more colors
}
```

### Creating New Components
1. Create component file in `src/shared/components/`
2. Export from `src/shared/components/index.js`
3. Import and use throughout the app

## Next Steps for Implementation

1. **API Integration**: Connect components to backend APIs
2. **State Management**: Add context or state management solution if needed
3. **Authentication**: Implement user authentication and role-based access
4. **Validation**: Add form validation and error handling
5. **Testing**: Add unit and integration tests
6. **Documentation**: Create component documentation
7. **Performance**: Optimize images and bundle size
8. **Accessibility**: Enhance ARIA labels and keyboard navigation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is part of the LMS platform.

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
