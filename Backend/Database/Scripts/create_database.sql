CREATE DATABASE FinanceManagementDb;
GO
USE FinanceManagementDb;
GO

CREATE TABLE Users (
                       UserID INT PRIMARY KEY IDENTITY(1,1),
                       Username NVARCHAR(50) NOT NULL,
                       PasswordHash NVARCHAR(256) NOT NULL,
                       Email NVARCHAR(100) NOT NULL,
                       CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Categories (
                            CategoryID INT PRIMARY KEY IDENTITY(1,1),
                            Name NVARCHAR(50) NOT NULL,
                            Description NVARCHAR(255)
);

CREATE TABLE Transactions (
                              TransactionID INT PRIMARY KEY IDENTITY(1,1),
                              UserID INT NOT NULL,
                              CategoryID INT NOT NULL,
                              Amount DECIMAL(18, 2) NOT NULL,
                              TransactionType NVARCHAR(10) CHECK (TransactionType IN ('Income', 'Expense')) NOT NULL,
                              Description NVARCHAR(255),
                              TransactionDate DATETIME NOT NULL,
                              CreatedAt DATETIME DEFAULT GETDATE(),
                              FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
                              FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID) ON DELETE CASCADE
);
