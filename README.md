# Sched Track

Sched Track is a scheduling web application designed to help users create work schedules based on flexible input parameters such as work days, off days, total days, and a start date. The app generates a new schedule based on the user’s inputs and provides a download feature for exporting schedules in CSV format.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)


## Features

- **Schedule Generator:** Users can generate custom schedules by inputting their desired work days, off days, total days, and a start date.
- **CSV Download:** Users can download their schedules in CSV format for easy integration into other software or personal use.
- **Responsive UI:** Designed to work on all devicees.
- **FAQ Section with Accordion:** Users can view frequently asked questions with a collapsible accordion feature for easy navigation.
- **Feedback**: Authenticated users can leave feedback of any kind to help make a better product.
- **User Authentication:** Users can sign up and log in to save and access their schedules (integrated with Auth.js).
- **Real-Time Updates:** The schedule is updated immediately after submission for, and stored until a new schedule is made.

## Technologies Used

- **Next.js**
- **React**
- **TypeScript**
- **Auth.js**
- **Tailwind CSS**
-  **Shadcn/UI**
- **CSV Export**


## Usage

1. **Login/Signup:**
   - Click on the "Sign In" button to log in or create an account. Once authenticated, you can genertae and save your schedules.

2. **Generate a Schedule:**
   - Navigate to the schedule generation form.
   - Input your desired number of workdays, off days, total days, and a start date.
   - Click "Generate Schedule" to see the output in calendar format or in a list depending on your preference.

3. **Download CSV:**
   - After generating a schedule, click the "Download CSV" button to export the schedule in `.csv` format to export into your more broadly scoped calendar.


