import Experience from "../models/Experience.js";

/**
 * @desc   Get all experiences
 * @route  GET /api/experiences
 * @access Public
 */
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ from: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch experiences" });
  }
};

/**
 * @desc   Create experience
 * @route  POST /api/experiences
 * @access Private (Admin)
 */
export const createExperience = async (req, res) => {
  try {
    const { title, company, from, description } = req.body;

    if (!title || !company || !from) {
      return res
        .status(400)
        .json({ message: "Title, company, and from date are required" });
    }

    const experience = await Experience.create({
      title,
      company,
      from,
      description,
    });

    res.status(201).json({
      message: "Experience added successfully",
      experience,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add experience" });
  }
};

/**
 * @desc   Update experience
 * @route  PUT /api/experiences/:id
 * @access Private
 */
export const updateExperience = async (req, res) => {
  try {
    const updated = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.json({
      message: "Experience updated successfully",
      updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update experience" });
  }
};

/**
 * @desc   Delete experience
 * @route  DELETE /api/experiences/:id
 * @access Private
 */
export const deleteExperience = async (req, res) => {
  try {
    const deleted = await Experience.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete experience" });
  }
};
