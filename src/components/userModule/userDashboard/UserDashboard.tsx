import Sidebar from "../../layout/sideBar";

const UserDashboard: React.FC = () => {
    return (
       <Sidebar>
        <div style={{ padding: "20px", backgroundColor: "#f9f9f9"}}>
          <h1>User Dashboard</h1>
          <p>Welcome to the User dashboard!</p>
        </div>
      </Sidebar>
    );
 }
export default UserDashboard;