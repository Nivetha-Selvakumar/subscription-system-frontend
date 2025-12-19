import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../layout/sideBar';
import DynamicInput from '../../../common-components/ui/dynamicInput';
import DynamicDropdown from '../../../common-components/ui/dynamicDropdown';
import DynamicDatePicker from '../../../common-components/ui/dynamicDatePicker';
import showToast from '../../../common-components/ui/toastNotification';
import DynamicTextarea from '../../../common-components/ui/dynamicTextArea';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    phoneNumber: Yup.string().required("phone number is required"),
    address: Yup.string().required('Address is required'),
    dob: Yup.string().required('Date of Birth is required'),
    sex: Yup.string().required('Sex is required'),
    role: Yup.string().required('Role is required'),
    salary: Yup.string().when('role', (role: any, schema: any) => {
        return String(role).toLowerCase() === 'admin'
            ? schema.required('Salary is required for admin')
            : schema;
    }),
    subscriptionStartDate: Yup.string().when('role', (role: any, schema: any) => {
        return String(role).toLowerCase() === 'subscriber'
            ? schema.required('Subscription start date is required')
            : schema;
    }),
    subscriptionEndDate: Yup.string().when('role', (role: any, schema: any) => {
        return String(role).toLowerCase() === 'subscriber'
            ? schema.required('Subscription end date is required')
            : schema;
    }),
    joinDate: Yup.string().when('role', (role: any, schema: any) => {
        return String(role).toLowerCase() === 'subscriber'
            ? schema.required('Join date is required')
            : schema;
    }),
    status: Yup.string().nullable(),
});

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    dob: '',
    sex: '',
    role: '',
    salary: '',
    subscriptionStartDate: '',
    subscriptionEndDate: '',
    joinDate: '',
    status: 'active',
    currentSubStatus: 'active',
};

const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
];

const roleOptions = [
    { label: 'User', value: 'user' },
    { label: 'Admin', value: 'admin' },
    { label: 'Subscriber', value: 'subscriber' },
];

const statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
];

const AdminAddUser: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Subscription | Admin Add User";
    }, []);

    const { userCreate, userCreateLoading } = useSelector(
        (state: any) => state.userCreateReducer || {}
    );

    const handleSubmit = async (values: any) => {
        // Map frontend keys to backend DTO keys
        const payload = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password || "", // optional (if password not included in form)
            address: values.address,
            dateOfBirth: values.dob, // ✅ mapped
            phoneNumber: values.phoneNumber,
            sex: values.sex.toUpperCase(),
            role: values.role,
            status: values.status.toUpperCase(),
            salary: values.salary || null, // admin only
            currentSubStatus: values.currentSubStatus === "active" ? "Active" : "Inactive", // or handle conditionally
            subStartDate: values.subscriptionStartDate || null, // ✅ mapped
            subEndDate: values.subscriptionEndDate || null, // ✅ mapped
            joinDate: values.joinDate || null, // ✅ mapped
        };

        dispatch({ type: 'USER_CREATE_REQUEST', payload });
    };


    // ✅ Toast & redirect on success
    useEffect(() => {
        if (userCreate?.code === 201 || userCreate?.code === 200) {
            showToast('User created successfully', 'success', 'AddUser-Container');
            dispatch({ type: 'USER_CREATE_CLEAR' });
            setTimeout(() => {
                window.location.href = `/admin/users`;
            }, 3000);
        }
    }, [userCreate, navigate, dispatch]);


    return (
        <Sidebar>
            <ToastContainer containerId="AddUser-Container" />
            <div className="flex justify-center items-start w-full min-h-screen bg-gray-50">
                <div className="max-w-4xl-[75rem] w-full bg-white rounded-lg shadow flex flex-col h-[80vh] my-8">
                    <h1 className="text-2xl font-bold text-gray-900 px-6 pt-6">Add New User</h1>
                    {/* Scrollable form content */}
                    <div className="flex flex-col flex-1 overflow-y-auto px-6 pt-6">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
                                <Form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* FIRST NAME */}
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

                                        {/* LAST NAME */}
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

                                        {/* EMAIL */}
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
                                        {/* PASSWORD */}
                                        <DynamicInput
                                            type="password"
                                            label="Password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.password}
                                            touched={touched.password}
                                        />


                                        {/* PHONE */}
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

                                        {/* ADDRESS */}
                                        <DynamicTextarea
                                            label="Address"
                                            name="address"
                                            value={values.address}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            rows={4}
                                            error={errors.address}
                                            touched={touched.address}
                                        />


                                        {/* DOB */}
                                        <DynamicDatePicker
                                            label="Date of Birth"
                                            name="dob"
                                            value={values.dob}
                                            onChange={(e) => setFieldValue('dob', e.target.value)}
                                            onBlur={handleBlur}
                                            error={errors.dob}
                                            touched={touched.dob}
                                        />

                                        {/* GENDER */}
                                        <DynamicDropdown
                                            label="Gender"
                                            name="sex"
                                            value={values.sex}
                                            onChange={(e: any) => setFieldValue('sex', e.target.value)} // ✅ FIX
                                            onBlur={handleBlur}
                                            error={errors.sex}
                                            touched={touched.sex}
                                            options={genderOptions}
                                        />

                                        {/* ROLE */}
                                        <DynamicDropdown
                                            label="Role"
                                            name="role"
                                            value={values.role}
                                            onChange={(e: any) => {
                                                const v = e.target.value; // ✅ FIX
                                                setFieldValue('role', v);
                                                if (String(v).toLowerCase() !== 'admin') setFieldValue('salary', '');
                                                if (String(v).toLowerCase() !== 'subscriber') {
                                                    setFieldValue('subscriptionStartDate', '');
                                                    setFieldValue('subscriptionEndDate', '');
                                                    setFieldValue('joinDate', '');
                                                }
                                            }}
                                            onBlur={handleBlur}
                                            error={errors.role}
                                            touched={touched.role}
                                            options={roleOptions}
                                        />

                                        {/* SUBSCRIBER DATES */}
                                        {String(values.role).toLowerCase() === 'subscriber' && (
                                            <>
                                                <DynamicDatePicker
                                                    label="Subscription Start Date"
                                                    name="subscriptionStartDate"
                                                    value={values.subscriptionStartDate}
                                                    onChange={(e) =>
                                                        setFieldValue('subscriptionStartDate', e.target.value)
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
                                                        setFieldValue('subscriptionEndDate', e.target.value)
                                                    }
                                                    onBlur={handleBlur}
                                                    error={errors.subscriptionEndDate}
                                                    touched={touched.subscriptionEndDate}
                                                />

                                                <DynamicDatePicker
                                                    label="Join Date"
                                                    name="joinDate"
                                                    value={values.joinDate}
                                                    onChange={(e) => setFieldValue('joinDate', e.target.value)}
                                                    onBlur={handleBlur}
                                                    error={errors.joinDate}
                                                    touched={touched.joinDate}
                                                />

                                                <DynamicDropdown
                                                    label="Current Subscription Status"
                                                    name="currentSubStatus"
                                                    value={values.currentSubStatus}
                                                    onChange={(e: any) => setFieldValue('currentSubStatus', e.target.value)} // ✅ FIX
                                                    onBlur={handleBlur}
                                                    error={errors.currentSubStatus}
                                                    touched={touched.currentSubStatus}
                                                    options={statusOptions}
                                                />
                                            </>
                                        )}

                                        {/* ADMIN SALARY */}
                                        {String(values.role).toLowerCase() === 'admin' && (
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

                                        {/* STATUS */}
                                        <DynamicDropdown
                                            label="Status"
                                            name="status"
                                            value={values.status}
                                            onChange={(e: any) => setFieldValue('status', e.target.value)} // ✅ FIX
                                            onBlur={handleBlur}
                                            error={errors.status}
                                            touched={touched.status}
                                            options={statusOptions}
                                        />
                                    </div>

                                    {/* BUTTONS */}
                                    {/* Sticky footer for buttons */}
                                    <div className="sticky bottom-0 bg-white border-t border-gray-200 flex justify-end gap-4 px-6 py-4 mt-auto">
                                        <button
                                            type="button"
                                            onClick={() => navigate('/admin/users')}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={userCreateLoading}
                                            className={`px-4 py-2 text-sm font-medium text-white rounded-md ${userCreateLoading
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-indigo-600 hover:bg-indigo-700'
                                                }`}
                                        >
                                            {userCreateLoading ? 'Creating...' : 'Create User'}
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

export default AdminAddUser;
