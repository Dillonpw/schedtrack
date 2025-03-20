# Sched Track

A modern, interactive schedule management application built with Next.js, TypeScript, and Tailwind CSS. This application allows users to create, manage, and view multiple schedules with a beautiful calendar interface.

🌐 [Live](https://schedtrack.com)

## Features

### Schedule Management
- Create and manage multiple schedules
- Delete schedules with confirmation
- View all schedules in a grid layout with entry counts and start dates
- Toggle schedule visibility in the calendar view

### Calendar View
- Interactive monthly calendar display
- Color-coded schedule entries
- Responsive design for mobile and desktop
- Hover effects for better interaction
- Scrollable schedule entries within each day
- Quick view of schedule details in popovers
- "+X" indicator for days with multiple schedules
- Detailed view of all schedules for a specific day

### Schedule Entries
- Add shift notes and descriptions
- Color-coded schedule indicators
- Mobile-optimized display with dots for small screens
- Desktop view with full schedule names
- Centered text for multi-line shift notes

### Data Management
- Download schedule data
- Filter visible schedules
- Persistent storage with database integration
- Real-time updates

## Tech Stack

- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Database**: Drizzle ORM
- **Authentication**: NextAuth.js
- **Icons**: Lucide Icons

## Project Structure

```
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── schedule-view.tsx  # Main calendar view component
│   ├── schedule-data.tsx  # Schedule data management
│   └── ui/               # Reusable UI components
├── db/                    # Database configuration
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.


