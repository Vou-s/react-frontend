type Props = {
  title: string;
  value: number | string;
  subtitle?: string;
  color?: string;
};

const StatCard = ({ title, value, subtitle, color }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col">
      <span className="text-sm text-gray-500">{title}</span>
      <span className={`text-2xl font-bold ${color ?? "text-gray-800"}`}>
        {value}
      </span>
      {subtitle && <span className="text-sm text-gray-400">{subtitle}</span>}
      <button className="mt-2 text-sm text-blue-500 hover:underline self-end">
        Lihat detail →
      </button>
    </div>
  );
};

export default StatCard;
