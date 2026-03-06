import Project from "../models/Project.js";

/* =======================
   GET ALL PROJECTS (PUBLIC)
======================= */
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

/* =======================
   CREATE PROJECT (ADMIN)
======================= */
export const createProject = async (req, res) => {
  try {
    const { title, description, technologies, category, link, image } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const project = await Project.create({
      title,
      description,
      technologies,
      category,
      link,
      image,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to create project" });
  }
};

/* =======================
   UPDATE PROJECT (ADMIN)
======================= */
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Project.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: "Project not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update project" });
  }
};

/* =======================
   DELETE PROJECT (ADMIN)
======================= */
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Project not found" });

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete project" });
  }
};
