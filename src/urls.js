const parameters = "name,regularPrice,type,image,longDescription,customerReviewAverage,customerReviewCount";

export const categoriesLink = (category) => {
	return `/categories/${category}.json?apiKey=${process.env.API_KEY}`;
};

export const productsLink = (category, page) => {
	return `/products(categoryPath.id=${category})?format=json&apiKey=${process.env.API_KEY}&show=${parameters}&pageSize=40&page=${page}`;
};
