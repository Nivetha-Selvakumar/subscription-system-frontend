import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../layout/sideBar";

const AdminViewUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Sidebar>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">View User Details</h1>
        <p className="text-gray-700">
          Viewing details for user with ID: <span className="font-semibold">{id}</span>
        </p>

        {/* You can later call API here like /get/user/{id} to display full details */}
      </div>
    </Sidebar>
  );
};

export default AdminViewUser;
