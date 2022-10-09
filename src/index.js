import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import { categoriesLink, productsLink } from "./urls.js";
import http from "./http.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 4001;

app.listen(port, () => {
	console.log("Running server");
});

//Enable CORS
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("access-control-allow-origin", "*");
	res.header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
	next();
});

app.use(cors());

app.get("/", (req, res) => {
	res.json({ message: "Hello World!" });
});

app.get("/products/:category/:page?", async (req, res) => {
	const { category, page } = req.params;

	const link = productsLink(category, page ?? "1");
	const linkCategory = categoriesLink(category);

	try {
		const { data } = await http.get(link);
		const {
			data: { name },
		} = await http.get(linkCategory);

		res.header("Access-Control-Allow-Origin", "*");
		res.json({ data, name });
	} catch (error) {
		console.log(error);
	}
});

app.get("/subcategories/:category", async (req, res) => {
	const { category } = req.params;

	const link = categoriesLink(category);

	try {
		const { data } = await http.get(link);

		res.header("Access-Control-Allow-Origin", "*");
		res.json({ data });
	} catch (error) {
		console.log(error);
	}
});
