import axios from "axios";

export const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const routes = {
    registerUser: "register_user/",
    loginUser: "login_user/",
    insightTop: "start_new_store_at_location/",
    getTopItems: "top_items_by_store",
    getBottomItems: "worst_items_by_store",
    getAssociations: "get_suggested_patterns",
    improveTopProductSales: "improve_top_product_sales",
    improveBottomProductSales: "improve_top_product_sales",
    uploadFile: "add_transactions",
    makePrediction: "top_items_by_time",
    shop: "shop",
} as const;
