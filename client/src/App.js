import React, { useState, useEffect, useReducer } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import HomePage from './component/HomePage'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Register from './component/Register';
import Login from './component/Login';
// import CreaProduct from './component/CreateProduct';
import Navs from './component/Navs';
import About from './component/About';
import Cart from './component/Cart';
import Logout from './component/Logout';
import Order from './component/Order';
import { initialState, reducer } from './reducer/reducer';
import MyOrder from './component/MyOrder';
import UserOrder from './component/UserOrder';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'







export const MyContext = React.createContext();


const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const carts = JSON.parse(localStorage.getItem('cart') || "[]")
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState([]);
  const [cartItems, setCartItems] = useState(carts);
  const [pageNumbers, setPageNumber] = useState(0);
  const [numberofPages, setnumberofPages] = useState(0)





  const onAdd = async (product) => {
    setCartItems([...cartItems, product])
  }

  const url = `/getproduct?page=${pageNumbers}`;
  const userdata = async () => {
    const token = window.localStorage.getItem('jwt')
    try {
      const res = await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } });
      if (res.status === 200) {
        setdata(res.data.message);
        setnumberofPages(res.data.totalPages);

        setloading(false);
      }
    } catch (err) {
      window.alert(`error`)
    }
  }

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumbers - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberofPages - 1, pageNumbers + 1));
  };

  const onRemove = async (product) => {
    setCartItems(cartItems.filter((x) => x._id !== product._id))
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    userdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumbers])

  // const token = window.localStorage.getItem('jwt')
  return <>
    <Router>
      <MyContext.Provider value={{ userdata, onRemove, onAdd, data, cartItems, loading, state, dispatch, gotoNext, gotoPrevious, setPageNumber, pageNumbers }}>
        <Navs />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path="/about" component={About} />
          <Route path="/cart" component={Cart} />
          <Route path="/logout" component={Logout} />
          <Route path="/product/:_id" component={Order} />
          <Route path='/my-order' component={MyOrder} />
          <Route path='/user/:_id' component={UserOrder} />

          <Redirect to="/" />
        </Switch>
      </MyContext.Provider>
    </Router>
  </>
}

export default App
