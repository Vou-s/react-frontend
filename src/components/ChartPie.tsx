import { PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: "Baik", value: 63 },
  { name: "Sedang", value: 20.3 },
  { name: "Rusak", value: 16.6 },
];

const COLORS = ["#3b82f6", "#22c55e", "#facc15"];

const ChartPie = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-sm font-semibold mb-2">Kondisi</h3>
      <PieChart width={250} height={200}>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={80}
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
};

export default ChartPie;
