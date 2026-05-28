// File Location: frontend/src/components/Footer/Footer.jsx
import React from 'react';

const Footer = () => {
    // Elegant Dark Theme Styles for modern full-stack footer
    const styles = {
        footer: {
            backgroundColor: '#323232',
            color: '#d9d9d9',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            padding: '80px 8vw 20px 8vw',
            marginTop: '100px',
            fontFamily: 'Outfit, sans-serif'
        },
        content: {
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gap: '80px'
        },
        left: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '20px'
        },
        logo: {
            color: '#ff4321',
            fontSize: '32px',
            fontWeight: 'bold',
            margin: '0'
        },
        text: {
            fontSize: '14px',
            lineHeight: '22px',
            textAlign: 'left'
        },
        center: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '20px'
        },
        right: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '20px'
        },
        heading: {
            color: 'white',
            fontSize: '20px',
            fontWeight: '600',
            margin: '0'
        },
        list: {
            listStyle: 'none',
            padding: '0',
            margin: '0',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            cursor: 'pointer',
            fontSize: '14px'
        },
        hr: {
            width: '100%',
            height: '2px',
            margin: '20px 0',
            backgroundColor: 'gray',
            border: 'none'
        },
        copyright: {
            fontSize: '14px',
            textAlign: 'center',
            color: '#a9a9a9'
        }
    };

    return (
        <div style={styles.footer} id='footer'>
            <div style={styles.content}>
                
                {/* Left Section - Brand Info */}
                <div style={styles.left}>
                    <h2 style={styles.logo}>FoodVerse</h2>
                    <p style={styles.text}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>

                {/* Center Section - Quick Company Navigation */}
                <div style={styles.center}>
                    <h2 style={styles.heading}>COMPANY</h2>
                    <ul style={styles.list}>
                        <li onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                {/* Right Section - Contact Grid */}
                <div style={styles.right}>
                    <h2 style={styles.heading}>GET IN TOUCH</h2>
                    <ul style={styles.list}>
                        <li>+1-212-456-7890</li>
                        <li>contact@foodverse.com</li>
                    </ul>
                </div>

            </div>

            <hr style={styles.hr} />
            
            {/* Copyright block */}
            <p style={styles.copyright}>
                Copyright 2026 © FoodVerse.com - All Rights Reserved.
            </p>
        </div>
    );
};

export default Footer;