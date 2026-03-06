import About from "../models/About.js";

/* GET ABOUT (PUBLIC) */
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch about info" });
  }
};

/* CREATE / UPDATE ABOUT (ADMIN) */
export const upsertAbout = async (req, res) => {
  try {
    const about = await About.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: "Failed to save about info" });
  }
};
