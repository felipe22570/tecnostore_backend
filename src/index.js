import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import { categoriesLink, productsLink } from "./urls.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 4001;

app.listen(port, () => {
	console.log("Running server");
});

//Enable CORS
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
	origin: function (origin, callback) {
		if (whiteList.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("Error de CORS"));
		}
	},
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
	res.json({ message: "Hello World!" });
});

app.get("/products/:category/:page?", async (req, res) => {
	const { category, page } = req.params;

	const link = productsLink(category, page ?? "1");
	const linkCategory = categoriesLink(category);

	try {
		const { data } = await axios.get(link);
		const {
			data: { name },
		} = await axios.get(linkCategory);

		res.json({ data, name });
	} catch (error) {
		console.log(error);
	}
});

app.get("/subcategories/:category", async (req, res) => {
	const { category } = req.params;

	const link = categoriesLink(category);

	try {
		const { data } = await axios.get(link);

		res.json({ data });
	} catch (error) {
		console.log(error);
	}
});
