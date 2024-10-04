# Employee Management System
##
### Admin Login Credintials

- [ ] username: admin
- [ ] email: admin@example.com
- [ ] password: password123

## Overview
### Login page
![Login Page](https://github.com/user-attachments/assets/27ab80ba-edbc-415c-8896-cc2e8546cdea)

### Home page
![Homepage](https://github.com/user-attachments/assets/96ef0b64-453a-4bde-8d17-1040f445505b)

The Employee Management System is a React application designed to manage employee data, including authentication and CRUD operations for employee records.

## Common Issues and Solutions

### 1. **Cannot read properties of null (reading 'useContext')**

**Issue:** This error often occurs when there is a problem with React Router or the context API not being properly set up or imported.

**Solution:**
- Ensure that you have `react-router-dom` installed and correctly imported in your `App.js`.
- Check if you are wrapping your application with `<Router>` properly and that all components using hooks like `useContext` or `useNavigate` are properly nested within the `<Router>` component.

### 2. **Cannot read properties of null (reading 'useRef')**

**Issue:** This error usually indicates that a component is trying to use `useRef` but is not within a valid React context or the component import might be missing.

**Solution:**
- Verify that `react` and `react-dom` are installed and up-to-date in your `package.json`.
- Check that all components and hooks are imported from the correct packages.
- Make sure the component using `useRef` is correctly imported and used within the application.

### 3. **Invalid or incorrect imports**

**Issue:** This can occur if there are mismatches or typos in import paths or file names.

**Solution:**
- Double-check the import paths in `App.js` and other files to ensure they match the actual file names and locations.
- Make sure all components (e.g., `Login`, `LoginPage`, `EmployeeData`, `DeletedEmployeeTable`, `AddEmployeeModal`) are correctly imported from their respective paths.

### 4. **Login and Signup Navigation Issues**

**Issue:** Users may encounter problems navigating to the login or signup pages.

**Solution:**
- Ensure that routes are correctly set up in the `Routes` component.
- Verify that `Navigate` is used correctly to redirect users based on their authentication status.
- Check that `handleLogin` and `handleSignup` functions are correctly passed and used in the `Login` and `LoginPage` components.

### 5. **Local Storage Issues**

**Issue:** Problems with persisting or retrieving data from local storage.

**Solution:**
- Ensure `localStorage` is used correctly in `useEffect` hooks to save and load data.
- Confirm that data is being serialized and deserialized properly using `JSON.stringify()` and `JSON.parse()`.

### 6. **Modal Display Problems**

**Issue:** The `AddEmployeeModal` may not be showing or closing correctly.

**Solution:**
- Check that the `showModal` state is correctly set and passed to the `AddEmployeeModal` component.
- Ensure `AddEmployeeModal` has proper logic to handle the `onSave` and `onClose` functions.

## Installation

To set up the project locally:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/employee-management-system.git
   cd register-webapplication
### Install Dependencies

` bash
Copy code
npm install
Start the Development Server
`
`bash
Copy code
npm start
`

##
### Project Structure

1. - [ ] - src: Source files for the application.
2. - [ ] - components: Contains reusable components like Login, LoginPage, EmployeeData, and DeletedEmployeeModal.
3. - [ ] - pages: Contains page-specific components such as Home, AddEmployeeModal, and DeletedEmployeeTable.
4. - [ ] - App.js: Main component for routing and state management.
5. - [ ] - index.js: Entry point of the application.
6. - [ ] - Routing
7. - [ ] - Routes are managed with react-router-dom. Key routes include:


- [ ] /login: Login page for unauthenticated users.
- [ ] /signup: Signup page for creating new accounts.
- [ ] /home: Home page for authenticated users.
- [ ] /employeedata: Page to manage employee records.
- [ ] /deletedemployees: Page to view deleted employee records.
##
### Authentication
Authentication state is managed with React's useState hook. The isAuthenticated state controls access to different routes.
##
### Local Storage
Employee data and deleted employee records are persisted in local storage. Data is loaded from and saved to local storage using useEffect.
##
### Contributing
To contribute, fork the repository and submit a pull request with your changes. Ensure that your code adheres to the project's coding style and includes appropriate tests.
##
### License
This project is licensed under the MIT License. See the LICENSE file for details.
##
### Contact
For questions or issues, please contact  princengwakomashumu@gmail.com
