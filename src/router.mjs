import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "./modules/middleware.mjs";
import {
  getSites,
  getOneSite,
  createSite,
  updateSite,
  deleteSite,
} from "./handlers/site.mjs";

const router = Router();

// Site routes

router.get("/site", getSites);
router.get("/site/:id", param("id").isUUID(), handleInputErrors, getOneSite);
router.post(
  "/site",
  body("name").exists().withMessage("name required").isString().trim(),
  body("country").isString().trim(),
  body("state").isString().trim(),
  body("city").isString().trim(),
  body("address").isString().trim(),
  handleInputErrors,
  createSite
);
router.put(
  "/site/:id",
  param("id").isUUID(),
  body("name").optional().isString().trim(),
  body("country").optional().isString().trim(),
  body("state").optional().isString().trim(),
  body("city").optional().isString().trim(),
  body("address").optional().isString().trim(),
  handleInputErrors,
  updateSite
);
router.delete("/site/:id", param("id").isUUID(), handleInputErrors, deleteSite);

export default router;
