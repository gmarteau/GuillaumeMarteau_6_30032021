const express = require("express");
const router = express.Router();

const sauceCtrl = require("../controllers/sauce");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

router.post("/", auth, multer, sauceCtrl.addSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likeSauce);

module.exports = router;