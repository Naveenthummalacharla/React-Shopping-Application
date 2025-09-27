
import React from 'react'
import { useState, useEffect } from 'react';
import swal from 'sweetalert';

const Myregister = () => {

  let[name,pickname] = useState("");
  let[mobile,pickmobile] = useState("");
  let[email,pickemail] = useState("");
  let[password,pickpassword] = useState("");
  let[address,pickaddress] = useState("");
  let[pincode,pickpincode] = useState("");

  const save =()=>{
    let newdata ={
      fullname:name, 
      mobileno:mobile, 
      email:email, 
      password:password, 
      address:address,
      pincode:pincode
    }
    let url = "http://localhost:1234/account"
    let postdata={
      headers : {"Content-Type":"application/json"},
      method :"POST",
      body : JSON.stringify(newdata)
    }
    fetch(url,postdata)
    .then((response)=>response.json())
    .then((acountdata)=>{
     swal(name, "Successfully Created Acount", "success")
     window.location.href ="#/login";
    })
  }
 
 

  return (
    <div>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-lg-3'></div>

          <div className='col-lg-6'>
            <div className='p-2 shadow-lg rounded'>
              <h2 className='text-center mb-4 text-primary'> Create New Account</h2>
            
              
             <div className='row justify-content-center'>
              <div className='col-lg-10 text-align-center'>

              <div class="mb-4">
                <label  className="form-label text-center">Enter Full Name</label>
                <input type="text" className="form-control" placeholder="Enter full name"
                onChange={obj=>pickname(obj.target.value)} />
              </div>

              <div class="mb-4">
                <label  className="form-label">Enter Mobile NO </label>
                <input type="number" className="form-control" placeholder="91+ Enter Mobile Number" 
                 onChange={obj=>pickmobile(obj.target.value)}/>
              </div>

              <div class="mb-4">
                <label  className="form-label">Enter Email </label>
                <input type="mail" className="form-control" placeholder="Enter Mail Id"
                 onChange={obj=>pickemail(obj.target.value)} />
              </div>

              <div class="mb-4">
                <label  className="form-label">Enter Password </label>
                <input type="password" className="form-control" placeholder="Enter password"
                 onChange={obj=>pickpassword(obj.target.value)} />
              </div>

              <div class="mb-4">
                <label  className="form-label">Enter Address </label>
                <textarea type="text" className="form-control" placeholder="Enter Adress"
                 onChange={obj=>pickaddress(obj.target.value)} />
              </div>

              <div class="mb-4">
                <label  className="form-label">Enter Your Pincode </label>
                <input type="text" className="form-control" placeholder="Enter Pincode"
                 onChange={obj=>pickpincode(obj.target.value)} />
              </div>
               
               <p className='text-center'>
              <button className='btn btn-success' onClick={save}>Create Account</button>
              </p>
              </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Myregister;
