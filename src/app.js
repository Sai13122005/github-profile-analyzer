const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorMiddleware = require("./middleware/errorMiddleware");
const githubRoutes = require("./routes/githubRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.json({
    message: "GitHub Profile Analyzer API Running"
  });
});
app.use("/api/github", githubRoutes);
app.use(errorMiddleware);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
module.exports = app;