// connection.js
import sql from "mssql";
import { config1 } from "./dbconfig.js";

const pool1 = new sql.ConnectionPool(config1);

pool1.connect().catch((err) => console.log("Error connecting to config1:", err));

export { pool1 };
