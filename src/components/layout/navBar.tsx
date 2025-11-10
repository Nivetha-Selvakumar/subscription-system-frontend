import "../../styles/Layout/Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_USER_REQUEST } from "../../redux/actionTypes/Logout/LogoutActionTypes";
import { ToastContainer } from "react-toastify";
import { Icon } from "@iconify/react";

interface NavBarProps {
  userName: string;
}

const NavBar: React.FC<NavBarProps> = ({ userName }) => {
  const dispatch = useDispatch();
  const { logoutloading } = useSelector(
    (state: any) => state.logoutReducer
  );

  const handleLogout = () => {
    if (!logoutloading) {
      dispatch({ type: LOGOUT_USER_REQUEST });
    }
  };

  return (
    <>
      <ToastContainer containerId="NavBar-Component" />

      <div className="navbar">
        {/* Left side - logo */}
        <div className="navbar-left">
          <h2 className="navbar-logo">Subscription System</h2>
        </div>

        {/* Right side - username + logout */}
        <div className="navbar-right">
          <div className="navbar-user">
            <Icon
              icon="mingcute:user-4-line" // 👋 MingCute hand
              width="20"
              height="20"
              style={{ marginRight: "6px", color: "#f7f6f3ff" }}
            />
            <span className="navbar-username">Hi, {userName}</span>
          </div>


          <button
            className="logout-btn"
            onClick={handleLogout}
            disabled={logoutloading}
          >
            {logoutloading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
