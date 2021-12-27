import React, { useContext, useState, useEffect } from 'react'
import { MyContext } from '../App';
import { Button, Row, Col } from 'reactstrap';
import Stripe from './Stripe';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Cart = () => {
    const [data, setdata] = useState([]);
    const userdata = async () => {
        // const token = window.localStorage.getItem('jwt')
        try {

            const res = await axios.create({
                // baseURL: "http://localhost:5000",
                withCredentials: true,
                credentials: "include",
            }).get('/about')
            // console.log(res.data.message)
            if (res.status === 200) {
                localStorage.getItem('jwt');
                setdata(res.data.message);
                console.log(res.data)

            }
        } catch (err) {

            console.log(err)
        }
    }
    useEffect(() => {

        userdata()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const context = useContext(MyContext);
    // console.log({ message: context.cartItems });
    const p = { message: context.cartItems };
    const ar = p.message.map((product) => product.product_price);
    if (ar.length > 0) {
        var price = ar.reduce((a, c) => a + c);
        //console.log(`price is ${price}`);
    } else {
        var c = 0;
        console.log(c)
    }


    if (ar.length > 0) {
        return <>
            <div>
                <div className="container mt-5">
                    <Row >
                        <Col xs="8">
                            {
                                context.cartItems.map((product, key) => {
                                    //destructuring the products 
                                    const { product_image, product_price, product_name, product_description } = product;
                                    return (
                                        <div className="card mb-3" style={{ 'max-width': '600px' }}>
                                            <div className="row g-0">
                                                <div className="col-md-4">
                                                    <img src={product_image} className="img-fluid rounded-start" alt="..." style={{ 'height': '200px' }} />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{product_name}</h5>
                                                        <p className="card-text">{product_description}</p>
                                                        <p className="card-text"><small className="text-muted">{product_price} /- &#8377;</small></p>
                                                        <p className="card-text">  <Button className="btn btn-success" onClick={() => context.onRemove(product)}>Remove from Cart</Button></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Col>
                        <Col xs="4">
                            <h3 className='mt-5'>Total price is <span style={{ 'color': 'red' }}> {price}/-&#8377;</span></h3>
                            <Stripe total={price}
                                name={data.name}
                                email={data.email}
                                cart={context.cartItems}
                                id={data._id}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    } else {
        return (
            <div>
                {/* <h1 className="text-center " style={{ 'margin': '18%' }}>  YOUR CART IS EMPTY</h1> */}
                <NavLink to='/'><h1 style={{ 'position': 'absolute', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%,-262%)', 'color': 'black', 'fontSize': '29.5px' }}>Shop Now</h1></NavLink>
                <NavLink to='/'><i className="fas fa-shopping-cart" style={{ 'fontSize': '100px', 'position': 'absolute', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%,-50%)', 'color': '#ff2f00d6' }}></i></NavLink>

            </div>
        )
    }

}

export default Cart
