import Skill from "../models/Skill.js";
import Project from "../models/Project.js";
import Experience from "../models/Experience.js";
import User from "../models/User.js";
import Contact from "../models/Contact.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const skills = await Skill.countDocuments();
    const projects = await Project.countDocuments();
    const experiences = await Experience.countDocuments();
    const users = await User.countDocuments();
    const messages = await Contact.countDocuments();

    res.status(200).json({
      skills,
      projects,
      experiences,
      users,
      messages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch dashboard summary" });
  }
};

export const getRecentActivities = async (req, res) => {
  try {
    // Get recent projects, skills, and experiences with timestamps
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select("title createdAt");
    
    const recentSkills = await Skill.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select("name createdAt");
    
    const recentExperiences = await Experience.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select("company createdAt");

    // Combine and format activities
    const activities = [
      ...recentProjects.map(p => ({
        action: `New project: ${p.title}`,
        user: "Admin",
        date: new Date(p.createdAt).toLocaleDateString()
      })),
      ...recentSkills.map(s => ({
        action: `New skill: ${s.name}`,
        user: "Admin",
        date: new Date(s.createdAt).toLocaleDateString()
      })),
      ...recentExperiences.map(e => ({
        action: `New experience: ${e.company}`,
        user: "Admin",
        date: new Date(e.createdAt).toLocaleDateString()
      }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch activities" });
  }
};
