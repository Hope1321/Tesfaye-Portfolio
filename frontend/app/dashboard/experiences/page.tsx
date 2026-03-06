"use client";

import { useState, useEffect, FormEvent } from "react";

interface Experience {
  _id: string;
  title: string;
  company: string;
  from: string;
  to?: string;
  description?: string;
}

const ExperiencesPage = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [description, setDescription] = useState("");
  const [token, setToken] = useState<string | null>(null);

  // Set token from localStorage on client-side only
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  // Fetch experiences
  const fetchExperiences = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/experiences", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setExperiences(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchExperiences();
    }
  }, [token]);

  // Handle Add/Edit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = { title, company, from, to, description };

    try {
      let res;
      if (editingId) {
        // Edit
        res = await fetch(`http://localhost:5000/api/experiences/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        // Add new
        res = await fetch("http://localhost:5000/api/experiences", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error("Failed to save experience");

      setTitle("");
      setCompany("");
      setFrom("");
      setTo("");
      setDescription("");
      setEditingId(null);

      fetchExperiences();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/experiences/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete");
      fetchExperiences();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Edit
  const handleEdit = (exp: Experience) => {
    setEditingId(exp._id);
    setTitle(exp.title);
    setCompany(exp.company);
    setFrom(exp.from);
    setTo(exp.to || "");
    setDescription(exp.description || "");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Experiences</h1>

      {/* Form */}
      <form className="mb-6 p-4 border rounded" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded flex-1"
            required
          />
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="border p-2 rounded flex-1"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <input
            type="date"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border p-2 rounded flex-1"
            required
          />
          <input
            type="date"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border p-2 rounded flex-1"
          />
        </div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full mt-2"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingId ? "Update Experience" : "Add Experience"}
        </button>
      </form>

      {/* List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Company</th>
              <th className="border p-2">From</th>
              <th className="border p-2">To</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((exp) => (
              <tr key={exp._id}>
                <td className="border p-2">{exp.title}</td>
                <td className="border p-2">{exp.company}</td>
                <td className="border p-2">{exp.from}</td>
                <td className="border p-2">{exp.to || "-"}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="bg-yellow-400 px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExperiencesPage;
