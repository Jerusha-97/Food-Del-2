use food;

CREATE TABLE Foods (
  FoodID INT PRIMARY KEY IDENTITY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price FLOAT NOT NULL,
  image VARCHAR(255),
  category VARCHAR(255)
);

select * from Foods;

IF OBJECT_ID('dbo.Users', 'U') IS NULL  -- Check if the 'Users' table exists
BEGIN
    CREATE TABLE Users (
        UserID INT IDENTITY(1,1) PRIMARY KEY,  -- Auto-incrementing primary key
        Name NVARCHAR(255) NOT NULL,           -- Required field
        Email NVARCHAR(255) NOT NULL UNIQUE,   -- Required and unique field
        Password NVARCHAR(255) NOT NULL,       -- Required field
        CartData NVARCHAR(MAX) DEFAULT '{}'    -- Default to an empty object, stored as a string
    )
END

select * from Users;


CREATE TABLE Cart (
  CartID INT PRIMARY KEY IDENTITY,
  UserID INT,
  ItemID INT,
  Quantity INT DEFAULT 1,
  CreatedAt DATETIME DEFAULT GETDATE(),
  UpdatedAt DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (ItemID) REFERENCES Foods(FoodID)
);


CREATE TABLE restaurants (
    restaurantID INT PRIMARY KEY IDENTITY,
    restaurantName NVARCHAR(255) NOT NULL,
    password NVARCHAR(255) NOT NULL,
    address NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX) NOT NULL,
    contact NVARCHAR(20) NOT NULL,
    email NVARCHAR(255) NOT NULL,
    restaurantImage VARBINARY(MAX) NOT NULL
);

CREATE TABLE Orders (
    orderId INT PRIMARY KEY IDENTITY(1,1),
    amount DECIMAL(10, 2),
    address NVARCHAR(MAX),
    createdAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE OrderItems (
    orderItemId INT PRIMARY KEY IDENTITY(1,1),
    orderId INT,
    foodId INT,
    quantity INT,
    FOREIGN KEY (orderId) REFERENCES Orders(orderId)
);

