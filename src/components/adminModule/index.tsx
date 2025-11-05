import Sidebar from "../layout/sideBar";

const AdminDashboard: React.FC = () => {
    return (
       <Sidebar>
        <div style={{ padding: "300px" }}>
          <h1>Admin Dashboard</h1>
          <p>Welcome to the admin dashboard!</p>
        </div>
      </Sidebar>
    );
 }
export default AdminDashboard;