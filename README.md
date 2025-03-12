# ExpenseTracker
A simple expense tracking application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

![ light-miode](https://i.ibb.co/GCQmYXj/image.png)

![dark-mode](https://i.ibb.co/ypbJpks/image.png)
## Features
- User authentication
- Add/Edit/Delete expenses
- Categorize expenses
- Monthly summaries
- Visual expense reports
- Budget tracking
- Supports both light and dark mode

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/viishal07/Finance-Manager.git
    cd FinanceMAnager
    ```
2. Install backend dependencies:
    ```sh
    cd backend
    npm install
    ```
3. Install client dependencies:
    ```sh
    cd ../client
    npm install
    ```
4. Set up MongoDB connection:
    - Create a `.env` file in the `backend` directory and add your MongoDB URI:
        ```
        MONGODB_URI=<your-mongodb-uri>
        PORT=5000
        NODE_ENV=development
        ```
5. Start the backend server:
    ```sh
    cd ../backend
    npm run dev
    ```
6. Start the client development server:
    ```sh
    cd ../client
    npm run dev
    ```
7. Open your browser and navigate to `http://localhost:5173` to view the application.

## Technologies
- MongoDB
- Express.js
- React.js
- Node.js

## Usage
- Add your expenses and categorize them.
- View your expenses in a list.
- Filter expenses by date or category.
