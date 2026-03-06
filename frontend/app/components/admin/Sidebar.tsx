import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "About", href: "/admin/about" },
    { name: "Skills", href: "/admin/skills" },
    { name: "Projects", href: "/admin/projects" },
    { name: "Experience", href: "/admin/experience" },
  ];

  return (
    <div className="w-64 bg-white shadow-md flex flex-col">
      <div className="p-6 text-xl font-bold border-b">Admin Panel</div>
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block p-2 rounded hover:bg-gray-200 ${
              pathname === link.href ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
