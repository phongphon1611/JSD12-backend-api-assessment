import { Router } from "express";
import { router as productsRouter } from "./v1/products.routes.js";

export const router = Router();

router.use("/products", productsRouter);
