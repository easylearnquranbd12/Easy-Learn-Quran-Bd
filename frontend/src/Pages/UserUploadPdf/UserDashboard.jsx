import useAuth from "../../hooks/useAuth";

const COLORS = ["#FFBB28", "#0088FE", "#00C49F", "#FF8042", "#A28BFF"];



const UserDashboard = () => {
  const { user } = useAuth();
  return (
    <div className="max-w-[1400px] mx-auto p-2 md:p-6 bg-teal-50 min-h-screen rounded-2xl shadow mt-5">
      <h2 className="text-3xl font-bold mb-4">📊 My Dashboard</h2>
      <p className="text-gray-600 mb-8">
        Welcome <span className="font-semibold">{user?.email}</span>
      </p>

     
    </div>
  );
};

export default UserDashboard;
