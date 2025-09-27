import React from 'react'
import { useState,useEffect } from 'react';
const Order = () => {
    let[orderlist,updateorder] = useState([]);
    const getorder = ()=>{
    
        fetch( "http://localhost:1234/orderlist")
        .then((response)=>response.json())
        .then((orderArray)=>{
             updateorder(orderArray)
        })
    }

    useEffect(()=>{
        getorder()
    },[1]);
  return (
    <div className='container mt-5'>
        <div className='row'>
            <div className='col-lg-12 text-center'>
                <h1 className='text-primary'><i className="fa fa-phone text-primary"></i>Recent Order List : {orderlist.length}</h1>

            </div>
        </div>
       {
        orderlist.map((order,index)=>{
            return(
                <div className='row mb-5 p-4 shadow-lg' key={index} >
                    <div className='col-lg-3 text-primary'>Customer Name : <b>{order.custometname}</b> </div>
                    <div className='col-lg-3 text-danger'>Mobile No : {order.mobile}</div>
                    <div className='col-lg-3 text-warning'>e-Mail : {order.email}</div>
                    <div className='col-lg-3 text-success'>Deliver To : {order.address}</div>

                    <div className='col-lg-12 mt-5 '>
                        <table className='table table-bordered table-hover'>
                            <thead>
                                <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Photo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    order.itemlist.map((item,index)=>{
                                        if(localStorage.getItem("sellerid") == item.sellerid)
                                        {
                                       return(
                                        <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.price}</td>
                                        <td>{item.qty * item.price}</td>
                                        <td>
                                            <img src={item.photo} height={30} width={50}/>
                                        </td>
                                         
                                    </tr>
                                       )
                                       }
                                    })
                                }

                            </tbody>

                        </table>
                    </div>
                </div>
            )
        })
       }
    </div>
  )
}

export default Order;
