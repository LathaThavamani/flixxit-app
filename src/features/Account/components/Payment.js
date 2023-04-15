import React, { useEffect, useState } from 'react'
import "../../../styles/PlanSubscription.css"
import Header from '../../Dashboard/components/Header';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../../../data/hooks/useLoader';

export const Payment = () => {
    const [plan, setPlan] = useState(4)
    const { setShowSearch, setShowMenu } = useLoader();
    const navigate = useNavigate()

    useEffect(() => {
        setShowMenu(false);
        setShowSearch(false);
        if (!localStorage.getItem('token')) {
            navigate('/signin')
        }
    }, [])

    const handlePay = () => {

    }

    return (
        <>
            <Header black={true} />
            <div className='payment-container'>
                <img src="/images/lock.png" alt="secure" />
                <h3>Set up your payment</h3>
                <p> Your membership starts as soon as you set up payment </p>
                <h4>No commitments. Cancel online anytime.</h4>
                <div className='payment-base'>
                    <p>Credit or Debit Card </p>
                    <div>
                        <img src="/images/visa.svg" alt="payment" />
                        <img src="/images/mastercard.svg" alt="payment" />
                    </div>
                </div>
                <div className='payment-base'>
                    <p>Paypal </p>
                    <div>
                        <img src="/images/paypal.svg" alt="payment" />
                    </div>
                </div>
                <div className='payment-base'>
                    <p>Google Pay/Apple Pay </p>
                    <div>
                        <img src="/images/googlepay.svg" alt="payment" />
                        <img src="/images/applepay.svg" alt="payment" />
                    </div>
                </div>
            </div>
            <div className='pay-button'>
                <button onClick={handlePay}>Pay</button>
            </div>

        </>
    )
}