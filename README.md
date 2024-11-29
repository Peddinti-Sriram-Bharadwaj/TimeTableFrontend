# Display time table 

This is a React-based application that allows students to log in, view their timetable, and access registered courses. The application is built using Material UI for the user interface and Axios for API communication. The timetable can also be downloaded as a PDF for easy reference.

This is a small section of a complete ERP for a student portal at university

## Features
- **Login**: Allows users to log in with their email and password.
- **Timetable View**: Displays the student’s timetable.
- **Registered Courses View**: Displays a list of courses the student is enrolled in.
- **Download Timetable as PDF**: A button is available to download the student's timetable as a PDF.

## Technologies Used
- **React**: JavaScript library for building the user interface.
- **Material UI**: React UI framework for styling and components.
- **Axios**: Promise-based HTTP client for making requests to the backend API.
- **Tailwind CSS**: Utility-first CSS framework used for styling.
- **PDF Generation**: Custom utilities to download the timetable in PDF format.

## Setup

### Prerequisites
Make sure you have the following installed:
- Node.js
- npm or yarn

### Installation
1. Clone this repository:
   ```bash
   git clone <repository_url>
   cd <repository_folder>
Install dependencies:
npm install
Start the development server:
npm start
Open your browser and navigate to http://localhost:3000 to view the application.

### File Structure

    /src
        /components
            LoginForm.js          # Component for handling user login
            Timetable.js          # Component for displaying the student's timetable
            RegisteredCourses.js  # Component for displaying the list of registered courses
        /hooks
            useAuth.js            # Custom hook for managing authentication
            useTimetable.js       # Custom hook for fetching the student's timetable
            useCourses.js         # Custom hook for fetching registered courses
        /utils
            pdfUtils.js           # Utility functions for PDF download
        App.js                  # Main app component that ties everything together

### Usage

Authentication
The app uses a custom hook useAuth to manage login. Once a user logs in with their email and password, a token is stored in the state and used for subsequent API requests.
Timetable and Courses.

Upon successful login, the student's timetable and registered courses are fetched automatically using the useTimetable and useCourses hooks, respectively.
The timetable is displayed in the Timetable component, and the registered courses are shown in the RegisteredCourses component.
Download Timetable as PDF.

The Download Timetable as PDF button triggers the downloadTimetableAsPDF utility to save the timetable as a PDF file.
API Integration

The application communicates with a backend API to authenticate the user and fetch the student's timetable and courses. The API endpoint used for login is:
POST http://localhost:8082/api/v1/auth/login

The request body should contain:

{
"email": "student@example.com",
"password": "your-password"
}
Contributing

Feel free to fork this repository and submit pull requests. If you encounter any bugs or have suggestions for improvement, please open an issue.

### License

This project is licensed under the MIT License - see the LICENSE file for details.