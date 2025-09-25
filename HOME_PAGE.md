# Future Wave Home Page

## Overview
A modern, clean home page for the Future Wave online learning platform that provides users with quick access to their learning journey.

## Design Features

### Theme & Colors
- **Background**: Clean white (#FFFFFF) for optimal readability
- **Primary Accent**: Royal blue (#1A3C8E) for headers and highlights
- **Secondary Accent**: Gradient teal-to-sky blue (#00C6A7 → #2EB5E5) for buttons
- **Text Colors**: Dark grey (#2D2D2D) for main text, medium grey (#6B7280) for secondary info

### Layout Structure

#### 1. Header Bar
- **Left**: Future Wave logo (gradient wave icon)
- **Center**: Dynamic welcome message "Welcome, Aamir!" (bold 20px)
- **Right**: Notification bell with red badge showing alert count

#### 2. Search Bar
- Rounded rectangle with light grey background (#F3F4F6)
- Placeholder: "Search courses, exams, teachers…"
- Magnifying glass icon on the left

#### 3. Main Content (Scrollable)

**Banner/Carousel**
- Full-width sliding banner with blue/teal gradient
- Featured content: "Live PSC Crash Course Starting Tomorrow!"
- "Enroll Now" button with gradient background

**Quick Categories Grid**
- 4 rounded icons (80x80px each) in a row:
  - 🎥 Live Classes
  - 🎬 Recorded Videos  
  - 📄 Study Material
  - 📝 Exams

**Recommended Courses (Horizontal Scroll)**
- Card-based layout (150x200px each)
- Sample courses:
  - Kerala PSC Prelims – Crash Batch
  - Maths for SSC CGL
  - NEET Physics Fundamentals
- Each card includes: thumbnail, title, teacher name

**Upcoming Live Classes**
- List section with "Your Upcoming Classes" title
- Class cards showing:
  - Class title and description
  - Teacher name
  - Scheduled time
  - "Join" button in royal blue

#### 4. Bottom Navigation
- 5 tabs with icons and labels:
  - 🏠 Home (active by default)
  - 🎓 Courses
  - 📺 Live
  - 📝 Exams
  - 👤 Profile
- White background with royal blue active state

## Technical Implementation

### Components Structure
```
src/
├── screens/
│   ├── HomeScreen.tsx           # Main home content
│   ├── MainHomeScreen.tsx       # Container with bottom nav
│   └── LoginScreen.tsx          # Updated with home navigation
├── components/
│   └── BottomNavigation.tsx     # Bottom tab navigation
└── navigation/
    └── AppNavigator.tsx         # Updated navigation flow
```

### Key Features
- **Responsive Design**: Adapts to different screen sizes
- **Smooth Scrolling**: Horizontal course cards and vertical main content
- **Interactive Elements**: Touchable categories, courses, and class cards
- **Navigation Integration**: Seamless flow from login to home
- **Clean Typography**: Proper font weights and sizes for hierarchy
- **Shadow Effects**: Subtle shadows on cards for depth

### Navigation Flow
1. Welcome Screen → Login Screen → Home Screen
2. Bottom navigation switches between different sections
3. Login button navigates to home after validation

## Design Philosophy
- **Education-Focused**: Clean, professional design suitable for learning
- **User-Centric**: Quick access to important features and upcoming classes
- **Modern UI**: Rounded corners, soft shadows, and gradient accents
- **Intuitive Navigation**: Clear visual hierarchy and familiar patterns
- **Accessibility**: High contrast colors and readable font sizes

## Usage
After successful login, users land on the home page where they can:
- View upcoming live classes
- Browse recommended courses
- Access different learning categories
- Search for specific content
- Navigate to other sections via bottom tabs

The design balances functionality with aesthetics, providing a welcoming entry point to the Future Wave learning platform.
