import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { images } from "../../assets";
import { LOGIN_PAGE_CONSTANTS } from "../../utils/constants/LoginPage/LoginPage";
import DynamicInput from "../../common-components/ui/dynamicInput";
import showToast from "../../common-components/ui/toastNotification";
import "../../styles/LoginPage/LoginPage.scss";
import { FETCH_DATA_CLEAR, FETCH_DATA_REQUEST } from "../../redux/actionTypes/LoginPage/LoginActionTypes";
import { setStorage } from "../../utils/constants/Functional/funtional";

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginUserReducer = useSelector((state: any) => state.loginUserReducer);

    const { loginUser, loginUserLoading } = loginUserReducer;


    useEffect(() => {
        document.title = "Subscription | Log in";
    }, []);

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const initialValues = {
        email: "",
        password: "",
    };


    const handleSubmit = (values: typeof initialValues) => {
        const payload = {
            email: values.email,
            password: values.password,
        };
        dispatch({ type: FETCH_DATA_REQUEST, payload });
    };

    useEffect(() => {
        if (loginUser?.code === 200 || loginUser?.code === 201) {
            showToast("Login successful!", "success", "Login-Container");

            const data = loginUser?.loginData?.user;

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
                localStorage.setItem('email',  data?.email);
                localStorage.setItem('userName', UserName);
            }

            setTimeout(() => {
                const role = data?.role?.toLowerCase(); // ✅ fix here
                console.log("User Role:", role);
                if (role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/dashboard");
                }
                dispatch({ type: FETCH_DATA_CLEAR });
            }, 2000)
        }
    }, [loginUser, navigate, dispatch]);

    return (
        <>
            <ToastContainer containerId="Login-Container" />
            <div className="login-container">
                {/* Left Image */}
                <div className="hidden md:flex w-1/2 bg-white justify-center items-center">
                    <img
                        src={images.LoginPage}
                        alt="Login background"
                        className="object-contain w-[750px] h-[500px]"
                    />
                </div>

                {/* Right Form */}
                <div className="flex w-full md:w-1/2 justify-center items-center p-8 bg-white">
                    <div className="w-full max-w-md">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {LOGIN_PAGE_CONSTANTS.LOGIN}
                        </h2>
                        <p className="text-sm text-gray-500 mb-6">
                            {LOGIN_PAGE_CONSTANTS.LOGIN_IN_SEC}
                        </p>
                        {/* Formik Form */}
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ values, errors, touched, handleChange, handleBlur }) => (
                                <Form className="space-y-4">
                                    {/* Email */}
                                    <DynamicInput
                                        type="email"
                                        placeholder={LOGIN_PAGE_CONSTANTS.EMAIL}
                                        label={LOGIN_PAGE_CONSTANTS.EMAIL}
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
                                        placeholder={LOGIN_PAGE_CONSTANTS.PASSWORD}
                                        label={LOGIN_PAGE_CONSTANTS.PASSWORD}
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.password}
                                        touched={touched.password}
                                    />

                                    {/* Forgot Password */}
                                    <div className="flex items-center text-sm">
                                        <a
                                            href="/forgetPassword"
                                            className="text-indigo-600 hover:text-indigo-500"
                                        >
                                            {LOGIN_PAGE_CONSTANTS.FORGET_PASSWORD}
                                        </a>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loginUserLoading}
                                        className={`w-full py-2 px-4 text-white text-sm leading-[2.25rem] font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 transition ${loginUserLoading ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                    >
                                        {loginUserLoading
                                            ? LOGIN_PAGE_CONSTANTS.SIGN_IN
                                            : LOGIN_PAGE_CONSTANTS.LOGIN}
                                    </button>
                                </Form>
                            )}
                        </Formik>

                        {/* Redirect to Sign Up */}
                        <div className="mt-4 text-sm text-center">
                            <p>
                                {LOGIN_PAGE_CONSTANTS.DONT_HAVE_ACCOUNT}{" "}
                                <a
                                    href="/signup"
                                    className="text-indigo-600 font-medium hover:underline"
                                >
                                    {LOGIN_PAGE_CONSTANTS.SIGN_UP}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
