//link model
const Link = require("../models/link");

//user model
const User = require("../models/user");

const {
  Types: { ObjectId },
} = require("mongoose");

//To create links
const createLink = async (req, res) => {
  try {
    const { links, userId } = req.body;

    if (!links || !userId) {
      return res.status(400).json({ message: "Links and userId are required" });
    }

    const linkDetails = new Link({
      userId,
      links,
    });

    //  sending sharable public URL
    // const linkUrl = `https://uni-link-tree.vercel.app/links/${userId}`;
    const linkUrl = `http://localhost:3000/links/${userId}`;

    const response = await linkDetails.save();
    res.status(201).json({
      message: "Link Created",
      id: response._id,
      linkUrl,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// To update Link
const updateLink = async (req, res) => {
  try {
    const { linkId } = req.params;
    const { links } = req.body;

    // Ensure the links array has at least one item with title and url
    if (!links || !links.length) {
      return res.status(400).json({ message: "Links array is required" });
    }

    const linkDocument = await Link.findById(linkId);
    linkDocument.links = links;

    // Save the updated document
    const updatedLinkDocument = await linkDocument.save();

    res.status(201).json({
      message: "Link Updated",
      id: updatedLinkDocument._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteLink = async (req, res) => {
  try {
    const { linkId } = req.params;
    const link = await Link.findByIdAndDelete(linkId);
    res.status(200).json({ message: "Link Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//To get links for User
const getUserLinks = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch user information
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Fetch links for the user
    const links = await Link.find({ userId });

    res.status(200).json({
      userName: user.name,
      links: links.map((link) => ({
        id: link._id,
        links: link.links,
      })),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getLink = async (req, res) => {
  try {
    // Fetch links for the user
    const links = await Link.find(req.params);
    res.status(200).json(links);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getLink,
  createLink,
  updateLink,
  deleteLink,
  getUserLinks,
};
