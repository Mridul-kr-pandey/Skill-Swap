const SkillListing = require("../models/SkillListing");

const createListing = async (req, res) => {
  try {
    const { title, description, skills, location, availability } = req.body;

    // Validate required fields
    if (!title || !description || !skills || !Array.isArray(skills)) {
      return res.status(400).json({ error: "Title, description, and skills array are required" });
    }

    const newListing = new SkillListing({
      userId: req.user.id,
      title,
      description,
      skills,
      location,
      availability,
      status: 'active',
      createdAt: new Date()
    });

    await newListing.save();
    res.status(201).json(newListing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllListings = async (req, res) => {
  try {
    const {
      search,
      skills,
      location,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = { status: 'active' };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (skills) {
      const skillsArray = skills.split(',');
      query.skills = { $in: skillsArray };
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Build sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (page - 1) * limit;

    const listings = await SkillListing.find(query)
      .populate('userId', 'username email')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await SkillListing.countDocuments(query);

    res.json({
      listings,
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

const updateListing = async (req, res) => {
  try {
    const { listingId } = req.params;
    const { title, description, skills, location, availability, status } = req.body;

    const listing = await SkillListing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    // Check ownership
    if (listing.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to update this listing" });
    }

    const updatedListing = await SkillListing.findByIdAndUpdate(
      listingId,
      {
        title,
        description,
        skills,
        location,
        availability,
        status,
        updatedAt: new Date()
      },
      { new: true }
    ).populate('userId', 'username email');

    res.json(updatedListing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteListing = async (req, res) => {
  try {
    const { listingId } = req.params;

    const listing = await SkillListing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    // Check ownership
    if (listing.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to delete this listing" });
    }

    await SkillListing.findByIdAndDelete(listingId);
    res.json({ message: "Listing deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createListing,
  getAllListings,
  updateListing,
  deleteListing
};
