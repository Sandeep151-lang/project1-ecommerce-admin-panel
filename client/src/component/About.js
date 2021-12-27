import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router'
import { Card } from 'reactstrap'
import LoadingSpinners from './LoadingSpinners';


const About = () => {
    const [loading, setloading] = useState(true);
    const history = useHistory();
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
                // console.log(res.data)
                setloading(false);
            }
        } catch (err) {
            history.push('/login')
            window.alert(`please login`)
        }
    }
    useEffect(() => {

        userdata()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (loading) {
        return <LoadingSpinners />
    } else {
        return (
            <div>
                <h1 className="text-center">User Details</h1>

                <div className="container mt-5" style={{ "width": "80%", "height": "70%" }}>
                    <Card>
                        <p className="font-weight-bold py-2 mx-3"><span style={{ 'fontWeight': 'bold', 'fontSize': '25px' }}>Name :</span> <span className="text-center text-dark" style={{ 'fontSize': '19px' }}>{data.name}</span></p>
                        <p className="font-weight-bold py-2 mx-3"><span style={{ 'fontWeight': 'bold', 'fontSize': '25px' }}>Email_id :</span> <span className="text-dark" style={{ 'fontSize': '19px' }}>{data.email}</span></p>
                        <p className="font-weight-bold py-2 mx-3"><span style={{ 'fontWeight': 'bold', 'fontSize': '25px' }}>Role : </span><span className="text-dark" style={{ 'fontSize': '19px' }}>{data.role}</span></p>
                    </Card>
                </div>
            </div>
        )
    }
}

export default About
