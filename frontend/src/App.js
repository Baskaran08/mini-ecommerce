import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import ProductDetails from './pages/ProductDetails';
import { useState } from 'react';
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Cart from './pages/Cart';

function App() {
    const [cartItems,setcartItems]=useState([])
    return (
        <div className="App">
            <BrowserRouter>
                <div>
                    <ToastContainer theme='dark' position='top-center'/>
                    <Header cartItems={cartItems}/>
                        <Routes>
                            <Route path='/' element={<Home />}/>
                            <Route path='/search' element={<Home />}/>
                            <Route path='/product/:id' element={<ProductDetails cartItems={cartItems} setcartItems={setcartItems} />}/>
                            <Route path='/cart' element={<Cart cartItems={cartItems} setcartItems={setcartItems} />}/>
                        </Routes>

                </div>
            </BrowserRouter>
            <Footer/>
        </div>
    );
    }

export default App;
