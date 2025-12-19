import React, { useState } from "react";

interface PlanCardProps {
    plan: any;
    onSelect?: (plan: any) => void;
    subscriptionAction?: "UPGRADE" | "DOWNGRADE" | "NONE" | "CURRENT";
}

const SubscriptionPlanCard: React.FC<PlanCardProps> = ({
    plan,
    onSelect,
    subscriptionAction
}) => {

    const [showConfirm, setShowConfirm] = useState(false);

    const getButtonLabel = () => {
        if (subscriptionAction === "CURRENT") return "Current Plan";
        if (subscriptionAction === "UPGRADE") return "Upgrade Plan";
        if (subscriptionAction === "DOWNGRADE") return "Downgrade Plan";
        return "Choose Plan";
    };

    const getConfirmMessage = () => {
        if (subscriptionAction === "UPGRADE") return "Are you sure you want to upgrade your plan?";
        if (subscriptionAction === "DOWNGRADE") return "Are you sure you want to downgrade your plan?";
        return "Are you sure you want to choose this plan?";
    };

    const handleClick = () => {
        if (subscriptionAction === "CURRENT") return;
        setShowConfirm(true);
    };

    const confirmAction = () => {
        setShowConfirm(false);
        onSelect?.(plan);
    };

    return (
        <>
            {/* HOVER EFFECT CSS */}
            <style>
                {`
                .netflix-card {
                    transform: scale(1);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .netflix-card:hover {
                    transform: scale(1.12) translateY(-10px);
                    box-shadow: 0px 10px 30px rgba(0,0,0,0.35);
                    z-index: 20;
                }
                `}
            </style>

            {/* CARD */}
            <div
                className={`netflix-card rounded-2xl shadow-lg border p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer 
                ${subscriptionAction === "CURRENT"
                        ? "bg-[#dbeafe] border-[#60a5fa]"
                        : plan.recommended
                            ? "bg-[#034078] text-white border-[#02345F]"
                            : "bg-white text-gray-800 border-gray-200"
                    }`}
            >
                <div>
                    <p
                        className={`text-sm mb-3 px-3 py-1 rounded-full w-fit 
                        ${plan.recommended
                                ? "bg-white/25 text-white"
                                : "bg-[#034078]/10 text-[#034078]"
                            }`}
                    >
                        {plan.planName}
                    </p>

                    <p
                        className={`text-4xl font-bold 
                        ${plan.recommended ? "text-white" : "text-[#034078]"}
                    `}
                    >
                        ₹{plan.planCost}
                    </p>
                    <p className="text-sm mb-6 opacity-80">{plan.planType}</p>

                    <ul className="space-y-3">
                        {plan.description?.split(",").map((line: string, index: number) => (
                            <li key={index} className="flex gap-3 items-start">
                                <span
                                    className={`font-bold 
                                    ${plan.recommended ? "text-[#9FFFD7]" : "text-green-600"}`}
                                >
                                    ✔
                                </span>
                                <span>{line.trim()}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* BUTTON */}
                <button
                    disabled={subscriptionAction === "CURRENT"}
                    onClick={handleClick}
                    className={`mt-8 w-full py-3 rounded-full font-semibold transition 
                        ${subscriptionAction === "CURRENT"
                            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                            : "bg-[#034078] text-white hover:bg-[#02345F]"
                        }`}
                >
                    {getButtonLabel()}
                </button>
            </div>

            {/* CONFIRM POPUP */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-[22rem] text-center">

                        <h2 className="text-lg font-semibold text-gray-800 mb-3">
                            {getConfirmMessage()}
                        </h2>

                        <div className="flex justify-center gap-3 mt-5">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmAction}
                                className="px-4 py-2 rounded-lg bg-[#034078] text-white hover:bg-[#02345F]"
                            >
                                Yes, Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SubscriptionPlanCard;
