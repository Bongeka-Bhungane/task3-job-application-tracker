<img src="https://socialify.git.ci/Bongeka-Bhungane/task3-job-application-tracker/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="task3-job-application-tracker" width="640" height="320" />

# ReactTS Job Application Tracker

## Overview
The **Job Application Tracker** is a web application built with **React + TypeScript** that helps users keep track of their job applications.  
It allows users to register, log in, add new job applications, update or delete them, and monitor their statuses (Applied, Interviewed, Rejected).  

This project was built as part of **Task 3 - ReactTS Coursework**.  

---

##  Features Implemented

### Authentication
- User registration (username & password)  
- User login with credentials  
- Protected routes (only logged-in users can access job data)  

### Pages
- **Landing Page** – Intro to the app and its purpose  
- **Login Page** – Secure login form  
- **Registration Page** – New user registration  
- **Home Page** – Displays all jobs the user has applied for  
- **Job Page** – Shows detailed information about a job (role, duties, requirements, company info, etc.)  
- **404 Page** – Handles invalid routes  

### Job Management (CRUD)
- **Add Job** with company name, role, status, date applied, and details  
- **Update Job** to edit existing applications  
- **Delete Job** to remove applications  
- **Search Jobs** by company or role (query reflected in the URL bar)  
- **Filter Jobs** by status (Applied, Interviewed, Rejected) – reflected in the URL bar  
- **Sort Jobs** by date (ascending/descending) – reflected in the URL bar  

###  UI & UX
- Responsive design for desktop, tablet, and mobile  
- Intuitive layout and easy navigation  
- Status colors:  
  - 🟥 Rejected  
  - 🟨 Applied  
  - 🟩 Interviewed  
- Hover effects and cursor changes on interactive elements  
- Toast/notification feedback for CRUD actions  

###  Persistence
- **JSON Server** used as mock backend (stores users & jobs)  
- **localStorage** for storing user session data  

---

##  Tech Stack
- **Frontend:** React + TypeScript  
- **State Management:** React Hooks  
- **Routing:** React Router DOM (with protected routes)  
- **Backend (mock):** JSON Server  
- **Styling:** CSS / Tailwind (depending on your choice)  

---

##  Setup & Run Locally

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/job-application-tracker.git
   cd job-application-tracker
   ```
2. Install dependencies
```bash
npm install
```

3. Run JSON Server (mock backend)

```bash
npx json-server --watch db.json --port 5000
```

3. Start the React app

```bash
npm run dev
```

### Concepts Demonstrated

- Arrays & array methods

- Objects & object methods

- LocalStorage persistence

- React components, props, and state

- React Router (queries, parameters, protected routes)

- JSON Server CRUD integration

- Responsive web design

### Author

Developed by Bongeka Bhungane
Task 3 – ReactTS Job Application Tracker