import { Bell, User } from "lucide-react";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between bg-white p-4 shadow">
      <input
        type="text"
        placeholder="Pencarian..."
        className="border rounded px-3 py-2 w-1/3"
      />
      <div className="flex items-center space-x-4">
        <Bell className="h-5 w-5 text-gray-600" />
        <User className="h-6 w-6 text-gray-600" />
      </div>
    </header>
  );
};

export default Navbar;
