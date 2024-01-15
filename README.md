# SimpleOJ

SimpleOJ is an interactive online platform for coding enthusiasts. It allows users to solve programming challenges and run code snippets in C, C++, and Python.

## Demo

For a visual demonstration of SimpleOJ in action, check out our [video demo](https://youtu.be/Xfc7_3AgQOw).

## Features

### User Capabilities

- **Authentication**: Users can log in using Google authentication, powered by PassportJS.
- **Problem Management**: Authenticated users can add, edit, and delete programming problems, complete with custom test cases.
- **Code Execution**: All users can run their code on the problem page. Code submissions and verifications are available for signed-in users.
- **Submission Feedback**: After submitting code, users receive immediate feedback on whether their solution is accepted, incorrect, or has timed out (TLE).
- **History and Downloads**: Users can view their past submissions for each problem and download their code.

### Running Code

SimpleOJ uses Node.js child processes to execute C, C++, and Python code. The execution is managed in the backend, ensuring secure and isolated runtime environments for each code snippet.

### Technology Stack

- **Frontend**: Developed with ReactJS for a dynamic user interface.
- **Backend**: Built on NodeJS with Express, offering a robust server-side framework.
- **Database**: MongoDB is used for data storage, providing flexibility and scalability.
- **Authentication**: PassportJS manages user authentication, ensuring secure logins.
- **Concurrency Management**: Bull Queue is utilized to handle concurrent code execution requests efficiently.
- **Containerization**: Docker is used for containerizing the application, ensuring a consistent environment across different machines.

### Future Goals

- **Complexity Analysis**: I aim to incorporate time and memory complexity analysis for running code. Resources and learning are underway for this implementation.

## Local Setup

To get SimpleOJ up and running on your local machine, follow these instructions:

### Prerequisites

- Ensure [Docker](https://docs.docker.com/engine/install/) is installed on your machine.
- Node.js and npm should be installed for managing dependencies.

### Steps

1. **Install Docker**: If you haven't already, install Docker following the instructions [here](https://docs.docker.com/engine/install/).
2. **Clone Repository**: Clone this repository to your local machine using `git clone [repository-url]`.

3. **Install Dependencies**:

   - Navigate to the `client` directory in the terminal and run `npm install` to install all client-side dependencies.
   - Similarly, go to the `server` directory and run `npm install` for server-side dependencies.

4. **Set Up Environment Variables**:

   - In the `server` directory, create a `.env` file.
   - Add the following environment variables:
     ```
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     ```
     Replace `your_google_client_id` and `your_google_client_secret` with your actual Google client ID and secret.

5. **Start the Application**:
   - From the root directory of the project, run `docker compose up` in the terminal. This will set up the necessary Docker containers.
   - Optionally, you can run the client and server separately by navigating to their respective directories and executing `npm start` in each.

6. **Accessing SimpleOJ**:
   - Once everything is up and running, your local instance of SimpleOJ should be accessible. The client will typically run on `http://localhost:3000`, and the server will run on `http://localhost:5000`.

### Troubleshooting

- If you encounter any issues during the setup, ensure all the environment variables are correctly set and that Docker is running properly.
- For any dependency-related issues, try removing the `node_modules` folder in the client and server directories, and run `npm install` again.


## Support and Contact

For any assistance or inquiries, feel free to connect with me on [LinkedIn](https://linkedin.com/in/ahnafhasan144).
