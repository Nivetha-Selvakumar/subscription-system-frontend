import React, { useEffect, useState } from "react";
import { images } from "../../assets";
import { SIGNUP_PAGE_CONSTANTS } from "../../utils/constants/SignUpPage/SignUpPage";
import { useDispatch } from "react-redux";
import { SUBSCRIBER_CREATE_REQUEST } from "../../redux/actionTypes/SignUpPage/SignupActionTypes";
import "../../styles/LoginPage/LoginPage.scss";
import DynamicInput from "../../common-components/ui/dynamicInput";
import DynamicCheckbox from "../../common-components/ui/dynamicCheckbox";

const SignUpPage: React.FC = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);

    useEffect(() => {
        document.title = "Subscription | Sign up";
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = { name: "Nivetha", email, password };
            dispatch({ type: SUBSCRIBER_CREATE_REQUEST, payload });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            {/* Left Side Image */}
            <div className="hidden md:flex w-1/2 bg-gray-200">
                <img
                    src={images.LoginPage}
                    alt="Signup background"
                    className="object-cover w-full h-full"
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

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <DynamicInput
                                type="text"
                                placeholder={SIGNUP_PAGE_CONSTANTS.FIRST_NAME}
                                value={firstName}
                                onChange={setFirstName}
                            />
                        </div>
                        <div>
                            <DynamicInput
                                type="text"
                                placeholder={SIGNUP_PAGE_CONSTANTS.LAST_NAME}
                                value={lastName}
                                onChange={setLastName}
                            />
                        </div>
                        <div>
                            <DynamicInput
                                type="email"
                                placeholder={SIGNUP_PAGE_CONSTANTS.EMAIL}
                                value={email}
                                onChange={setEmail}
                            />
                        </div>
                        <div>
                            <DynamicInput
                                type="password"
                                placeholder={SIGNUP_PAGE_CONSTANTS.CREATE_PASSWORD}
                                value={password}
                                onChange={setPassword}
                            />
                        </div>
                        <div className="flex items-center text-sm">
                            <DynamicCheckbox
                                id="terms"
                                label={SIGNUP_PAGE_CONSTANTS.TERMS_AND_CONDITIONS}
                                checked={agreeTerms}
                                onChange={setAgreeTerms}
                            />
                        </div>


                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 px-4 text-white text-sm leading-[2.25rem] font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {loading
                                ? SIGNUP_PAGE_CONSTANTS.SIGNING_IN
                                : SIGNUP_PAGE_CONSTANTS.CREATE_AN_ACCOUNT}
                        </button>
                    </form>

                    <div className="mt-4 text-sm text-center">
                        <p>
                            {SIGNUP_PAGE_CONSTANTS.ALREADY_AN_MEMBER}{" "}
                            <a href="/login" className="text-indigo-600 font-medium hover:underline">
                                {SIGNUP_PAGE_CONSTANTS.LOGIN}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
