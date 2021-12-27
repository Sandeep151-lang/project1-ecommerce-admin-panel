import axios from 'axios';
import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { useHistory } from 'react-router-dom';

import { Button } from 'reactstrap';


const Stripe = (props) => {
    const { total, name, email, cart, id } = props;
    const history = useHistory();
    const login = () => {
        history.push('/login')
        window.alert('please login to buy')
    }

    const handleToken = async (token) => {
        console.log(token)
        try {
            await axios.post(`/payment`, {
                token: token.id,
                total,
                cart,
                name,
                email,
                id,
                address: token.card
            });
            window.alert('order successfull')
        } catch (error) {
            console.log(error);
            window.alert('order not success')
        }
    }

    if (name) {
        return (
            <StripeCheckout
                email={email}
                name={name}
                amount={total * 100}
                currency="INR"
                token={handleToken}
                shippingAddress
                stripeKey="pk_test_51K1p90SJsqVvBs7npny7nMtvteAWloxVwaITgnSKRh3gTXqoRHWThem1HW7bQpl0ldekn1jJJJJZU6cEjm6SANfw00EdhkkMey"
            >
                <Button className="btn btn-danger">Buy</Button>
            </StripeCheckout>
        )
    } else {
        return <Button className="btn btn-danger" onClick={login} style={{ 'width': '50px' }}> Buy</Button>
    }

}

export default Stripe
