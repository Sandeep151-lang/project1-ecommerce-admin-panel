import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const Order = () => {
    const hist = useHistory()
    const [data, setdata] = useState([])
    //const token = window.localStorage.getItem('jwt')
    const history = async () => {
        try {
            const res = await axios.create({
                // baseURL: "http://localhost:5000",
                withCredentials: true,
                credentials: "include",
            }).get('/getdetails')
            // console.log(res.data.message)
            if (res.status === 200) {
                localStorage.getItem('jwt');
                setdata(res.data.message);
            }
        } catch (err) {
            hist.push('/login')
            window.alert(`please login`)
        }
    }

    useEffect(() => {
        history()
        // eslint-disable-next-line
    }, [])
    return <>
        <h1 className='text-center'>Order Details</h1>
        <div>
            <div className="container">
                <Row>
                    {
                        data.map((product, key) => {

                            return (
                                <Col sm="4" key={key} className="py-3 ">
                                    <div className="card mb-3" style={{ 'maxWidth': '700px' }}>
                                        <div className="row g-0">
                                            <div className="col-md-4 ">
                                                {
                                                    product.cartItems.map((item, key) => {
                                                        return (
                                                            <div className="card m-2" style={{ 'maxWidth': '700px' }} key={key}>
                                                                <img src={item.product_image} className="card-img-top" alt="..." />
                                                                <div className="card-body">
                                                                    <p className="card-title" style={{ 'fontSize': '12px' }}>{item.product_price}/- &#8377;</p>
                                                                    <p className="card-text" style={{ 'fontSize': '12px' }}>{item.product_name}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title" >Total- <span style={{ 'color': 'red' }}>{product.total} -/Rs</span> </h5>
                                                    <p className="card-text" >status:- <small className="text-muted">{product.status}</small></p>
                                                    <p className="card-text"></p>
                                                    <p><span style={{ 'fontWeight': 'bold' }}>Country:- </span>{product.shippingAddress.country}</p>
                                                    <p><span style={{ 'fontWeight': 'bold' }}>City:- </span>{product.shippingAddress.city}</p>
                                                    <p><span style={{ 'fontWeight': 'bold' }}>Address:-  </span>{product.shippingAddress.address}</p>
                                                    <p><span style={{ 'fontWeight': 'bold' }}>Pincode:- </span>{product.shippingAddress.pincode}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        </div>
    </>
}

export default Order

