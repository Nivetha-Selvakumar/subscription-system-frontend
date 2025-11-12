import Sidebar from "../../layout/sideBar";

const UserPayments: React.FC = () => {
    return (
       <Sidebar>
        <div style={{ padding: "20px", backgroundColor: "#f9f9f9"}}>
          <h1>User Payments</h1>
          <p>Welcome to the Payments!</p>
        </div>
      </Sidebar>
    );
 }
export default UserPayments;