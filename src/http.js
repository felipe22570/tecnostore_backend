import axios from "axios";

const instance = axios.create({
	baseURL: "https://api.bestbuy.com/v1",
	headers: {
		"access-control-allow-origin": "*",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
		"Access-Control-Allow-Methods": "*",
	},
});

export default instance;
