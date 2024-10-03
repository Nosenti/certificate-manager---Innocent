# Certificate Manager Application

## Introduction

The Certificate Manager Application is a full-stack web-based solution designed to manage and display various certificates. The application provides a user-friendly interface for viewing, adding, editing, and managing certificates with multi-language support. The backend handles certificate management, validation, and database interactions, while the frontend offers a responsive design ensuring usability across different devices.

## Features

- **Create a Certificate**: Add new certificates with relevant information and documents.
- **Edit a Certificate**: Modify existing certificate details.
- **Manage Certificates**: View and delete certificates.
- **Multi-language Support**: Supports different languages for a global user base.
- **Comments**: Users can leave comments on certificates.
- **Secure Data Storage**: Certificates, including PDF documents, are securely stored and managed.
- **Supplier & Participant Management**: Manage suppliers and participants associated with each certificate.

## Technologies

### Frontend

- **React**: JavaScript library for building user interfaces.
- **React Router**: Declarative routing for React applications.
- **CSS**: Styling the application.
- **Typescript**: Provides static typing for better development experience and reduced bugs.

### Backend

- [**ASP.N**](http://ASP.NET)**ET Core**: Backend framework for building the API.
- **Entity Framework Core**: ORM for database access and management.
- **SQL Server**: Database used for storing certificates, suppliers, participants, and comments.
- **AutoMapper**: For mapping between entities and DTOs.
- **Swagger**: API documentation and testing.

## Installation

### Prerequisites

- **Frontend**:
  - Node.js (v14 or later)
  - npm or yarn
- **Backend**:
  - .NET SDK (v6.0 or later)
  - SQL Server or Docker (for running the SQL Server database)

### Steps

### Frontend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nosenti/certificate-manager--innocent.git
   cd certificate-manager--innocent/frontend
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Using yarn:

   ```bash
   yarn install
   ```

3. **Run the application:**

   Using npm:

   ```bash
   npm start
   ```

   using yarn:

   ```bash
   yarn start
   ```

   The application will be available at \`htttp://[localhost:3000](http://localhost:3000)\`

### Backend Setup

1. **Clone the repository**:

   If you haven't already, clone the repository and navigate to the backend folder:

   ```
   git clone https://github.com/nosenti/certificate-manager--innocent.git cd certificate-manager--innocent/backend
   ```

   **Install dependencies**:

   Ensure you have the required .NET SDK installed, and then restore the NuGet packages:

   ```
   dotnet restore
   ```

2. **Set up the database**:

   - Run SQL scripts from the Scripts folder to setup the tables and seeding inside SQL Server

   - **Using SQL Server**: Ensure that SQL Server is running locally or on a server you can connect to. Update the connection string in the `appsettings.Development.json` file.

3. **Run the backend application**:

   ```
   dotnet run
   ```