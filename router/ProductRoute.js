import express from "express";
const router = express.Router();
import { checkAuthentication } from "../helpers/apiAuth.js";
import dotenv from "dotenv";
import ProductController from "../controllers/ProductController.js";
dotenv.config();

// router.get("/getAllDataFrom", checkAuthentication,EPCISController);
router.get("/getAllProducts", checkAuthentication, ProductController.getAllProducts);

router.get("/getProductsByMemberId/:memberId", checkAuthentication, ProductController.getProductsByMemberId);

router.get("/getProductsByBrandName/:brandName", checkAuthentication, ProductController.getProductsByBrandName);

router.get("/getProductsByProductsName", checkAuthentication, ProductController.getProductsByProductsName);

router.get("/getProductDetailsByBarcode/:barcode", checkAuthentication, ProductController.getProductDetailsByBarcode);




export default router;
