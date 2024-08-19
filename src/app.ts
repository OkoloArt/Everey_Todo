import { dataSource } from "./configs/configDB";
import express from "express";
import authRoutes from "./routes/auth.route";
import todoRoutes from "./routes/todo.route";

import * as dotenv from "dotenv";
import { setupSwagger } from "./configs/swaggerConfig";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    setupSwagger(app);

    app.use("/auth", authRoutes);
    app.use("/todo", todoRoutes);

    app.get("*", (req, res) => {
      res.status(404).json({
        message: "Invalid Url",
      });
    });

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log("Error initializing data source", error));
