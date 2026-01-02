const express = require("express");
const { createListing, getAllListings, updateListing, deleteListing } = require("../controllers/skillListingController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", verifyToken, createListing);
router.get("/", getAllListings);
router.put("/:listingId", verifyToken, updateListing);
router.delete("/:listingId", verifyToken, deleteListing);

module.exports = router;
