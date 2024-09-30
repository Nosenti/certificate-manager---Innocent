INSERT INTO Suppliers (Name, [Index], City, CreatedAt, UpdatedAt)
VALUES
('ANDEMIS GmbH', '1', 'Stuttgart', GETDATE(), GETDATE()),
('IMLER AG', '2', 'Berlin', GETDATE(), GETDATE());

INSERT INTO Users (Name, Email, CreatedAt, UpdatedAt)
VALUES
('User 1', 'user1@example.com', GETDATE(), GETDATE()),
('User 2', 'user2@example.com', GETDATE(), GETDATE()),
('User 3', 'user3@example.com', GETDATE(), GETDATE()),
('User 4', 'user4@example.com', GETDATE(), GETDATE());

INSERT INTO Participants (Name, Email, Plant, Department, UserId, CreatedAt, UpdatedAt)
VALUES
('Simon Zwölfer', 'simon@example.com', '096', 'ITM/FP', 'ZWOELF', GETDATE(), GETDATE()),
('Wolfgang Stork', 'wolfgang@example.com', '094', 'ITM/FP', 'WOLFST', GETDATE(), GETDATE()),
('Hans Müller', 'hans@example.com', '098', 'ITM/SD', 'MULLH', GETDATE(), GETDATE()),
('Franz Bauer', 'franz@example.com', '102', 'ITM/SD', 'BAUERF', GETDATE(), GETDATE()),
('Klaus Schmidt', 'klaus@example.com', '112', 'ITM/FP', 'SCHMKL', GETDATE(), GETDATE());
