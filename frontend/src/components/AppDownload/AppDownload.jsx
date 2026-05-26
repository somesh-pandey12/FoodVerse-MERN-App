// File Location: frontend/src/components/AppDownload/AppDownload.jsx
import React from 'react'

const AppDownload = () => {
    // Quick inline styling so you don't need a separate CSS file today
    const styles = {
        container: {
            margin: '100px auto',
            textAlign: 'center',
            fontSize: 'max(3vw, 20px)',
            fontWeight: '500',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px'
        },
        platforms: {
            display: 'flex',
            justifyContent: 'center',
            gap: 'max(2vw, 10px)',
            marginTop: '10px'
        },
        badge: {
            width: 'max(12vw, 120px)',
            maxWidth: '180px',
            cursor: 'pointer',
            transition: '0.3s',
            border: '2px solid #ccc',
            borderRadius: '10px',
            padding: '10px',
            backgroundColor: '#fff',
            fontWeight: 'bold',
            fontSize: '16px'
        }
    };

    return (
        <div className='app-download' id='app-download' style={styles.container}>
            <p>For Better Experience Download <br />Tomato App</p>
            <div style={styles.platforms}>
                {/* Agar images nahi hain, toh text buttons mock downloaders ka kaam karenge */}
                <button style={styles.badge}>🤖 Google Play</button>
                <button style={styles.badge}>🍏 App Store</button>
            </div>
        </div>
    )
}

export default AppDownload