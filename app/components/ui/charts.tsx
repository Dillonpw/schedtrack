import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export function BarChartComponent({
  data,
  xKey,
  yKey,
  title,
}: {
  data: any[];
  xKey: string;
  yKey: string;
  title: string;
}) {
  const maxValue = Math.max(...data.map((item) => item[yKey]));
  const yAxisMax = Math.ceil(maxValue * 1.1); // Add 10% padding to the max value

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis
          dataKey={xKey}
          angle={-45}
          textAnchor="end"
          height={70}
          interval={0}
          fontSize={12}
        />
        <YAxis domain={[0, yAxisMax]} allowDecimals={false} />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey={yKey} fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function LineChartComponent({
  data,
  xKey,
  yKey,
  title,
}: {
  data: any[];
  xKey: string;
  yKey: string;
  title: string;
}) {
  const maxValue = Math.max(...data.map((item) => item[yKey]));
  const yAxisMax = Math.ceil(maxValue * 1.1); // Add 10% padding to the max value

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <XAxis
          dataKey={xKey}
          angle={-45}
          textAnchor="end"
          height={70}
          interval={0}
          fontSize={12}
        />
        <YAxis domain={[0, yAxisMax]} allowDecimals={false} />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Line
          type="monotone"
          dataKey={yKey}
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ fill: "#3b82f6" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function PieChartComponent({
  data,
  title,
}: {
  data: any[];
  title: string;
}) {
  const COLORS = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#3b82f6"
          label={(entry) => entry.name}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
