import axios from "axios";
import URL from "../constants/serviceforum.constants";

// export const searchProducts = async (body: ISearchProductsPayload): Promise<any> => {
// 	const result = await axios.get(URL.baseApiUrl() + URL.products.searchProducts(body), requestHeader({}));
// 	let productsCount = result.headers['x-total-count']; // getting products number result search from header
// 	let res = { data: result.data, productsCount };
// 	return res;
// };
const fetchForums = async () => {
    const result = await axios.get(URL.baseApiUrl + URL.forums.fetchForums).catch((err) => {
        console.log("Err", err);
    });
    console.log("result", result.data);
};

const forumsService = {
    fetchForums,
};

export default forumsService;

// // service added
// export const fetchTags = async (): Promise<any> => {
// 	const result = await axios.get(URL.baseApiUrl() + URL.tags.fetchTags(), requestHeader({}));
// 	return result.data;
// };

// // service added
// export const fetchProductsTypes = async (): Promise<any> => {
// 	const result = await axios.get(URL.baseApiUrl() + URL.productsTypes.fetchProductsTypes(), requestHeader({}));
// 	return result.data;
// };
