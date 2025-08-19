🏥 Patient Queue Management System
This is a simple full-stack application for managing a medical clinic's patient queue. Patients can add themselves to the queue via a web form, while medical staff can view the real-time queue and manage patients by marking them as "attended" or removing them from the list.

🚀 Features
Patient Registration: A web form for patients to enter their details and join the queue.

Real-Time Queue: A live-updating list of patients for medical staff, sorted by registration time.

Patient Management: Buttons to mark a patient as attended or remove them from the queue.

Local Database: Uses SQLite to store patient data in a single file (database.db), making the project easy to set up and run.

RESTful API: A clean API built with Node.js and Express for handling patient registration, listing, and deletion.

💻 How to Run the Project
Clone the Repository: Download the project files.

Install Dependencies: Open your terminal in the project folder and run:

Bash

npm install express sqlite3 cors body-parser
Start the Server: Run the following command in your terminal:

Bash

node server.js
Access the Application: Open your web browser and navigate to these URLs:

Patient Registration: http://localhost:3000/

Medical Staff View: http://localhost:3000/medico.html
