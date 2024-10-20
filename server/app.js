import createServer from "./src/utils/server.utils.js"; // Include file extensions for ES modules
import {connect} from "./src/utils/db.utils.js";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();


const app = createServer();
app.use(cors({
  origin: "http://localhost:3000", 
  methods: ["GET", "POST"], 
}));


const port = process.env.PORT || 5050;

app.listen(port, async () => {
  connect();
  console.log(`server is up on port ${port}`);
  await connect();
 

});
