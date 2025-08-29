import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import MapView from "../components/MapView";
import PieChartCard from "../components/PieChartCard";

const Dashboard = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 space-y-6">
          {/* Statistik */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard title="DI Terdaftar" value={980} subtitle="Total di terdaftar" />
            <StatCard title="PAI" value={73} subtitle="DI sudah PAI" color="text-green-600" />
            <StatCard title="IKSI" value={0} subtitle="DI sudah IKSI" color="text-yellow-600" />
            <StatCard title="Total Aset DI" value={1233} subtitle="Semua Aset Terdaftar" color="text-blue-600" />
          </div>

          {/* Map dan Chart */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <MapView />
            </div>
            <PieChartCard />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
