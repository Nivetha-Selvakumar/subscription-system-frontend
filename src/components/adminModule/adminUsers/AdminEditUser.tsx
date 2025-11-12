import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import Sidebar from "../../layout/sideBar";
import DynamicInput from "../../../common-components/ui/dynamicInput";
import DynamicDropdown from "../../../common-components/ui/dynamicDropdown";
import DynamicDatePicker from "../../../common-components/ui/dynamicDatePicker";
import showToast from "../../../common-components/ui/toastNotification";

// ✅ Redux Action Types
import { USER_VIEW_REQUEST } from "../../../redux/actionTypes/AdminModule/AdminUsers/adminViewUserActionType";
import { USER_EDIT_REQUEST } from "../../../redux/actionTypes/AdminModule/AdminUsers/adminEditUserActionType";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string().nullable(),
    address: Yup.string().nullable(),
    dob: Yup.string().nullable(),
    sex: Yup.string().nullable(),
    role: Yup.string().required("Role is required"),
    salary: Yup.string().when("role", (role: any, schema: any) => {
        return String(role).toLowerCase() === "admin"
            ? schema.required("Salary is required for admin")
            : schema;
    }),
    subscriptionStartDate: Yup.string().when("role", (role: any, schema: any) => {
        return String(role).toLowerCase() === "subscriber"
            ? schema.required("Subscription start date is required")
            : schema;
    }),
    subscriptionEndDate: Yup.string().when("role", (role: any, schema: any) => {
        return String(role).toLowerCase() === "subscriber"
            ? schema.required("Subscription end date is required")
            : schema;
    }),
    joinDate: Yup.string().when("role", (role: any, schema: any) => {
        return String(role).toLowerCase() === "subscriber"
            ? schema.required("Join date is required")
            : schema;
    }),
    status: Yup.string().nullable(),
});

const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
];

const roleOptions = [
    { label: "User", value: "user" },
    { label: "Admin", value: "admin" },
    { label: "Subscriber", value: "subscriber" },
];

const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
];

// Utility function for date formatting
// ✅ Converts "2020-NOV-20" or "2020-Nov-20" → "2020-11-20"
const formatDate = (dateStr: string) => {
    if (!dateStr) return "";

    // Handle uppercase month like "2020-NOV-20"
    const monthMap: Record<string, string> = {
        JAN: "01",
        FEB: "02",
        MAR: "03",
        APR: "04",
        MAY: "05",
        JUN: "06",
        JUL: "07",
        AUG: "08",
        SEP: "09",
        OCT: "10",
        NOV: "11",
        DEC: "12",
    };

    // Match yyyy-MMM-dd (case-insensitive)
    const match = dateStr.match(/^(\d{4})-([A-Za-z]{3})-(\d{2})$/);
    if (match) {
        const [year, month, day] = match;
        const upperMonth = month.toUpperCase();
        const numericMonth = monthMap[upperMonth] || "01";
        return `${year}-${numericMonth}-${day}`; // ✅ 2020-11-20
    }

    // If already yyyy-MM-dd, return as is
    const isoMatch = dateStr.match(/^\d{4}-\d{2}-\d{2}$/);
    if (isoMatch) return dateStr;

    // Fallback: try to parse any valid JS date
    const parsed = new Date(dateStr);
    if (isNaN(parsed.getTime())) return "";
    const yyyy = parsed.getFullYear();
    const mm = String(parsed.getMonth() + 1).padStart(2, "0");
    const dd = String(parsed.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
};



const AdminEditUser: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userView } = useSelector(
        (state: any) => state.userViewReducer || {}
    );

    const [initialValues, setInitialValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        dob: "",
        sex: "",
        role: "",
        salary: "",
        subscriptionStartDate: "",
        subscriptionEndDate: "",
        joinDate: "",
        status: "active",
        currentSubStatus: "active",
    });



    const { userEdit, userEditLoading } = useSelector(
        (state: any) => state.userEditReducer || {}
    );


    const hasFetched = useRef(false);

    useEffect(() => {
        if (id && !hasFetched.current) {
            hasFetched.current = true;
            dispatch({ type: USER_VIEW_REQUEST, payload: { userId: id } });
        }
    }, [id, dispatch]);

    // ✅ Set form values when API returns data
    useEffect(() => {
        if (userView?.userDetails) {
            const u = userView?.userDetails;
            setInitialValues({
                firstName: u.firstName || "",
                lastName: u.lastName || "",
                email: u.email || "",
                phoneNumber: u.phoneNumber || "",
                address: u.address || "",
                dob: u.dob || "",
                sex: u.sex?.toLowerCase() || "",
                role: u.role?.toLowerCase() || "",
                status: u.status?.toLowerCase() || "active",
                currentSubStatus: u.currentSubStatus?.toLowerCase() || "active",
                salary: u.salary || "",
                subscriptionStartDate: formatDate(u.subStartDate),
                subscriptionEndDate: formatDate(u.subEndDate),
                joinDate: formatDate(u.joinDate),
            });
        }
    }, [userView]);

    // ✅ Submit form
    const handleSubmit = (values: any) => {
        const adminId = localStorage.getItem("user_id");

        const payload = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            address: values.address,
            dateOfBirth: values.dob,
            phoneNumber: values.phoneNumber,
            sex: values.sex.toUpperCase(),
            role: values.role.toUpperCase(),
            status: values.status.toUpperCase(),
            salary: values.salary || null,
            currentSubStatus: values.currentSubStatus.toUpperCase() || null,
            subStartDate: values.subscriptionStartDate || null,
            subEndDate: values.subscriptionEndDate || null,
            joinDate: values.joinDate || null,
        };

        dispatch({
            type: USER_EDIT_REQUEST,
            payload: {
                userId: adminId,
                targetUserId: id,
                payload,
            },
        });
    };

    // ✅ Toast & redirect after success
    useEffect(() => {
        if (userEdit?.code === 200) {
            showToast("User updated successfully", "success", "EditUser-Container");
            dispatch({ type: 'USER_EDIT_CLEAR' });
            setTimeout(() => {
                navigate("/admin/users");
            }, 2000);
        }
    }, [userEdit, dispatch, navigate]);

    return (
        <Sidebar>
            <ToastContainer containerId="EditUser-Container" />
            <div className="flex justify-center items-start w-full min-h-screen bg-gray-50">
                <div className="max-w-4xl-[75rem] w-full bg-white rounded-lg shadow flex flex-col h-[80vh] my-8">
                    <h1 className="text-2xl font-bold text-gray-900 px-6 pt-6">
                        Edit User
                    </h1>

                    <div className="flex flex-col flex-1 overflow-y-auto px-6 pt-6">
                        <Formik
                            enableReinitialize
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                setFieldValue,
                            }) => (
                                <Form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <DynamicInput
                                            type="text"
                                            label="First Name"
                                            name="firstName"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.firstName}
                                            touched={touched.firstName}
                                        />

                                        <DynamicInput
                                            type="text"
                                            label="Last Name"
                                            name="lastName"
                                            value={values.lastName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.lastName}
                                            touched={touched.lastName}
                                        />

                                        <DynamicInput
                                            type="email"
                                            label="Email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.email}
                                            touched={touched.email}
                                        />

                                        <DynamicInput
                                            type="text"
                                            label="Phone Number"
                                            name="phoneNumber"
                                            value={values.phoneNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.phoneNumber}
                                            touched={touched.phoneNumber}
                                            maxLength={10}
                                        />

                                        <div className="col-span-1 md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Address
                                            </label>
                                            <textarea
                                                name="address"
                                                value={values.address}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                rows={3}
                                                className={`w-full px-3 py-2 text-sm border rounded-md outline-none ${errors.address && touched.address
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                                    }`}
                                            />
                                        </div>

                                        <DynamicDatePicker
                                            label="Date of Birth"
                                            name="dob"
                                            value={values.dob}
                                            onChange={(e) => setFieldValue("dob", e.target.value)}
                                            onBlur={handleBlur}
                                            error={errors.dob}
                                            touched={touched.dob}
                                        />

                                        <DynamicDropdown
                                            label="Gender"
                                            name="sex"
                                            value={values.sex}
                                            onChange={(e: any) =>
                                                setFieldValue("sex", e.target.value)
                                            }
                                            onBlur={handleBlur}
                                            error={errors.sex}
                                            touched={touched.sex}
                                            options={genderOptions}
                                        />

                                        <DynamicDropdown
                                            label="Role"
                                            name="role"
                                            value={values.role}
                                            onChange={(e: any) => {
                                                const v = e.target.value;
                                                setFieldValue("role", v);
                                                if (String(v).toLowerCase() !== "admin")
                                                    setFieldValue("salary", "");
                                                if (String(v).toLowerCase() !== "subscriber") {
                                                    setFieldValue("subscriptionStartDate", "");
                                                    setFieldValue("subscriptionEndDate", "");
                                                    setFieldValue("joinDate", "");
                                                }
                                            }}
                                            onBlur={handleBlur}
                                            error={errors.role}
                                            touched={touched.role}
                                            options={roleOptions}
                                        />

                                        {/* Subscriber fields */}
                                        {String(values.role).toLowerCase() === "subscriber" && (
                                            <>
                                                <DynamicDatePicker
                                                    label="Subscription Start Date"
                                                    name="subscriptionStartDate"
                                                    value={values.subscriptionStartDate}
                                                    onChange={(e) =>
                                                        setFieldValue(
                                                            "subscriptionStartDate",
                                                            e.target.value
                                                        )
                                                    }
                                                    onBlur={handleBlur}
                                                    error={errors.subscriptionStartDate}
                                                    touched={touched.subscriptionStartDate}
                                                />

                                                <DynamicDatePicker
                                                    label="Subscription End Date"
                                                    name="subscriptionEndDate"
                                                    value={values.subscriptionEndDate}
                                                    onChange={(e) =>
                                                        setFieldValue(
                                                            "subscriptionEndDate",
                                                            e.target.value
                                                        )
                                                    }
                                                    onBlur={handleBlur}
                                                    error={errors.subscriptionEndDate}
                                                    touched={touched.subscriptionEndDate}
                                                />

                                                <DynamicDatePicker
                                                    label="Join Date"
                                                    name="joinDate"
                                                    value={values.joinDate}
                                                    onChange={(e) =>
                                                        setFieldValue("joinDate", e.target.value)
                                                    }
                                                    onBlur={handleBlur}
                                                    error={errors.joinDate}
                                                    touched={touched.joinDate}
                                                />

                                                <DynamicDropdown
                                                    label="Current Subscription Status"
                                                    name="currentSubStatus"
                                                    value={values.currentSubStatus}
                                                    onChange={(e: any) =>
                                                        setFieldValue("currentSubStatus", e.target.value)
                                                    }
                                                    onBlur={handleBlur}
                                                    error={errors.currentSubStatus}
                                                    touched={touched.currentSubStatus}
                                                    options={statusOptions}
                                                />
                                            </>
                                        )}

                                        {/* Admin salary */}
                                        {String(values.role).toLowerCase() === "admin" && (
                                            <DynamicInput
                                                type="number"
                                                label="Salary"
                                                name="salary"
                                                value={values.salary}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.salary}
                                                touched={touched.salary}
                                            />
                                        )}

                                        <DynamicDropdown
                                            label="Status"
                                            name="status"
                                            value={values.status}
                                            onChange={(e: any) =>
                                                setFieldValue("status", e.target.value)
                                            }
                                            onBlur={handleBlur}
                                            error={errors.status}
                                            touched={touched.status}
                                            options={statusOptions}
                                        />
                                    </div>

                                    <div className="sticky bottom-0 bg-white border-t border-gray-200 flex justify-end gap-4 px-6 py-4 mt-auto">
                                        <button
                                            type="button"
                                            onClick={() => navigate("/admin/users")}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={userEditLoading}
                                            className={`px-4 py-2 text-sm font-medium text-white rounded-md ${userEditLoading
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-indigo-600 hover:bg-indigo-700"
                                                }`}
                                        >
                                            {userEditLoading ? "Saving..." : "Save Changes"}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </Sidebar>
    );
};

export default AdminEditUser;
