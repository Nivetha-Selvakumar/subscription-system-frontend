import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../features/auth/authSlice";
import { images } from "../../assets";
import { LOGIN_PAGE_CONSTANTS } from "../../utils/constants/LoginPage/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/LoginPage/LoginPage.scss";
import DynamicInput from "../../common-components/ui/dynamicInput";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const { data, error, loading } = useSelector((state: any) => state.LoginRequest);
    const { error, loading } = useSelector((state: any) => state.LoginRequest);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        document.title = "Subscription | Log in";
    }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const mockUser = {
                id: "1",
                email,
                name: email.split("@")[0],
            };
            dispatch(
                loginSuccess({
                    token: "mock-jwt-token",
                    user: mockUser,
                })
            );
            navigate("/");
        } catch (err) {
            console.error("Login error:", err);
        }
    };

    return (
        <div className="login-container">
            {/* Left Side Image */}
            <div className="hidden md:flex w-1/2 bg-gray-200">
                <img
                    src={images.LoginPage}
                    alt="Login background"
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Right Side Form */}
            <div className="flex w-full md:w-1/2 justify-center items-center p-8 bg-white">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{LOGIN_PAGE_CONSTANTS.LOGIN}</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        {LOGIN_PAGE_CONSTANTS.LOGIN_IN_SEC}
                    </p>

                    {error && (
                        <div
                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
                            role="alert"
                        >
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <DynamicInput
                                type="email"
                                placeholder={LOGIN_PAGE_CONSTANTS.EMAIL}
                                value={email}
                                onChange={(e:any) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <DynamicInput
                                type="password"
                                placeholder={LOGIN_PAGE_CONSTANTS.PASSWORD}
                                value={password}
                                onChange={(e:any) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center text-sm">
                            <a href="/forgetPassword" className="text-indigo-600 hover:text-indigo-500">
                                {LOGIN_PAGE_CONSTANTS.FORGET_PASSWORD}
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 px-4 text-white text-sm leading-[2.25rem] font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {loading ? LOGIN_PAGE_CONSTANTS.SIGN_IN : LOGIN_PAGE_CONSTANTS.LOGIN}
                        </button>
                    </form>

                    <div className="mt-4 text-sm text-center">
                        <p>
                            {LOGIN_PAGE_CONSTANTS.DONT_HAVE_ACCOUNT}{" "}
                            <a href="/signup" className="text-indigo-600 font-medium hover:underline">
                                {LOGIN_PAGE_CONSTANTS.SIGN_UP}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;