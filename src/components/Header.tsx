import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex justify-between items-center bg-white shadow p-4 relative">
      <input
        type="text"
        placeholder="Pencarian..."
        className="border rounded px-3 py-1 w-64"
      />
      <div className="flex items-center space-x-4">
        <select className="border rounded px-2 py-1">
          <option>Nama Kecamatan</option>
        </select>
        <select className="border rounded px-2 py-1">
          <option>2025</option>
        </select>
        <button className="bg-blue-600 text-white px-3 py-1 rounded">
          Select
        </button>

        {/* Profile Avatar */}
        <div className="relative">
          <div
            className="w-9 h-9 rounded-full bg-gray-300 cursor-pointer flex items-center justify-center"
            onClick={() => setOpen(!open)}
          >
            <span className="text-sm font-bold">A</span>
          </div>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg">
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Profile
              </button>
              <button
                onClick={() => {
                  // ✅ contoh aksi logout (hapus token, redirect ke login)
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
