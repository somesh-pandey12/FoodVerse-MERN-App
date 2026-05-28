// File Location: frontend/src/pages/Verify/Verify.jsx
import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            // Backend endpoint ko data pass karo payment status synchronize karne ke liye
            const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
            if (response.data.success) {
                navigate("/myorders");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Verification processing failed:", error);
            navigate("/");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className="verify min-h-[60vh] flex flex-col justify-center items-center gap-4">
            {/* Premium Tailwind Pulse Loader Spinning Context Indicator */}
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium tracking-wide text-sm animate-pulse">
                Verifying your payment, please do not close or refresh this tab...
            </p>
        </div>
    );
};

export default Verify;