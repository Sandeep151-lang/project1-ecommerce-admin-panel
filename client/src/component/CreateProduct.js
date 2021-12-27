import React, { useState } from 'react'
import axios from 'axios';
import { Form, FormGroup, Label, Input } from 'reactstrap'
//import { useHistory } from 'react-router';

const Product = () => {

    const [selectedFile, setSelectedFile] = React.useState(null);
    const [product_name, setproduct_name] = useState();
    const [product_price, setproduct_price] = useState();
    const [product_description, setproduct_description] = useState();


    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("images", selectedFile);
        formData.append("product_name", product_name);
        formData.append("product_price", product_price);
        formData.append("product_description", product_description);
        setproduct_name("");
        setproduct_price("");
        setproduct_description("");

        // try {
        //     const url = `http://localhost:5000/product`
        //     await axios.post(url, formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     })
        // } catch (error) {
        //     console.log(error)
        // }
        const token = window.localStorage.getItem('jwt')
        try {
            const res = await axios.create({
                // baseURL: "http://localhost:5000",
                withCredentials: true,
                credentials: "include",
            }).post('/product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            })
            if (res.status === 201) {
                localStorage.getItem('jwt');
                window.alert('product created')

            }
        } catch (err) {

            window.alert(`error`)

        }
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }

    return (
        <div className="container">
            <h1 className="text-center">Create Product</h1>
            <Form inline className="mt-5 ml-5" onSubmit={handleSubmit}>
                <FormGroup className="mb-3 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">choose image</Label>
                    <Input type="file" name="images" onChange={handleFileSelect} />
                </FormGroup>
                <FormGroup className="mb-3 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">Product Name</Label>
                    <Input type="text" name="product_name" onChange={(e) => setproduct_name(e.target.value)} value={product_name} placeholder="product name" />
                </FormGroup>
                <FormGroup className="mb-3 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">Product Price</Label>
                    <Input type="text" name="product_price" onChange={(e) => setproduct_price(e.target.value)} value={product_price} placeholder="product price" />
                </FormGroup>
                <FormGroup className="mb-3 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Product description</Label>
                    <Input type="text" name="product_description" onChange={(e) => setproduct_description(e.target.value)} value={product_description} product="product description" />
                </FormGroup>

                <Input type="submit" className="btn btn-primary" />
            </Form >
        </div>
    )
}

export default Product

