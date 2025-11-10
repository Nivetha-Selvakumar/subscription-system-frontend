"use client";
import React, { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import { Formik, Form } from "formik";
import { Close } from "@mui/icons-material";
import "../../../styles/AdminModule/AdminUser/userList.scss";
import DynamicDropdown from "../../../common-components/ui/dynamicDropdown";
import DynamicDatePicker from "../../../common-components/ui/dynamicDatePicker";
import DatePickerComponent from "../../../common-components/ui/datePickerRange";
import dayjs from "dayjs";

interface UserFilterProps {
    isModalOpen: boolean;
    toggleModal: (open: boolean) => void;
    onChangeFilter: (filterData: any) => void;
    initialFilter: any;
}

const ROLES = [
    { label: "Admin", value: "Admin" },
    { label: "Subscriber", value: "Subscriber" },
    { label: "User", value: "User" },
];

const GENDERS = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
];

const STATUS = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
];

const SUBSCRIPTION_STATUS = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
];

const UserFilterModal: React.FC<UserFilterProps> = ({
    isModalOpen,
    toggleModal,
    onChangeFilter,
    initialFilter,
}) => {
    const [selectedRole, setSelectedRole] = useState(initialFilter?.role || "");
    const [startDate, setStartDate] = useState<Date | null>(
        initialFilter?.subStartDate ? new Date(initialFilter.subStartDate) : null
    );
    const [endDate, setEndDate] = useState<Date | null>(
        initialFilter?.subEndDate ? new Date(initialFilter.subEndDate) : null
    );

    useEffect(() => {
        if (isModalOpen) {
            setSelectedRole(initialFilter?.role || "");
            setStartDate(
                initialFilter?.subStartDate
                    ? new Date(initialFilter.subStartDate)
                    : null
            );
            setEndDate(
                initialFilter?.subEndDate ? new Date(initialFilter.subEndDate) : null
            );
        }
    }, [isModalOpen, initialFilter]);

    // Reset all values
    const handleReset = (resetForm: () => void) => {
        resetForm();
        setSelectedRole("");
        setStartDate(null);
        setEndDate(null);
        onChangeFilter({}); // clears parent filter
        toggleModal(false);
    };

    const modalStyle = {
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 680,
        bgcolor: "#fff",
        boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
        borderRadius: "12px",
        maxHeight: "90vh",
        overflow: "auto",
        p: 0,
        fontFamily: '"Inter", sans-serif',
    };

    return (
        <Modal
            open={isModalOpen}
            onClose={() => { }}
            disableEscapeKeyDown
            aria-labelledby="user-filter-modal"
        >
            <Box sx={modalStyle}>
                {/* Header */}
                <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200 bg-gray-50 rounded-t-md">
                    <h2 className="text-lg font-semibold text-gray-800">User Filter</h2>
                    <Close
                        onClick={() => handleReset(() => { })}
                        sx={{ cursor: "pointer", color: "#444" }}
                    />
                </div>

                <Formik
                    enableReinitialize
                    initialValues={{
                        gender: initialFilter?.gender || "",
                        role: selectedRole,
                        status: initialFilter?.status || "",
                        salary: initialFilter?.salary || "",
                        joinDate: initialFilter?.joinDate || "",
                        currentSubStatus: initialFilter?.currentSubStatus || "",
                    }}
                    onSubmit={(values, { resetForm }) => {
                        // ✅ Ensure both dates or none
                        if ((startDate && !endDate) || (!startDate && endDate)) {
                            alert("Please select both start and end dates.");
                            return;
                        }

                        // ✅ Prepare transformed payload
                        const transformed = {
                            ...values,
                            subStartDate:
                                values.role === "Subscriber" && startDate
                                    ? dayjs(startDate).startOf("day").toISOString()
                                    : "",
                            subEndDate:
                                values.role === "Subscriber" && endDate
                                    ? dayjs(endDate).endOf("day").toISOString()
                                    : "",
                            salary: values.role === "Admin" ? values.salary : "",
                        };

                        onChangeFilter(transformed); // pass to parent
                        toggleModal(false);
                        resetForm();
                    }}
                >
                    {({ values, handleChange, resetForm }) => (
                        <Form>
                            <div className="p-5 flex flex-col gap-4">
                                {/* Role + Gender */}
                                <div className="grid grid-cols-2 gap-3">
                                    <DynamicDropdown
                                        label="Role"
                                        name="role"
                                        value={values.role}
                                        onChange={(e: any) => {
                                            handleChange(e);
                                            setSelectedRole(e.target.value);
                                        }}
                                        options={ROLES}
                                    />
                                    <DynamicDropdown
                                        label="Gender"
                                        name="gender"
                                        value={values.gender}
                                        onChange={handleChange}
                                        options={GENDERS}
                                    />
                                </div>

                                {/* Status */}
                                <DynamicDropdown
                                    label="Status"
                                    name="status"
                                    value={values.status}
                                    onChange={handleChange}
                                    options={STATUS}
                                />

                                {/* Join Date */}
                                <DynamicDatePicker
                                    label="Join Date"
                                    name="joinDate"
                                    value={values.joinDate}
                                    onChange={handleChange}
                                />

                                {/* Admin Fields */}
                                {selectedRole === "Admin" && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Salary
                                        </label>
                                        <input
                                            type="number"
                                            name="salary"
                                            value={values.salary}
                                            onChange={handleChange}
                                            placeholder="Enter salary"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                )}

                                {/* Subscriber Fields */}
                                {selectedRole === "Subscriber" && (
                                    <>
                                        <DynamicDropdown
                                            label="Subscription Status"
                                            name="currentSubStatus"
                                            value={values.currentSubStatus}
                                            onChange={handleChange}
                                            options={SUBSCRIPTION_STATUS}
                                        />

                                        <DatePickerComponent
                                            initialStartDate={startDate}
                                            initialEndDate={endDate}
                                            onStartChange={(d) => setStartDate(d)}
                                            onEndChange={(d) => setEndDate(d)}
                                        />
                                    </>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex justify-end items-center gap-3 border-t border-gray-200 bg-gray-50 px-5 py-3 rounded-b-md">
                                <button
                                    type="button"
                                    onClick={() => handleReset(resetForm)}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
                                >
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                                >
                                    Apply
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
};

export default UserFilterModal;
