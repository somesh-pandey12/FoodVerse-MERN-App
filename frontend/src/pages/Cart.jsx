// File Location: frontend/src/pages/Cart/Cart.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
    const navigate = useNavigate();

    const styles = {
        container: { margin: '80px auto', maxWidth: '1000px', padding: '0 20px', fontFamily: 'Outfit, sans-serif' },
        row: { display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr 1fr', alignItems: 'center', color: 'gray', fontSize: 'max(1vw, 12px)', padding: '10px 0', borderBottom: '1px solid #e2e2e2' },
        itemRow: { display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr 1fr', alignItems: 'center', fontSize: '14px', padding: '15px 0', borderBottom: '1px solid #e2e2e2', color: 'black' },
        img: { width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' },
        remove: { cursor: 'pointer', color: 'red', fontWeight: 'bold' },
        bottom: { marginTop: '80px', display: 'flex', justifyContent: 'space-between', gap: 'max(12vw, 20px)' },
        totalBlock: { flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' },
        totalRow: { display: 'flex', justifyContent: 'space-between', color: '#555' },
        btn: { border: 'none', color: 'white', backgroundColor: '#ff4321', width: 'max(15vw, 200px)', padding: '12px 0', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }
    };

    return (
        <div style={styles.container}>
            <div style={styles.row}>
                <b>Items</b><b>Title</b><b>Price</b><b>Quantity</b><b>Total</b><b>Remove</b>
            </div>
            {food_list.map((item, index) => {
                if (cartItems[item._id] > 0) {
                    return (
                        <div key={index} style={styles.itemRow}>
                            <img src={item.image} alt="" style={styles.img} />
                            <p>{item.name}</p>
                            <p>₹{item.price}</p>
                            <p>{cartItems[item._id]}</p>
                            <p>₹{item.price * cartItems[item._id]}</p>
                            <p onClick={() => removeFromCart(item._id)} style={styles.remove}>X</p>
                        </div>
                    );
                }
                return null;
            })}

            <div style={styles.bottom}>
                <div style={styles.totalBlock}>
                    <h2>Cart Totals</h2>
                    <div>
                        <div style={styles.totalRow}><p>Subtotal</p><p>₹{getTotalCartAmount()}</p></div>
                        <hr/>
                        <div style={styles.totalRow}><p>Delivery Fee</p><p>₹{getTotalCartAmount() === 0 ? 0 : 40}</p></div>
                        <hr/>
                        <div style={{...styles.totalRow, fontWeight: 'bold', color: 'black'}}><p>Total</p><p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</p></div>
                    </div>
                    <button onClick={() => navigate('/order')} style={styles.btn}>PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;