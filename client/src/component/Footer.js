import React from 'react'
import { Container } from 'reactstrap'

const Footer = () => {
    return (
        <div className='footer'>
            <Container className='footer-contain'>
                <Container className='text-white'>
                    <p className='mt-5'>Contact No : <span>8738854495</span></p>
                    <p>Email: sandeepnandawar92@gmail.com</p>
                </Container>
                <Container className='text-white'>
                    <p className='mt-5 mx-5'>Address : Nagpur</p>
                    <p className='mx-5'>Email: ecommerceweb@gmail.com</p>
                    <p className='mx-5'>&#169;  ecommcercekart.com</p>
                </Container>
            </Container>
        </div>
    )
}

export default Footer
