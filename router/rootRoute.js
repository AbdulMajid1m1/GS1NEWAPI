import express from "express";
import MemberRoute from "./MemberRoute.js";
import ProductRoute from "./ProductRoute.js";
const router = express.Router();


// call all routes here

router.use("/", MemberRoute);

router.use("/", ProductRoute);



export default router;
