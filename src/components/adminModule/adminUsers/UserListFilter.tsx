"use client";
import React, { useEffect, useState } from "react";
import { Box, Modal, TextField, MenuItem } from "@mui/material";
import { Formik, Form } from "formik";
import { Close } from "@mui/icons-material";

import "../../../styles/AdminModule/AdminUser/userList.scss";
import DatePickerComponent from "../../../common-components/ui/datePickerRange";

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

const UserFilterModal: React.FC<UserFilterProps> = ({
    isModalOpen,
    toggleModal,
    onChangeFilter,
    initialFilter,
}) => {
    const [selectedRole, setSelectedRole] = useState(initialFilter?.role || "");
    const [startDate, setStartDate] = useState(initialFilter?.subStartDate || null);
    const [endDate, setEndDate] = useState(initialFilter?.subEndDate || null);

    useEffect(() => {
        if (isModalOpen) {
            setSelectedRole(initialFilter?.role || "");
            setStartDate(initialFilter?.subStartDate || null);
            setEndDate(initialFilter?.subEndDate || null);
        }
    }, [isModalOpen, initialFilter]);

    const modalStyle = {
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 680,
        bgcolor: "background.paper",
        boxShadow: 24,
        borderRadius: "8px",
        maxHeight: "90vh",
        overflow: "auto",
    };

    return (
        <Modal
            open={isModalOpen}
            onClose={() => toggleModal(false)}
            aria-labelledby="user-filter-modal"
        >
            <Box sx={modalStyle}>
                <div className="user-filter-header">
                    <p className="title">User Filter</p>
                    <Close
                        onClick={() => toggleModal(false)}
                        sx={{ cursor: "pointer", color: "#444" }}
                    />
                </div>

                <Formik
                    initialValues={{
                        firstName: initialFilter?.firstName || "",
                        lastName: initialFilter?.lastName || "",
                        email: initialFilter?.email || "",
                        role: selectedRole,
                        gender: initialFilter?.gender || "",
                        status: initialFilter?.status || "",
                        subStartDate: startDate,
                        subEndDate: endDate,
                        salary: initialFilter?.salary || "",
                    }}
                    onSubmit={(values) => {
                        onChangeFilter(values);
                        toggleModal(false);
                    }}
                >
                    {({ values, handleChange }) => (
                        <Form className="user-filter-form">
                            <div className="user-filter-body">
                                <div className="filter-row">
                                    <TextField
                                        name="firstName"
                                        label="First Name"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        fullWidth
                                        size="small"
                                    />
                                    <TextField
                                        name="lastName"
                                        label="Last Name"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        fullWidth
                                        size="small"
                                    />
                                </div>

                                <div className="filter-row">
                                    <TextField
                                        name="email"
                                        label="Email"
                                        value={values.email}
                                        onChange={handleChange}
                                        fullWidth
                                        size="small"
                                    />
                                    <TextField
                                        select
                                        name="gender"
                                        label="Gender"
                                        value={values.gender}
                                        onChange={handleChange}
                                        fullWidth
                                        size="small"
                                    >
                                        {GENDERS.map((g) => (
                                            <MenuItem key={g.value} value={g.value}>
                                                {g.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>

                                <div className="filter-row">
                                    <TextField
                                        select
                                        name="role"
                                        label="Role"
                                        value={values.role}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setSelectedRole(e.target.value);
                                        }}
                                        fullWidth
                                        size="small"
                                    >
                                        {ROLES.map((r) => (
                                            <MenuItem key={r.value} value={r.value}>
                                                {r.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField
                                        select
                                        name="status"
                                        label="Status"
                                        value={values.status}
                                        onChange={handleChange}
                                        fullWidth
                                        size="small"
                                    >
                                        {STATUS.map((s) => (
                                            <MenuItem key={s.value} value={s.value}>
                                                {s.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>

                                {selectedRole === "Subscriber" && (
                                    <div className="filter-row">
                                        <DatePickerComponent
                                            onStartSelect={(date: any) => setStartDate(date)}
                                            onEndSelect={(date: any) => setEndDate(date)}
                                            isSubmitting={false}
                                            reset={false}
                                            initialStartDate={startDate}
                                            initialEndDate={endDate}
                                        />
                                    </div>
                                )}

                                {selectedRole === "Admin" && (
                                    <div className="filter-row">
                                        <TextField
                                            name="salary"
                                            label="Salary"
                                            value={values.salary}
                                            onChange={handleChange}
                                            fullWidth
                                            size="small"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="filter-footer">
                                <button type="submit" className="apply-btn">
                                    Apply
                                </button>
                                <button
                                    type="button"
                                    className="reset-btn"
                                    onClick={() => onChangeFilter({})}
                                >
                                    Reset
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
