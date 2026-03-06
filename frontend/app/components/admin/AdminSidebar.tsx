"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Skills", path: "/admin/skills" },
    { name: "Projects", path: "/admin/projects" },
    { name: "Experiences", path: "/admin/experience" },
    { name: "Messages", path: "/admin/messages" },
    { name: "About", path: "/admin/about" },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            className={`px-4 py-2 rounded hover:bg-gray-700 transition ${
              pathname === link.path ? "bg-gray-700 font-bold" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
