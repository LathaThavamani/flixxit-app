import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from '../../../components/HomeFooter';

export const Layout = ({ children }) => {
    const [blackHeader, setBlackHeader] = useState(false);
    useEffect(() => {
        const scrollListener = () => {
            if (window.scrollY > 10) {
                setBlackHeader(true);
            } else {
                setBlackHeader(false);
            }
        }

        window.addEventListener('scroll', scrollListener);
        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, []);
    return (
        <>
            <Header black={blackHeader} />
            {children}
            <Footer />
        </>
    )
}