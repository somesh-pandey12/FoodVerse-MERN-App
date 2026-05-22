import React from "react";

const { useContext, useEffect } = React;
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import './Verify.css'; 

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(url + "/api/order/verify", { success, orderId });
        if (response.data.success) {
            navigate("/myorders"); 
        } else {
            navigate("/"); 
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='verify-screen'>
            <div className="spinner"></div> {}
            <p>Verifying your payment, please do not close the window...</p>
        </div>
    );
};

export default Verify;