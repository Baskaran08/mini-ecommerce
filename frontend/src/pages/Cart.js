import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart({cartItems,setcartItems}){
    const [complete,setComplete]=useState(false)

    function increaseqty(item){
        if(item.product.stock==item.qty){
            return;
        }
        const updatedItems=cartItems.map((i)=>{
            if(i.product._id==item.product._id){
                i.qty++
            }
            return i;
        })
        setcartItems(updatedItems)
    }
    
    function decreaseqty(item){
        if(item.qty>1){
            const updatedItems=cartItems.map((i)=>{
                if(i.product._id==item.product._id){
                    i.qty--
                }
                return i;
            })
            setcartItems(updatedItems)
        }
    }

    function deleteItem(item){
        const updatedItems=cartItems.filter((i)=>{
            if(i.product._id!==item.product._id){
                return true;
            }
        })
        setcartItems(updatedItems)
    }

    function placeOrder(){
        fetch(process.env.REACT_APP_API_URL+'/order',{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(cartItems)
        }).then(()=>{
            setcartItems([]);
            setComplete(true);
            toast.success("Order Completed Successfully")
        })
    }

    return  cartItems.length>0?<Fragment>
                <div class="container container-fluid">
                <h2 class="mt-5">Your Cart: <b>{cartItems.length}</b></h2>
                
                <div class="row d-flex justify-content-between">
                    <div class="col-12 col-lg-8">
                        {cartItems.map((item)=>(
                                <Fragment>
                                        <hr />
                                        <div class="cart-item">
                                            <div class="row">
                                                <div class="col-4 col-lg-3">
                                                    <img src={item.product.images[0].image} alt={item.product.name} height="90" width="115" />
                                                </div>
            
                                                <div class="col-5 col-lg-3">
                                                    <Link to={'/product/'+item.product._id}>{item.product.name}</Link>
                                                </div>
            
            
                                                <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p id="card_item_price">${item.product.price}</p>
                                                </div>
            
                                                <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <div class="stockCounter d-inline">
                                                        <span class="btn btn-danger minus" onClick={()=>decreaseqty(item)}>-</span>
                                                        <input type="number" class="form-control count d-inline" value={item.qty} readOnly />
            
                                                        <span class="btn btn-primary plus" onClick={()=>increaseqty(item)}>+</span>
                                                    </div>
                                                </div>
            
                                                <div class="col-4 col-lg-1 mt-4 mt-lg-0">
                                                    <i id="delete_cart_item" class="fa fa-trash btn btn-danger" onClick={()=>deleteItem(item)}></i>
                                                </div>
            
                                            </div>
                                        </div>
                            </Fragment>
                        ))}
                        
                        
                    </div>

                    <div class="col-12 col-lg-3 my-4">
                        <div id="order_summary">
                            <h4>Order Summary</h4>
                            <hr />
                            <p>Subtotal:  <span class="order-summary-values">{cartItems.reduce((acc,item)=>(acc+item.qty),0)} (Units)</span></p>
                            <p>Est. total: <span class="order-summary-values">${cartItems.reduce((acc,item)=>(acc+item.product.price*item.qty),0)}</span></p>

                            <hr />
                            <button id="checkout_btn" class="btn btn-primary btn-block" onClick={placeOrder}>Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
                            </Fragment>:(!complete?<h2 className="mt-5">"Your Cart is Empty!"</h2>:<Fragment><h1>Order Complete!</h1><p>Your order has been placed successfully!!</p></Fragment>)
}