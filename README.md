# Admin Dashboard

This is the Admin Dashboard for managing the application. It is built using **Next.js**, **React**, and **TypeScript**, and integrates with **Firebase** for authentication. This dashboard allows users to log in and out, with different features accessible based on user authentication status.

## Features

- **User Authentication**: Firebase authentication to handle user sign-in and sign-out.
- **Responsive UI**: The page is fully responsive and adapts to both desktop and mobile devices.
- **Admin Dashboard**: After logging in, users will see a personalized dashboard greeting them by name.
- **Logout Feature**: Users can log out from the dashboard, which will redirect them to the homepage.

## Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Before starting, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Steps

1. **Clone the repository:**

   ```bash
   git clone <repository_url>

2. **Navigate into the project directory:**
   
   ```bash
   cd <project_directory>

3. **Install dependencies:**

  ```bash
   npm install
```
## Install dependencies:
## Ensure you have a Firebase project set up. You will need to create a `.env.local` file
## to store your Firebase configuration details. Here's an example structure for the `.env.local` file:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```
# Replace the values with your own Firebase configuration keys.

# Running the Development Server:
# To start the development server, run the following command:
```bash
npm run dev
```
# This will start the server on http://localhost:3000.

# Available Scripts:
# In the project directory, you can run the following commands:
```bash
npm run dev      # Runs the app in development mode. Open http://localhost:3000 to view it in the browser.
npm run build    # Builds the app for production.
npm run start    # Starts the production server.
```
# TypeScript Configuration:
# This project is set up to use TypeScript with Next.js. 
# You can modify the configuration in the `tsconfig.json` file as needed.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: Typed superset of JavaScript for better tooling and type safety.
- **React**: JavaScript library for building user interfaces.
- **Firebase**: Used for user authentication.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **shadcn/ui**: Component library for building modern UI components with React and Tailwind CSS.
