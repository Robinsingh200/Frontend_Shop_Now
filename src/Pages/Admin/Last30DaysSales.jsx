import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export const Last30DaysSales = ({ orders }) => {
  const safeOrders = Array.isArray(orders) ? orders : [];

  const today = new Date();
  const last30Days = new Date();
  last30Days.setDate(today.getDate() - 29);

  // filter last 30 days orders
  const recentOrders = safeOrders.filter(order => {
    if (!order?.createdAt) return false;
    const date = new Date(order.createdAt);
    return date >= last30Days && date <= today;
  });

  // group sales by date (ISO format)
  const salesMap = {};
  recentOrders.forEach(order => {
    const dateKey = new Date(order.createdAt)
      .toISOString()
      .split("T")[0]; // YYYY-MM-DD

    salesMap[dateKey] =
      (salesMap[dateKey] || 0) + (order.totalAmount || 0);
  });

  // build last 30 days data
  const chartData = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date(last30Days);
    date.setDate(last30Days.getDate() + i);

    const key = date.toISOString().split("T")[0];

    chartData.push({
      date: key,
      sales: salesMap[key] || 0
    });
  }

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm mt-10">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Last 30 Days Sales Report
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#ec4899"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
