// import { connect } from "./src/routes/auth.";
import createServer from "./src/utils/server.utils.js"; // Include file extensions for ES modules
import {connect} from "./src/utils/db.utils.js";
import dotenv from "dotenv";

dotenv.config();
// const createServer = require("./src/utils/server.utils");
// const connect = require("./src/utils/db.utils");
// require("dotenv").config();

const app = createServer();

const port = process.env.PORT || 5050;

app.listen(port, async () => {
  connect();
  console.log(`server is up on port ${port}`);
  await connect();
});
