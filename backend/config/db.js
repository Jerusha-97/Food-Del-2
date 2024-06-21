import mssql from "mssql";

export const dbConfig = {
    user: 'sa',
    password: 'root',
    server: 'DESKTOP-643VVEE', // Ensure this is set
    database: 'sample',
    options: {
        encrypt: true, // Depending on your server configuration, you may need to set this
        trustServerCertificate: true, // If using self-signed certificates or testing locally
    },
};

let poolPromise; // Global variable for the connection pool

export const connectDB = () => {
  if (!poolPromise) { // Initialize if not already done
    poolPromise = new mssql.ConnectionPool(dbConfig) // Create the connection pool
      .connect()
      .then((pool) => {
        console.log("Connected to SQL Server");
        return pool;
      })
      .catch((error) => {
        console.error("Error connecting to SQL Server:", error);
        throw error;
      });
  }
  return poolPromise; // Return the initialized connection pool
};

