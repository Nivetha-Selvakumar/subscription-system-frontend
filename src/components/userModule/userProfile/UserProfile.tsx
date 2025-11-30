import Sidebar from "../../layout/sideBar";
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
//  Redux Action Types
import { USER_VIEW_REQUEST } from '../../../redux/actionTypes/AdminModule/AdminUsers/adminViewUserActionType';

interface UserDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  dob: string;
  sex: string;
  role: string;
  salary?: string | number;
  status: string;
  subStartDate?: string;
  subEndDate?: string;
  joinDate?: string;
  currentSubStatus?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Utility function for date formatting
const formatDateDisplay = (dateStr: string | undefined): string => {
  if (!dateStr) return '—';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '—';
    return date.toLocaleDateString();
  } catch {
    return '—';
  }
};

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const { userView, userViewLoading } = useSelector(
    (state: any) => state.userViewReducer || {}
  );

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      const userId = localStorage.getItem("user_id");
      hasFetched.current = true;
      dispatch({
        type: USER_VIEW_REQUEST,
        payload: { userId: userId }
      });
    }
  }, [id, dispatch]);

  useEffect(() => {
    document.title = "Subscription | User Profile";
  }, []);

  // ✅ Set user data when Redux state updates
  useEffect(() => {
    if (userView?.userDetails) {
      const u = userView.userDetails;
      setUser({
        id: u.id || '',
        firstName: u.firstName || '',
        lastName: u.lastName || '',
        email: u.email || '',
        phoneNumber: u.phoneNumber || '',
        address: u.address || '',
        dob: u.dob || '',
        sex: u.sex || '',
        role: u.role || '',
        status: u.status || '',
        salary: u.salary || '',
        subStartDate: u.subStartDate || '',
        subEndDate: u.subEndDate || '',
        joinDate: u.joinDate || '',
        currentSubStatus: u.currentSubStatus || '',
        createdAt: u.createdAt || '',
        updatedAt: u.updatedAt || '',
      });
      setLoading(false);
    } else if (userViewLoading === false) {
      setLoading(false);
    }
  }, [userView, userViewLoading]);

  const handleEdit = () => {
    navigate(`/user/profile/edit`);
  };

  const handleBack = () => {
    navigate('/user/dashboard');
  };

  if (loading || userViewLoading) {
    return (
      <Sidebar>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-gray-500">Loading user details...</p>
        </div>
      </Sidebar>
    );
  }

  if (!user) {
    return (
      <Sidebar>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <p className="text-gray-500 mb-4">User not found</p>
            <button
              onClick={handleBack}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Back to Users
            </button>
          </div>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <ToastContainer containerId="ViewUser-Container" />
      <div className="flex justify-center items-start w-full min-h-screen bg-gray-50">
        <div className="max-w-4xl-[75rem] w-full bg-white rounded-lg shadow flex flex-col h-[80vh] my-8">
          {/* Header */}
          <h1 className="text-2xl font-bold text-gray-900 px-6 pt-6">
            User Details
          </h1>

          {/* Content */}
          <div className="flex flex-col flex-1 overflow-y-auto px-6 pt-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                  {user.firstName || '—'}
                </p>
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                  {user.lastName || '—'}
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                  {user.email || '—'}
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                  {user.phoneNumber || '—'}
                </p>
              </div>

              {/* Address */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200 whitespace-pre-wrap">
                  {user.address || '—'}
                </p>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                  {formatDateDisplay(user.dob)}
                </p>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                  {user.sex ? user.sex.charAt(0).toUpperCase() + user.sex.slice(1).toLowerCase() : '—'}
                </p>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                    {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase() : '—'}
                  </span>
                </p>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${String(user.status).toLowerCase() === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}
                  >
                    {user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1).toLowerCase() : '—'}
                  </span>
                </p>
              </div>

              {/* Admin-specific: Salary */}
              {String(user.role).toLowerCase() === 'admin' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary
                  </label>
                  <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                    {user.salary ? `₹ ${Number(user.salary).toLocaleString()}` : '—'}
                  </p>
                </div>
              )}

              {/* Subscriber-specific: Subscription dates */}
              {String(user.role).toLowerCase() === 'subscriber' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subscription Start Date
                    </label>
                    <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                      {formatDateDisplay(user.subStartDate)}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subscription End Date
                    </label>
                    <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                      {formatDateDisplay(user.subEndDate)}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Join Date
                    </label>
                    <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                      {formatDateDisplay(user.joinDate)}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Subscription Status
                    </label>
                    <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${String(user.currentSubStatus).toLowerCase() === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                          }`}
                      >
                        {user.currentSubStatus
                          ? user.currentSubStatus.charAt(0).toUpperCase() + user.currentSubStatus.slice(1).toLowerCase()
                          : '—'}
                      </span>
                    </p>
                  </div>
                </>
              )}

              {/* Timestamps */}
              {user.createdAt && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Created At
                  </label>
                  <p className="text-gray-600 text-xs px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                    {new Date(user.createdAt).toLocaleString()}
                  </p>
                </div>
              )}

              {user.updatedAt && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Updated At
                  </label>
                  <p className="text-gray-600 text-xs px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                    {new Date(user.updatedAt).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 flex justify-end gap-4 px-6 py-4">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleEdit}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
            >
              Edit User
            </button>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};
export default UserProfile;