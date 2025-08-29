import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Baik", value: 63 },
  { name: "Rusak Ringan", value: 20.3 },
  { name: "Rusak Sedang", value: 16.6 },
];

const COLORS = ["#3B82F6", "#22C55E", "#F59E0B"];

const PieChartCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 w-full h-96">
      <h4 className="font-semibold text-gray-700 mb-4">Kondisi Aset</h4>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartCard;
