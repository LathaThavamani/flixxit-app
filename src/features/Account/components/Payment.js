import React, { useEffect, useState } from 'react'
import "../../../styles/PlanSubscription.css"
import Header from '../../Dashboard/components/Header';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../../../data/hooks/useLoader';
import { useDispatch } from 'react-redux';
import { setUserProfile, updatePlanPaymentMethod } from '../../../data/userSlice';

export const Payment = () => {

    const [profile, setProfile] = useState({ ...JSON.parse(localStorage.getItem('userProfile')) })
    const [paymentMethod, setPaymentMethod] = useState(profile.paymentmethod)
    const { setLoaderSpinning, setShowSearch, setShowMenu, plan } = useLoader();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        setShowMenu(false);
        setShowSearch(false);
        if (!localStorage.getItem('token')) {
            navigate('/signin')
        }
    }, [])

    const updatePaymentMethod = (newVal) => {
        setPaymentMethod(newVal)
    }

    const handlePay = async () => {
        setLoaderSpinning(true);
        let obj = {};
        obj = profile;
        obj.plan = plan;
        obj.paymentmethod = paymentMethod;
        await dispatch(updatePlanPaymentMethod(obj))
        await dispatch(setUserProfile(obj));
        setLoaderSpinning(false);
        alert("Payment completed successfully");
        navigate('/account')

    }

    return (
        <>
            <Header black={true} />
            <div className='payment-container'>
                <img src="/images/lock.png" alt="secure" />
                <h3>Set up your payment</h3>
                <p> Your membership starts as soon as you set up payment </p>
                <h4>No commitments. Cancel online anytime.</h4>
                <div className={paymentMethod == 'Credit/Debit Card' ? 'payment-base payment-highlight' : 'payment-base'} onClick={() => updatePaymentMethod('Credit/Debit Card')}>
                    <p>Credit/Debit Card </p>
                    <div>
                        <img src="/images/visa.svg" alt="payment" />
                        <img src="/images/mastercard.svg" alt="payment" />
                    </div>
                </div>
                <div className={paymentMethod == 'Paypal' ? 'payment-base payment-highlight' : 'payment-base'} onClick={() => updatePaymentMethod('Paypal')}>
                    <p>Paypal </p>
                    <div>
                        <img src="/images/paypal.svg" alt="payment" />
                    </div>
                </div>
                <div className={paymentMethod == 'Google Pay/Apple Pay' ? 'payment-base payment-highlight' : 'payment-base'} onClick={() => updatePaymentMethod('Google Pay/Apple Pay')}>
                    <p>Google Pay/Apple Pay </p>
                    <div>
                        <img src="/images/googlepay.svg" alt="payment" />
                        <img src="/images/applepay.svg" alt="payment" />
                    </div>
                </div>
            </div >
            <div className='pay-button'>
                <button onClick={handlePay}>Pay</button>
            </div>

        </>
    )
}