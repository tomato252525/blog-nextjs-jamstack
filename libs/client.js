import { createClient } from "microcms-js-sdk";

export const client = createClient({
    serviceDomain: "blog-tutorial-yama",
    apiKey: process.env.API_KEY,
});