import React from 'react'
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
const Newproduct = () => {

  let [prolist, updateprolist] = useState([])
  const productinfo = () => {
    let url = "http://localhost:1234/productlist?sellerid=" +localStorage.getItem("sellerid");
    fetch(url)
      .then((response) => response.json())
      .then((info) => {
        updateprolist(info)
      })
  }

  useEffect(() => {
    productinfo()
  }, [])


  let[proname, updateproname] = useState("")
  let[proprice, updateproprice] = useState("")
  let[prophoto, updateprophoto] = useState("")
  let[prodetails, updateprodetails] = useState("")
  let sellerid = localStorage.getItem("sellerid");

  const saveitems =()=>{
    let newdata = {
      name:proname, 
      price:proprice, 
      photo:prophoto, 
      details:prodetails,
      sellerid: sellerid,
    }
    let url ="http://localhost:1234/productlist?sellerid=" +localStorage.getItem("sellerid");
    let postdata ={
      headers :{"Content-Type":"application/json"},
      method:"POST",
      body:JSON.stringify(newdata)
    }
  
    fetch(url,postdata)
    .then((response)=>response.json())
    .then((addlist)=>{
      swal(proname,"Added Successfully", "success")
      productinfo()
    })

  }

  const del = async(id,name)=>{
    let url = "http://localhost:1234/productlist/"+id;
    let postdata ={
      method:'DELETE'
    }
    try {
     await fetch(url,postdata)
    .then((response)=>response.json())
    .then((remove)=>{
      productinfo()
      swal(name, " Deleted Successfully !", "success");
    })
    } catch (error) {
      swal("Error", " Deleting Successfully", "error");
    }
  }

  return (
    <div className='container'>
      <div className='row'>



        <div className='col-lg-4 p-4'>
          <div className='card-body border-0 shadow-lg p-3'>
            <h3 className=" text-center">Add New Product</h3>
            <div className="card-body">

              <div className="mb-3">
                <label className='form-label'>Product Name</label>
                <input className='form-control' type='text' onChange={obj=>updateproname(obj.target.value)}/>
              </div>

              <div className="mb-3">
                <label className='form-label'>Product Price</label>
                <input className='form-control' type='text' onChange={obj=>updateproprice(obj.target.value)} />
              </div>

              <div className="mb-3">
                <label className='form-label'>Product Photo</label>
                <input className='form-control' type='text' onChange={obj=>updateprophoto(obj.target.value)} />
              </div>

              <div className="mb-3">
                <label className='form-label'>Product Details</label>
                <input className='form-control' type='text' onChange={obj=>updateprodetails(obj.target.value)} />
              </div>
            </div>
            <div className="card-footer text-center ">
              <button className="btn btn-danger" onClick={saveitems}>Add Items</button>
            </div>
          </div>

        </div>

         <div className="col-lg-8 mt-4">
           <h2 className='text-center text-warning'>Available Products : {prolist.length} </h2>
             <table className="table table-bordered mt-3 table-hover">
               <thead>
                 <tr>
                  <th>Product Id</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Product Photo</th>
                  <th>Product Details</th>
            
                  <th>Action</th>
                 </tr>
               </thead>
               <tbody>
                {
                  prolist.map((item,index)=>{
                   return(
                    <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <img src={item.photo} width={50} height={40}/>
                    </td>
                    <td>{item.details}</td>
                    
                    <td className="text-center">
                      <i className="fa fa-trash  fa-2x text-danger" onClick={del.bind(
                        this,
                        item.id,
                        item.name
                        )} ></i>
                    </td>
                  </tr>
                   )
                  })
                }
               </tbody>
             </table>

         </div>
      </div>
    </div>




    
  )
}

export default Newproduct;
