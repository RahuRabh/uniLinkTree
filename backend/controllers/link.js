const Link = require("../models/link");

const { Types: { ObjectId }, } = require("mongoose");

//To create links
const createLink = async (req, res) => {
  try {
    const { links, userId } = req.body;

    // Ensure links and userId are present
    if (!links || !userId) {
      return res.status(400).json({ message: 'Links and userId are required' });
    }

    const linkDetails = new Link({
      userId,
      links,
    });

    const response = await linkDetails.save();
    res.json({
      message: "Link Created",
      id: response._id,
    });
  } catch (err) {
    console.log(err);
  }
};

// To update Link
const updateLink = async (req, res) => {
  try {
    const { linkId } = req.params;
    const { links } = req.body;

    // Ensure the links array has at least one item with title and url
    if (!links || !links.length) {
      return res.status(400).json({ message: 'Links array is required' });
    }

    const linkDocument = await Link.findById(linkId );
    linkDocument.links = links

    // Save the updated document
    const updatedLinkDocument = await linkDocument.save();

    res.json({
      message: "Link Updated",
      id: updatedLinkDocument._id,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteLink = async (req, res) => {
  try {
    const { linkId } = req.params;
    const link = await Link.findByIdAndDelete(linkId);
    res.json({ message: "Link Deleted" });
  } catch (error) {
    console.log(error);
  }
};

//To get links for User
const getLink = async (req, res) => {
  try {
    const { userId } = req.params;

    const links = await Link.find({ userId });
    res.json(links);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getLink,
  createLink,
  updateLink,
  deleteLink,
};
