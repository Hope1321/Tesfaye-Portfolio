// app/dashboard/skills/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "@/app/components/admin/AdminLayout";

interface Skill {
  _id: string;
  name: string;
  level: string;
  category: string;
}

const SkillsPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchSkills = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/skills", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSkills(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addSkill = async () => {
    try {
      await fetch("http://localhost:5000/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, level, category }),
      });
      setName("");
      setLevel("");
      setCategory("");
      fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Manage Skills</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Skill Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 mr-2 rounded"
        />
        <input
          type="text"
          placeholder="Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="border px-3 py-2 mr-2 rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 mr-2 rounded"
        />
        <button
          onClick={addSkill}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Skill
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Level</th>
            <th className="border px-4 py-2">Category</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill._id}>
              <td className="border px-4 py-2">{skill.name}</td>
              <td className="border px-4 py-2">{skill.level}</td>
              <td className="border px-4 py-2">{skill.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default SkillsPage;
