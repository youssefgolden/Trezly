import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My App</h1>
      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-700 hover:text-blue-500"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-700 hover:text-blue-500"
          }
        >
          Transactions
        </NavLink>
        <NavLink
          to="/accomptes"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-700 hover:text-blue-500"
          }
        >
          Accounts
        </NavLink>
      </nav>
    </div>
  );
}
