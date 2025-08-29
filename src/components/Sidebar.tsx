import { Home, Database, Layers, AlertTriangle, Users } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white h-screen shadow-md p-4 flex flex-col">
      <div className="text-xl font-bold mb-6">SIPAI</div>
      <nav className="flex flex-col space-y-2">
        <a href="#" className="flex items-center p-2 hover:bg-gray-100 rounded">
          <Home className="mr-2 h-5 w-5" /> Beranda
        </a>
        <span className="text-gray-500 font-semibold mt-4">Manajemen Aset</span>
        <a href="#" className="flex items-center p-2 hover:bg-gray-100 rounded">
          <Database className="mr-2 h-5 w-5" /> Data DI
        </a>
        <a href="#" className="flex items-center p-2 hover:bg-gray-100 rounded">
          <Layers className="mr-2 h-5 w-5" /> Semua Aset
        </a>
        <a href="#" className="flex items-center p-2 hover:bg-gray-100 rounded">
          <AlertTriangle className="mr-2 h-5 w-5" /> Kerusakan Bencana
        </a>
        <a href="#" className="flex items-center p-2 hover:bg-gray-100 rounded">
          <Users className="mr-2 h-5 w-5" /> Data GP3A
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
