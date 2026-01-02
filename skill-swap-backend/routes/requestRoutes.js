const express = require("express");
const { sendRequest, getMyRequests, respondToRequest } = require("../controllers/skillRequestController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", verifyToken, sendRequest);
router.get("/", verifyToken, getMyRequests);
router.patch("/:requestId", verifyToken, respondToRequest);

module.exports = router;
