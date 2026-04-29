import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFF"];

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [usersByMonth, setUsersByMonth] = useState([]);

  const [loading, setLoading] = useState(false);

  const base = "https://easy-learn-quran-bd.vercel.app/api/dashboard";

  const fetchAll = async () => {
    try {
      setLoading(true);
    const [sRes, uRes] = await Promise.all([
  axios.get(`${base}/summary`),
  axios.get(`${base}/users-by-month`),
]);

setSummary(sRes.data);
setUsersByMonth(uRes.data);
   
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 60_000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

 

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Helmet><title>Admin Dashboard</title></Helmet>
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard — Be The Shape</h1>
        <p className="text-sm text-gray-600">Overview of users and content collections.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-500">Total Users</h3>
          <div className="text-2xl font-semibold">{summary ? summary.usersCount : "—"}</div>
        </div>
       
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Users over time */}
        <div className="col-span-2 bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">User Registrations (last 6 months)</h3>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={usersByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

   
     
    </div>
  );
}
