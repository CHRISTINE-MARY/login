import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
