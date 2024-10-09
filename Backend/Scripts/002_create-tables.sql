CREATE TABLE Suppliers (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Handle uniqueidentifier DEFAULT NEWID() NOT NULL,
    Name NVARCHAR(255) NOT NULL,
    [Index] NVARCHAR(50) NOT NULL,
    City NVARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    RowVersion ROWVERSION
);

CREATE TABLE Certificates (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Handle uniqueidentifier DEFAULT NEWID() NOT NULL,
    SupplierID INT FOREIGN KEY REFERENCES Suppliers(Id),
    Type NVARCHAR(255) NOT NULL,
    ValidFrom DATE NOT NULL,
    ValidTo DATE NOT NULL,
    PdfDocument VARBINARY(MAX),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    RowVersion ROWVERSION
);

CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Handle uniqueidentifier DEFAULT NEWID() NOT NULL,
    Name NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    RowVersion ROWVERSION
);

CREATE TABLE Participants (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Handle uniqueidentifier DEFAULT NEWID() NOT NULL,
    Name NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255) NOT NULL,
    Plant NVARCHAR(50) NULL,
    Department NVARCHAR(100) NULL,
    UserId NVARCHAR(50) NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    RowVersion ROWVERSION
);

CREATE TABLE CertificateParticipants (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Handle uniqueidentifier DEFAULT NEWID() NOT NULL,
    CertificateId INT FOREIGN KEY REFERENCES Certificates(Id),
    ParticipantId INT FOREIGN KEY REFERENCES Participants(Id),
    AssignedDate DATE NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    RowVersion ROWVERSION
);

CREATE TABLE Comments (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Handle uniqueidentifier DEFAULT NEWID() NOT NULL,
    CertificateId INT NOT NULL,
    UserId INT NOT NULL,
    Text NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    RowVersion ROWVERSION,

    CONSTRAINT FK_CertificateId FOREIGN KEY (CertificateId) REFERENCES Certificates(Id),
    CONSTRAINT FK_UserId FOREIGN KEY (UserId) REFERENCES Users(Id)  
);