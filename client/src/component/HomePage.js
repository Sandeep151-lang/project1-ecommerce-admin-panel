import React, { useContext, useState, useEffect } from 'react'
import { MyContext } from '../App';
import { Card, Button, CardText, Row, Col } from 'reactstrap';
import LoadingSpinners from './LoadingSpinners';
import axios from 'axios'
import Footer from './Footer';
//import { useHistory } from 'react-router-dom';

const HomePage = () => {
    // const history = useHistory();
    const context = useContext(MyContext);
    const pages = new Array(context.pageNumbers + 1).fill(null).map((v, i) => i)


    const load = context.loading;
    const [data, setdata] = useState([]);
    const userdata = async () => {
        try {
            const res = await axios.create({
//                 baseURL: "http://localhost:5000",
                withCredentials: true,
                credentials: "include",
            }).get('/about')

            if (res.status === 200) {
                localStorage.getItem('jwt');
                setdata(res.data.message);
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
            <div className='background-img'>

            </div>
            <div className='w3-container mt-5'>
                <div className="w3-card-4  container-fluid">
                    <Row>
                        {
                            context.data.map((product, key) => {
                                //destructuring the products 
                                const { product_image, product_price, product_name } = product;
                                return (
                                    <Col sm="3" key={key} className="py-3 ">
                                        <Card body style={{ 'height': '18rem' }}>
                                            <img src={product_image} className="card-img-top" alt=".." style={{ 'height': "6rem", }} />
                                            <CardText className="text-center mt-2" style={{ 'fontWeight': 'bolder' }}>{product_name}</CardText>
                                            {/* <CardText className="text-center " style={{ 'fontWeight': 'bold' }}>{product_description}</CardText> */}
                                            <CardText className="text-center bold text-bolder" style={{ 'color': '#c78d8d', 'fontWeight': 'bolder' }}>&#8377;{product_price}<span className="text-bolder">/-</span></CardText>
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
                <div className='pagination my-2'>

                    <button onClick={context.gotoPrevious} className='prv-button btn-primary btn'>Previous</button>
                    {pages.map((index, key) => (

                        <button key={key} onClick={() => context.setPageNumber(index)} className='btn-button btn-success btn mx-2'>{index + 1}</button>
                    ))}
                    <button onClick={context.gotoNext} className='next-button btn-primary btn'>Next</button>
                </div>

            </div>
            <Footer />
        </>
    }
}

export default HomePage
