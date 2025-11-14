import React, { useEffect } from "react";
import Sidebar from "../../layout/sideBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

/**
 * Expected redux actions:
 * - USER_TICKET_LIST_REQUEST
 * - USER_TICKET_CLOSE_REQUEST  (payload: { ticketId })
 *
 * Reducer names expected (selectors used below):
 * - state.userTicketListReducer.ticketList
 */

const UserSupportTicket: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { ticketList = [], loading = false } = useSelector(
        (state: any) => state.userTicketListReducer || {}
    );

    useEffect(() => {
        dispatch({ type: "USER_TICKET_LIST_REQUEST" });
    }, [dispatch]);

    const handleCreate = () => navigate("/user/tickets/create");
    const handleView = (id: string) => navigate(`/user/tickets/view/${id}`);
    const handleEdit = (id: string) => navigate(`/user/tickets/edit/${id}`);
    const handleClose = (id: string) =>
        dispatch({ type: "USER_TICKET_CLOSE_REQUEST", payload: { ticketId: id } });

    return (
        <Sidebar>
            <ToastContainer />
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Support Tickets</h2>
                    <button
                        onClick={handleCreate}
                        className="bg-teal-600 text-white px-4 py-2 rounded"
                    >
                        Create Ticket
                    </button>
                </div>

                {loading ? (
                    <div>Loading tickets...</div>
                ) : ticketList.length === 0 ? (
                    <div className="text-gray-600">You have no support tickets.</div>
                ) : (
                    <div className="grid gap-4">
                        {ticketList.map((t: any) => (
                            <div
                                key={t.ticketId || t.id}
                                className="p-4 rounded-lg border bg-white shadow-sm"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            {t.subject || "No subject"}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {t.description?.slice(0, 160)}
                                        </p>
                                        <div className="text-xs text-gray-500 mt-2">
                                            Created:{" "}
                                            {t.createdAt ? new Date(t.createdAt).toLocaleString() : "-"}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${t.status === "OPEN"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : t.status === "CLOSED"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-blue-100 text-blue-700"
                                                }`}
                                        >
                                            {t.status}
                                        </span>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleView(t.ticketId || t.id)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                View
                                            </button>

                                            {t.status === "OPEN" && (
                                                <>
                                                    <button
                                                        onClick={() => handleEdit(t.ticketId || t.id)}
                                                        className="text-green-600 hover:underline"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleClose(t.ticketId || t.id)}
                                                        className="text-red-600 hover:underline"
                                                    >
                                                        Close
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Sidebar>
    );
};

export default UserSupportTicket;
