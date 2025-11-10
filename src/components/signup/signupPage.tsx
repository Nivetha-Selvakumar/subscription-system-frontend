import React, { useEffect } from "react";
import { images } from "../../assets";
import { SIGNUP_PAGE_CONSTANTS } from "../../utils/constants/SignUpPage/SignUpPage";
import { useDispatch, useSelector } from "react-redux";
import { SIGNUP_USER_CLEAR, SIGNUP_USER_REQUEST } from "../../redux/actionTypes/SignUpPage/SignupActionTypes";
import "../../styles/SignUpPage/SignUpPage.scss";
import DynamicInput from "../../common-components/ui/dynamicInput";
import DynamicCheckbox from "../../common-components/ui/dynamicCheckbox";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import DynamicDropdown from "../../common-components/ui/dynamicDropdown";
import DynamicDatePicker from "../../common-components/ui/dynamicDatePicker";
import { ToastContainer } from "react-toastify";
import showToast from "../../common-components/ui/toastNotification";
import { setStorage } from "../../utils/constants/Functional/funtional";

const SignUpPage: React.FC = () => {
    const dispatch = useDispatch();
    const { signupUser, signupUserLoading } = useSelector(
        (state: any) => state.signupUserReducer
    );
    useEffect(() => {
        document.title = "Subscription | Sign up";
    }, []);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .max(100, "Password must be at most 100 characters")
            .matches(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            ),

        phoneNumber: Yup.string()
            .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
            .required("Phone number is required"),
        address: Yup.string().required("Address is required"),
        dateOfBirth: Yup.string().required("Date of birth is required"),
        sex: Yup.string().required("Please select gender"),
        termsAndConditions: Yup.boolean()
            .oneOf([true], "You must accept the terms and conditions")
            .required("You must accept the terms and conditions"),
    });

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        dateOfBirth: "",
        sex: "",
        termsAndConditions: false,
        password: "",
    };

    useEffect(() => {
        if (signupUser?.code === 201 || signupUser?.code === 200) {
            showToast(signupUser?.message, "success", "User-Create");
            const data = signupUser?.userData?.user;
            if (data) {
                const UserName = `${data?.firstName} ${data?.lastName}`;

                // Set values to a custom storage function
                setStorage('firstName', data?.firstName);
                setStorage('lastName', data?.lastName);

                // Set values to localStorage
                localStorage.setItem('firstName', data?.firstName);
                localStorage.setItem('lastName', data?.lastName);
                localStorage.setItem('user_id', data?.id);
                localStorage.setItem('role', data?.role);
                localStorage.setItem('email', data?.email);
                localStorage.setItem('userName', UserName);
            }

            dispatch({ type: SIGNUP_USER_CLEAR });
            setTimeout(() => {
                window.location.href = `/dashboard`;
            }, 3000);
        }
    }, [signupUser, dispatch]);

    const handleSubmit = async (values: typeof initialValues) => {
        const sexValue = values.sex?.toLowerCase();
        const payload = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            phoneNumber: values.phoneNumber,
            address: values.address,
            dateOfBirth: values.dateOfBirth,
            sex: sexValue === "male"
                ? "MALE"
                : sexValue === "female"
                    ? "FEMALE"
                    : "OTHER",
            role: "USER",
            status: "ACTIVE",
        };
        dispatch({ type: SIGNUP_USER_REQUEST, payload });
    };

    return (
        <>
            <ToastContainer containerId="User-Create" />
            <div className="signup-container">
                {/* Left Side Image */}
                <div className="hidden md:flex w-1/2 bg-white justify-center items-center">
                    <img
                        src={images.LoginPage}
                        alt="Login background"
                        className="object-contain w-[750px] h-[500px]"
                    />
                </div>

                {/* Right Side Form */}
                <div className="flex w-full md:w-1/2 justify-center items-center p-8 bg-white">
                    <div className="w-full max-w-md">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {SIGNUP_PAGE_CONSTANTS.SIGN_IN}
                        </h2>
                        <p className="text-sm text-gray-500 mb-6">
                            {SIGNUP_PAGE_CONSTANTS.CREATE_YOUR_ACCOUNT}
                        </p>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
                                <Form className="space-y-4">
                                    {/* First Name */}
                                    <DynamicInput
                                        type="text"
                                        placeholder={SIGNUP_PAGE_CONSTANTS.FIRST_NAME}
                                        label={SIGNUP_PAGE_CONSTANTS.FIRST_NAME}
                                        name="firstName"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.firstName}
                                        touched={touched.firstName}
                                    />

                                    {/* Last Name */}
                                    <DynamicInput
                                        type="text"
                                        placeholder={SIGNUP_PAGE_CONSTANTS.LAST_NAME}
                                        label={SIGNUP_PAGE_CONSTANTS.LAST_NAME}
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.lastName}
                                        touched={touched.lastName}
                                    />

                                    {/* Email */}
                                    <DynamicInput
                                        type="email"
                                        placeholder={SIGNUP_PAGE_CONSTANTS.EMAIL}
                                        label={SIGNUP_PAGE_CONSTANTS.EMAIL}
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.email}
                                        touched={touched.email}
                                    />

                                    {/* Password */}
                                    <DynamicInput
                                        type="password"
                                        placeholder={SIGNUP_PAGE_CONSTANTS.CREATE_PASSWORD}
                                        label={SIGNUP_PAGE_CONSTANTS.CREATE_PASSWORD}
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.password}
                                        touched={touched.password}
                                    />

                                    {/* Phone Number */}
                                    <DynamicInput
                                        type="text"
                                        placeholder={SIGNUP_PAGE_CONSTANTS.PHONE_NUMBER}
                                        label={SIGNUP_PAGE_CONSTANTS.PHONE_NUMBER}
                                        name="phoneNumber"
                                        value={values.phoneNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.phoneNumber}
                                        touched={touched.phoneNumber}
                                        maxLength={10}
                                    />

                                    {/* Address */}
                                    <DynamicInput
                                        type="text"
                                        placeholder={SIGNUP_PAGE_CONSTANTS.ADDRESS}
                                        label={SIGNUP_PAGE_CONSTANTS.ADDRESS}
                                        name="address"
                                        value={values.address}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.address}
                                        touched={touched.address}
                                    />

                                    <DynamicDatePicker
                                        name="dateOfBirth"
                                        placeholder={SIGNUP_PAGE_CONSTANTS.DOB_PLACEHOLDER}
                                        label={SIGNUP_PAGE_CONSTANTS.DATE_OF_BIRTH}
                                        value={values.dateOfBirth}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.dateOfBirth}
                                        touched={touched.dateOfBirth}
                                    />

                                    {/* Gender Dropdown */}
                                    <DynamicDropdown
                                        name="sex"
                                        value={values.sex}
                                        placeholder={SIGNUP_PAGE_CONSTANTS.GENDER_PLACEHOLDER}
                                        label={SIGNUP_PAGE_CONSTANTS.GENDER}
                                        options={[
                                            { value: "Male", label: "Male" },
                                            { value: "Female", label: "Female" },
                                            { value: "Other", label: "Other" },
                                        ]}
                                        onChange={(event) => setFieldValue("sex", event.target.value)}
                                        onBlur={handleBlur}
                                        error={errors.sex}
                                        touched={touched.sex}
                                        isSearch={true}
                                    />

                                    {/* Terms and Conditions */}
                                    <div className="flex items-center text-sm">
                                        <DynamicCheckbox
                                            id="termsAndConditions"
                                            label={SIGNUP_PAGE_CONSTANTS.TERMS_AND_CONDITIONS}
                                            checked={values.termsAndConditions}
                                            onChange={(checked: boolean) =>
                                                setFieldValue("termsAndConditions", checked)
                                            }
                                        />
                                    </div>
                                    {touched.termsAndConditions && errors.termsAndConditions && (
                                        <p className="text-red-500 text-xs">{errors.termsAndConditions}</p>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={signupUserLoading}
                                        className={`w-full py-2 px-4 text-white text-sm leading-[2.25rem] font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 transition ${signupUserLoading ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                    >
                                        {signupUserLoading
                                            ? SIGNUP_PAGE_CONSTANTS.SIGNING_IN
                                            : SIGNUP_PAGE_CONSTANTS.CREATE_AN_ACCOUNT}
                                    </button>
                                </Form>
                            )}
                        </Formik>

                        <div className="mt-4 text-sm text-center">
                            <p>
                                {SIGNUP_PAGE_CONSTANTS.ALREADY_AN_MEMBER}{" "}
                                <a
                                    href="/login"
                                    className="text-indigo-600 font-medium hover:underline"
                                >
                                    {SIGNUP_PAGE_CONSTANTS.LOGIN}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUpPage;
