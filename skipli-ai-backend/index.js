require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const route = require("./routes");
const cors = require("cors");

app.use(express.json());
app.use(cors());

route(app);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
