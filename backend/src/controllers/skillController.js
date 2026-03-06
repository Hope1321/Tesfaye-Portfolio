import Skill from "../models/Skill.js";

/* =======================
   GET ALL SKILLS (PUBLIC)
======================= */
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch skills" });
  }
};

/* =======================
   CREATE SKILL (ADMIN)
======================= */
export const createSkill = async (req, res) => {
  try {
    const { name, level, category } = req.body;

    if (!name || !level) {
      return res.status(400).json({ message: "Name and level are required" });
    }

    const skill = await Skill.create({
      name,
      level,
      category,
    });

    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: "Failed to create skill" });
  }
};
/* =======================
   UPDATE SKILL (ADMIN)
======================= */
export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, level, category } = req.body;

    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    skill.name = name || skill.name;
    skill.level = level || skill.level;
    skill.category = category || skill.category;

    const updatedSkill = await skill.save();
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: "Failed to update skill" });
  }
};

/* =======================
   DELETE SKILL (ADMIN)
======================= */
export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    await Skill.findByIdAndDelete(id);
    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete skill" });
  }
};
