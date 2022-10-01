import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = process.env.PORT || 4001;

app.listen(port, () => {
	console.log("Running server");
});

app.get("/", (req, res) => {
	res.json({ message: "Hello World!" });
});
