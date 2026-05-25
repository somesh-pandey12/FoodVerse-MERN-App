import { useState, useContext } from 'react';
import './LoginPopup.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        try {
            const response = await axios.post(url + "/api/user/register", data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
                alert(`${currState} Successful!`);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Auth Error:", error);
            alert("Authentication failed! Server check karo.");
        }
    };

    return (
        <div className='login-popup' style={{
            position: 'fixed', zIndex: 1000, width: '100%', height: '100%',
            backgroundColor: '#00000090', display: 'flex', justifyContent: 'center', alignItems: 'center', top: 0, left: 0
        }}>
            <form onSubmit={onLogin} className="login-popup-container" style={{
                placeSelf: 'center', width: 'max(23vw, 330px)', color: '#808080',
                backgroundColor: 'white', display: 'flex', flexDirection: 'column', gap: '25px',
                padding: '25px 30px', borderRadius: '8px', fontSize: '14px', boxShadow: '0px 4px 15px rgba(0,0,0,0.2)'
            }}>
                <div className="login-popup-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'black' }}>
                    <h2 style={{ fontWeight: '600', fontSize: '20px', margin: 0 }}>{currState}</h2>
                    <span onClick={() => setShowLogin(false)} style={{ cursor: 'pointer', fontSize: '22px', fontWeight: 'bold', color: '#ff4321' }}>×</span>
                </div>

                <div className="login-popup-inputs" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {currState === "Login" ? null : 
                        <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required style={{ outline: 'none', border: '1px solid #c9c9c9', padding: '10px', borderRadius: '4px' }} />
                    }
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required style={{ outline: 'none', border: '1px solid #c9c9c9', padding: '10px', borderRadius: '4px' }} />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required style={{ outline: 'none', border: '1px solid #c9c9c9', padding: '10px', borderRadius: '4px' }} />
                </div>

                <button type='submit' style={{ border: 'none', padding: '12px', borderRadius: '4px', color: 'white', backgroundColor: '#ff4321', fontSize: '15px', cursor: 'pointer', fontWeight: '500' }}>
                    {currState === "Sign Up" ? "Create account" : "Login"}
                </button>

                <div className="login-popup-condition" style={{ display: 'flex', alignItems: 'start', gap: '8px', marginTop: '-15px' }}>
                    <input type="checkbox" required style={{ marginTop: '3px' }} />
                    <p style={{ margin: 0 }}>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                {currState === "Login"
                    ? <p style={{ margin: 0 }}>Create a new account? <span onClick={() => setCurrState("Sign Up")} style={{ color: '#ff4321', fontWeight: '500', cursor: 'pointer' }}>Click here</span></p>
                    : <p style={{ margin: 0 }}>Already have an account? <span onClick={() => setCurrState("Login")} style={{ color: '#ff4321', fontWeight: '500', cursor: 'pointer' }}>Login here</span></p>
                }
            </form>
        </div>
    );
};

export default LoginPopup;