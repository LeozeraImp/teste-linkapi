const express = require("express");
require("express-async-errors")
const routes = require("./routes")
const cors = require("cors")
const server = express();

server.use(cors())
server.use(express.json());
server.use(routes)
server.listen(3000);