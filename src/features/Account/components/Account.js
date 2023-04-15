import React, { useEffect, useState } from 'react';
import { useLoader } from '../../../data/hooks/useLoader';
import Header from '../../Dashboard/components/Header';
import Footer from '../../../components/HomeFooter';
import "../../../styles/Account.css";
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const { setLoaderSpinning, setShowSearch, setShowMenu } = useLoader();
    const [profile, setProfile] = useState({ ...JSON.parse(localStorage.getItem('userProfile')) })
    const navigate = useNavigate()

    useEffect(() => {
        setShowMenu(false);
        setShowSearch(false);
        if (!localStorage.getItem('token')) {
            navigate('/signin')
        }
    }, [])

    const handlePlanSub = async () => {
        navigate('/plansubscription')
    }


    return (
        <>
            <Header black={true} />
            <div className='account-container'>
                <h1 className="account-header">Account</h1>
                <div className="horizontal-line"></div>
                <div className="account-content">
                    <div className="account-section">
                        <div>
                            <h2 className="account-section-heading">User Details</h2>
                        </div>
                        <div className="account-section-content">
                            <div className="account-section-detail"> Email : {profile.useremail}</div>
                            <div className="account-section-detail"> Name : {profile.username}</div>
                            <div className="account-section-detail account-section-item-disabled">Password : ********</div>
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="account-section">
                        <div>
                            <h2 className="account-section-heading">PLAN DETAILS</h2>
                        </div>
                        <div className="account-section-content">
                            <div className="account-section-detail">Premium</div>
                            <div class="account-section-plan" onClick={handlePlanSub} style={{ cursor: 'pointer' }}>Payment & Subscription</div>
                        </div>
                    </div>


                </div>
            </div >

            <Footer />
        </>
    )
}

export default Account