CREATE TABLE Suppliers (
    SupplierID INT PRIMARY KEY IDENTITY(1,1),
    SupplierName NVARCHAR(255) NOT NULL,
    SupplierIndex NVARCHAR(50) NOT NULL,
    City NVARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    RowVersion ROWVERSION
);

CREATE TABLE Certificates (
    CertificateID INT PRIMARY KEY IDENTITY(1,1),
    SupplierID INT FOREIGN KEY REFERENCES Suppliers(SupplierID),
    CertificateType NVARCHAR(255) NOT NULL,
    ValidFrom DATE NOT NULL,
    ValidTo DATE NOT NULL,
    PdfDocument VARBINARY(MAX),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    RowVersion ROWVERSION
);

CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    UserName NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    RowVersion ROWVERSION
);

CREATE TABLE Participants (
    ParticipantID INT PRIMARY KEY IDENTITY(1,1),
    ParticipantName NVARCHAR(255) NOT NULL,
    ParticipantEmail NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    RowVersion ROWVERSION
);

CREATE TABLE CertificateParticipants (
    CertificateParticipantID INT PRIMARY KEY IDENTITY(1,1),
    CertificateID INT FOREIGN KEY REFERENCES Certificates(CertificateID),
    ParticipantID INT FOREIGN KEY REFERENCES Participants(ParticipantID),
    AssignedDate DATE NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    RowVersion ROWVERSION
);

CREATE TABLE Comments (
    CommentID INT PRIMARY KEY IDENTITY(1,1),
    CertificateID INT FOREIGN KEY REFERENCES Certificates(CertificateID),
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    CommentText NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    RowVersion ROWVERSION
);