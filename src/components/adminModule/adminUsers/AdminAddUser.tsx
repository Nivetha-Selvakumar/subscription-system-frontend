import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../layout/sideBar';
import DynamicInput from '../../../common-components/ui/dynamicInput';
import DynamicDropdown from '../../../common-components/ui/dynamicDropdown';
import DynamicDatePicker from '../../../common-components/ui/dynamicDatePicker';
import showToast from '../../../common-components/ui/toastNotification';

type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    dob: string;
    sex: string;
    role: string;
    salary: string;
    subscriptionStartDate: string;
    subscriptionEndDate: string;
    joinDate: string;
    status: string;
};

const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
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
};

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string().nullable(),
    address: Yup.string().nullable(),
    dob: Yup.string().nullable(),
    sex: Yup.string().nullable(),
    role: Yup.string().required('Role is required'),
    salary: Yup.string().when('role', (role: any, schema: any) => {
        return String(role).toLowerCase() === 'admin' ? schema.required('Salary is required for admin') : schema;
    }),
    subscriptionStartDate: Yup.string().when('role', (role: any, schema: any) => {
        return String(role).toLowerCase() === 'subscriber' ? schema.required('Subscription start date is required') : schema;
    }),
    subscriptionEndDate: Yup.string().when('role', (role: any, schema: any) => {
        return String(role).toLowerCase() === 'subscriber' ? schema.required('Subscription end date is required') : schema;
    }),
    joinDate: Yup.string().when('role', (role: any, schema: any) => {
        return String(role).toLowerCase() === 'subscriber' ? schema.required('Join date is required') : schema;
    }),
    status: Yup.string().nullable(),
});

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

    const handleSubmit = async (values: FormValues) => {
        // Replace with real API call or Redux dispatch when available
        // For now show a success toast and navigate back to user list
        console.log('Create user payload:', values);
        showToast('User created successfully', 'success', 'AddUser-Container');
        navigate('/admin/users');
    };

    return (
        <Sidebar>
            <ToastContainer containerId="AddUser-Container" />
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 min-h-screen">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New User</h1>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
                        <Form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
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
                                </div>

                                <div>
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
                                </div>

                                <div>
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
                                </div>

                                <div>
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
                                </div>

                                <div className="col-span-1 md:col-span-2">
                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <textarea
                                            name="address"
                                            value={values.address}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            rows={3}
                                            className={`w-full px-3 py-2 text-sm border rounded-md outline-none ${errors.address && touched.address ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errors.address && touched.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                                    </div>
                                </div>

                                <div>
                                    <DynamicDatePicker
                                        label="Date of Birth"
                                        name="dob"
                                        value={values.dob}
                                        onChange={(val: any) => setFieldValue('dob', val)}
                                        onBlur={handleBlur}
                                        error={errors.dob}
                                        touched={touched.dob}
                                    />
                                </div>

                                <div>
                                    <DynamicDropdown
                                        label="Gender"
                                        name="sex"
                                        value={values.sex}
                                        onChange={(e: any) => setFieldValue('sex', e.target.value)}
                                        onBlur={handleBlur}
                                        error={errors.sex}
                                        touched={touched.sex}
                                        options={genderOptions}
                                    />
                                </div>

                                <div>
                                    <DynamicDropdown
                                        label="Role"
                                        name="role"
                                        value={values.role}
                                        onChange={(e: any) => {
                                            const v = e.target.value;
                                            setFieldValue('role', v);
                                            if (String(v).toLowerCase() !== 'admin') {
                                                setFieldValue('salary', '');
                                            }
                                            // clear subscriber-only dates when role is not subscriber
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
                                </div>

                                {/* Subscriber-only dates */}
                                {String(values.role).toLowerCase() === 'subscriber' && (
                                    <>
                                        <div>
                                            <DynamicDatePicker
                                                label="Subscription Start Date"
                                                name="subscriptionStartDate"
                                                value={values.subscriptionStartDate}
                                                onChange={(val: any) => setFieldValue('subscriptionStartDate', val)}
                                                onBlur={handleBlur}
                                                error={errors.subscriptionStartDate}
                                                touched={touched.subscriptionStartDate}
                                            />
                                        </div>

                                        <div>
                                            <DynamicDatePicker
                                                label="Subscription End Date"
                                                name="subscriptionEndDate"
                                                value={values.subscriptionEndDate}
                                                onChange={(val: any) => setFieldValue('subscriptionEndDate', val)}
                                                onBlur={handleBlur}
                                                error={errors.subscriptionEndDate}
                                                touched={touched.subscriptionEndDate}
                                            />
                                        </div>

                                        <div>
                                            <DynamicDatePicker
                                                label="Join Date"
                                                name="joinDate"
                                                value={values.joinDate}
                                                onChange={(val: any) => setFieldValue('joinDate', val)}
                                                onBlur={handleBlur}
                                                error={errors.joinDate}
                                                touched={touched.joinDate}
                                            />
                                        </div>
                                    </>
                                )}

                                {String(values.role).toLowerCase() === 'admin' && (
                                    <div>
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
                                    </div>
                                )}

                                <div>
                                    <DynamicDropdown
                                        label="Status"
                                        name="status"
                                        value={values.status}
                                        onChange={(e: any) => setFieldValue('status', e.target.value)}
                                        onBlur={handleBlur}
                                        error={errors.status}
                                        touched={touched.status}
                                        options={statusOptions}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 mt-6">
                                <button type="button" onClick={() => navigate('/admin/users')} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700">
                                    Create User
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Sidebar>
    );
};

export default AdminAddUser;