import express from "express";
const router = express.Router();
import { checkAuthentication } from "../helpers/apiAuth.js";
import dotenv from "dotenv";
import MemberController from "../controllers/MemberController.js";
dotenv.config();

router.get("/getAllMemberData", checkAuthentication, MemberController.getAllMemberData);

router.get("/getMemberByMemberNameE/:name", checkAuthentication, MemberController.getMemberByMemberNameE);


router.get("/getMemberByAddress/:address", checkAuthentication, MemberController.getMemberByAddress)

router.get("/getToken", MemberController.getToken)
export default router;




