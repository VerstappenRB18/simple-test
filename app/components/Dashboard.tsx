// app/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlinePlus,
  AiOutlineMessage,
  AiOutlineMenu,
  AiOutlineLeft
} from "react-icons/ai";
import { FaAirbnb, FaGoogle, FaMicrosoft } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { BsSun, BsMoon } from "react-icons/bs";
import { useRouter } from "next/navigation";

const chartData3d = [
  { date: "Mar 25", people: 3 },
  { date: "Mar 27", people: 2 }
];

const chartData30d = [
  { date: "Feb 28", people: 1 },
  { date: "Mar 5", people: 2 },
  { date: "Mar 12", people: 3 },
  { date: "Mar 19", people: 4 },
  { date: "Mar 25", people: 3 },
  { date: "Mar 27", people: 2 }
];

const mostVisited = [
  { name: "Airbnb", count: 2 },
  { name: "Google", count: 1 },
  { name: "Nvidia", count: 0 },
  { name: "Samsung", count: 0 },
  { name: "Oracle", count: 0 },
  { name: "Zoom", count: 0 }
];

const leastVisited = [
  { name: "Olivia Weber", count: 0 },
  { name: "Zoom", count: 0 },
  { name: "Oracle", count: 0 },
  { name: "Samsung", count: 0 },
  { name: "Nvidia", count: 0 },
  { name: "Marie Jones", count: 0 }
];

export default function Dashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedTab, setSelectedTab] = useState("3d");
  const [darkMode, setDarkMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const systemPref = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark" || (!savedTheme && systemPref);
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);

    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn !== "true") {
      router.push("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        setUser({ name: data.name, email: data.email });
        setAuthorized(true);
      } catch (err) {
        console.error("Failed to fetch user", err);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    router.push("/login");
  };

  if (!authorized) {
    return <div className="h-screen w-screen bg-white dark:bg-black" />;
  }


  const chartData = selectedTab === "30d" ? chartData30d : chartData3d;

  return (
    <div className="flex h-screen overflow-hidden relative">
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-30 transition-opacity ${sidebarOpen ? "block" : "hidden"} md:hidden`}
        onClick={() => setSidebarOpen(false)}
      />

    <aside
      className={`z-40 h-full bg-white dark:bg-gray-900 text-black dark:text-white border-r dark:border-gray-700 px-3 py-3 flex flex-col justify-between transition-all duration-200
        ${sidebarOpen ? "fixed top-0 left-0 w-52" : "fixed top-0 -left-64"}
        ${sidebarCollapsed ? "w-16 items-center" : "w-60 items-start"} 
        md:static md:flex-shrink-0`}
    >
      <div className="flex flex-col gap-4 w-full min-w-0 break-words">
        <div className={`flex ${sidebarCollapsed ? "justify-center" : "justify-between"} items-center w-full`}>
          {sidebarCollapsed ? (
            <button onClick={() => setSidebarCollapsed(false)} className="text-gray-400">
              <AiOutlineMenu />
            </button>
          ) : (
            <>
              <div className="flex items-center gap-2 min-w-0 break-words">
                <span className="text-xl font-bold">▲</span>
                <span className="text-lg font-semibold truncate">Acme</span>
              </div>
              <button onClick={() => setSidebarCollapsed(true)} className="text-gray-400 hidden md:block">
                <AiOutlineLeft />
              </button>
            </>
          )}
        </div>

        <nav className={`flex flex-col mt-2 gap-4 ${sidebarCollapsed ? "items-center" : "items-start"}`}>
          <a href="#" className="flex items-center gap-3">
            <AiOutlineHome />
            {!sidebarCollapsed && <span className="truncate">Home</span>}
          </a>
          <a href="#" className="flex items-center gap-3">
            <AiOutlineUser />
            {!sidebarCollapsed && <span className="truncate">Contacts</span>}
          </a>
          <a href="#" className="flex items-center gap-3">
            <AiOutlineSetting />
            {!sidebarCollapsed && <span className="truncate">Settings</span>}
          </a>
        </nav>

        <div className="w-full">
          {!sidebarCollapsed && (
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 pt-8 pb-4">Favorites</p>
          )}
          <ul className={`flex flex-col gap-4 ${sidebarCollapsed ? "items-center pt-20" : "items-start"}`}>
            <li className="flex items-center gap-3 min-w-0">
              <FaAirbnb className="text-xl text-rose-500" />
              {!sidebarCollapsed && <span className="truncate">Airbnb</span>}
            </li>
            <li className="flex items-center gap-3 min-w-0">
              <FaGoogle className="text-xl text-blue-500" />
              {!sidebarCollapsed && <span className="truncate">Google</span>}
            </li>
            <li className="flex items-center gap-3 min-w-0">
              <FaMicrosoft className="text-xl text-yellow-500" />
              {!sidebarCollapsed && <span className="truncate">Microsoft</span>}
            </li>
          </ul>
        </div>
      </div>

      <div className={`w-full flex flex-col gap-3 ${sidebarCollapsed ? "items-center" : "items-start"}`}>
        <div className="flex flex-col w-full gap-2">
          <button className={`flex items-center ${sidebarCollapsed ? "justify-center" : "gap-3"} text-m hover:underline`}>
            <AiOutlinePlus />
            {!sidebarCollapsed && <span className="truncate">Invite member</span>}
          </button>
          <button className={`flex items-center ${sidebarCollapsed ? "justify-center" : "gap-3"} text-m hover:underline`}>
            <AiOutlineMessage />
            {!sidebarCollapsed && <span className="truncate">Feedback</span>}
          </button>
        </div>

        <div className="relative w-full">
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className={`flex ${sidebarCollapsed ? "flex-col items-center" : "items-center gap-3"} w-full text-left rounded-md -px-1 py-1 hover:bg-gray-100 dark:hover:bg-gray-800`}
          >
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="User Avatar"
              className={`rounded-[14px] object-cover ${sidebarCollapsed ? "w-8 h-8" : "w-6 h-6"}`}
            />
            {!sidebarCollapsed && <span className="text-sm font-medium truncate">{user.name}</span>}
          </button>

          {showMenu && (
            <div className={`absolute bottom-12 ${sidebarCollapsed ? "left-0" : "right-[-5px]"} z-50 w-56 bg-white dark:bg-gray-800 rounded-md border dark:border-gray-600 shadow-xl`}>
              <div className="px-4 py-3 border-b dark:border-gray-700">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <div className="p-1">
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Profile</button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Billing</button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Command Menu</button>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm border-t dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>


      <main className="flex-1 p-4 md:p-6 bg-gray-50 dark:bg-gray-800 overflow-y-auto">
        <header className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold dark:text-white">Overview</h2>
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-600">
            <AiOutlineMenu size={24} />
          </button>
        </header>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
          {["1d", "3d", "7d", "30d", "Custom"].map((label) => (
            <button
              key={label}
              className={`px-2 py-1 rounded border ${
                selectedTab === label ? "bg-black text-white" : "text-gray-600 dark:text-gray-300"
              }`}
              onClick={() => setSelectedTab(label)}
            >
              {label}
            </button>
          ))}
          <input
            type="text"
            value={
              selectedTab === "30d"
                ? "Feb 28, 2025 - Mar 28, 2025"
                : "Mar 25, 2025 - Mar 28, 2025"
            }
            readOnly
            className="ml-2 rounded border px-2 py-1 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 mt-6">
          <div className="rounded border bg-white dark:bg-gray-900 dark:border-gray-700 p-4">
            <h3 className="font-semibold mb-1 dark:text-white">Lead generation</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              New contacts added to the pool.
            </p>
            <div className="h-56 w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Bar dataKey="people" fill="#EA684A" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-end gap-8 mt-4">
              <div className="text-center">
                <p className="text-xs text-gray-500">People</p>
                <p className="text-lg font-bold dark:text-white">3</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Companies</p>
                <p className="text-lg font-bold dark:text-white">2</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded border bg-white dark:bg-gray-900 dark:border-gray-700 p-4">
              <h3 className="font-semibold mb-3 dark:text-white">Most visited contacts</h3>
              <ul className="text-sm space-y-2">
                {mostVisited.map((item) => (
                  <li key={item.name} className="flex justify-between dark:text-white">
                    <span>{item.name}</span>
                    <span>{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded border bg-white dark:bg-gray-900 dark:border-gray-700 p-4">
              <h3 className="font-semibold mb-3 dark:text-white">Least visited contacts</h3>
              <ul className="text-sm space-y-2">
                {leastVisited.map((item) => (
                  <li key={item.name} className="flex justify-between dark:text-white">
                    <span>{item.name}</span>
                    <span>{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="absolute bottom-4 right-4 rounded-full border p-2 shadow-md dark:border-gray-500 dark:bg-gray-700"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {darkMode ? <BsSun /> : <BsMoon />}
        </button>
      </main>
    </div>
  );
}
