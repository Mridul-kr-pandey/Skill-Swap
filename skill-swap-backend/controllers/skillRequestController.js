const SkillRequest = require("../models/SkillRequest");
const SkillListing = require("../models/SkillListing");

const sendRequest = async (req, res) => {
  try {
    const { toUser, listingId, message } = req.body;

    // Validate required fields
    if (!toUser || !listingId || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if listing exists
    const listing = await SkillListing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ error: "Skill listing not found" });
    }

    // Prevent sending request to own listing
    if (listing.userId.toString() === req.user.id) {
      return res.status(400).json({ error: "Cannot send request to your own listing" });
    }

    // Check if request already exists
    const existingRequest = await SkillRequest.findOne({
      fromUser: req.user.id,
      listingId,
      status: { $in: ['pending', 'accepted'] }
    });

    if (existingRequest) {
      return res.status(400).json({ error: "You already have a pending or accepted request for this listing" });
    }

    const newRequest = new SkillRequest({
      fromUser: req.user.id,
      toUser,
      listingId,
      message,
      status: 'pending',
      createdAt: new Date()
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMyRequests = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    // Build query
    const query = { toUser: req.user.id };
    if (status) {
      query.status = status;
    }

    // Build sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (page - 1) * limit;

    const requests = await SkillRequest.find(query)
      .populate("fromUser", "username email")
      .populate({
        path: "listingId",
        select: "title description skills"
      })
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await SkillRequest.countDocuments(query);

    res.json({
      requests,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const respondToRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['accepted', 'declined'].includes(status)) {
      return res.status(400).json({ error: "Invalid status. Must be 'accepted' or 'declined'" });
    }

    // Find request and check ownership
    const request = await SkillRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    if (request.toUser.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to respond to this request" });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({ error: "Request has already been responded to" });
    }

    // Update request
    const updatedRequest = await SkillRequest.findByIdAndUpdate(
      requestId,
      { 
        status,
        respondedAt: new Date()
      },
      { new: true }
    ).populate("fromUser", "username email")
     .populate({
       path: "listingId",
       select: "title description skills"
     });

    res.json(updatedRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { sendRequest, getMyRequests, respondToRequest };
