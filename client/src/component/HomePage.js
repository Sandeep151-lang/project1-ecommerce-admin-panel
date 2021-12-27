import React, { useContext, useState, useEffect } from 'react'
import { MyContext } from '../App';
import { Card, Button, CardText, Row, Col } from 'reactstrap';
import LoadingSpinners from './LoadingSpinners';
import axios from 'axios'
//import { useHistory } from 'react-router-dom';

const HomePage = () => {
    // const history = useHistory();
    const context = useContext(MyContext);
    const load = context.loading;
    const [data, setdata] = useState([]);
    const userdata = async () => {
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
                // var len = res.data.message.cartItems.length
                // console.log(len)
                // console.log(`hello ${res.data.message.cartItems}`)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const login = () => {
        window.alert('please login')
    }
    useEffect(() => {
        userdata()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (load) {
        return <LoadingSpinners />
    } else {
        return <>
            <div className='w3-container mt-5'>
                <div className="w3-card-4  container-fluid">
                    <Row>
                        {
                            context.data.map((product, key) => {
                                //destructuring the products 
                                const { product_image, product_price, product_name } = product;
                                return (
                                    <Col sm="4" key={key} className="py-3 ">
                                        <Card body>
                                            <img src={product_image} className="card-img-top" alt=".." style={{ 'height': "200px" }} />
                                            <CardText className="text-center mt-2" style={{ 'fontWeight': 'bolder' }}>{product_name}</CardText>
                                            {/* <CardText className="text-center " style={{ 'fontWeight': 'bold' }}>{product_description}</CardText> */}
                                            <CardText className="text-center bold text-bolder" style={{ 'color': 'red', 'fontWeight': 'bolder', 'fontSize': '130%', }}>{product_price}<span className="text-bolder">/-&#8377;</span></CardText>
                                            {
                                                data.name ? <Button className={"btn my-2 mx-5 btn-success " + (context.cartItems.find((x) => x._id === product._id) ? "disabled" : "btn-success")} onClick={() => context.onAdd(product)}>Add to Cart</Button> : <Button className="btn my-4 mx-5 btn-success" onClick={login}>Add to Cart</Button>
                                            }
                                            {/* <Button className={"btn my-4 mx-5 btn-success " + (cartItems.find((x) => x.id === product.id) ? "disabled" : "btn-success")} onClick={() => onAdd(product)}>Add to Cart</Button> */}
                                            {/* <Button className={"btn my-4 mx-5 btn-success " + (context.cartItems.find((x) => x._id === product._id) ? "disabled" : "btn-success")} onClick={() => context.onAdd(product)}>Add to Cart</Button> */}
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
            </div>
        </>
    }
}

export default HomePage
