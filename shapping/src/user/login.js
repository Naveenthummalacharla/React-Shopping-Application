import React from 'react'
import { useState } from 'react';
import swal from 'sweetalert';

const Mylogin = () => {
    let[username, pickUsername] = useState("");
    let[password, pickpassword] = useState("");
    let[msg, updatemsg] = useState("Enter Your Login Details")

    const Login =()=>{
       let url = "http://localhost:1234/account?email="+username+ "&password="+password;
       if(username==""|| password==""){
        updatemsg("Empty Email or Password")
       }else{
        updatemsg("Please wait processing....")
        fetch(url)
       .then((response)=>response.json())
       .then((userinfo)=>{
        if(userinfo.length == 0){
            swal("Error", "invalid or Not Exist","warning")

        }else{
            localStorage.setItem("sellerid", userinfo[0].id);
            localStorage.setItem("fullname", userinfo[0].fullname);
            window.location.href ="http://localhost:3001/#/";
            window.location.reload(); // Reload the page after login is success
        }
       })
       }
       
       
    }
  return (
    <div className='container mt-5'>
        <div className='row'>
            <div className='col-lg-4'></div>
            <div className='col-lg-4'>
                <div className='border p-4 rounded shadow-sm'>
                    <h3 className='text-center'>Seller Login</h3>
                    <p className='mt-3 text-center text-danger'>{msg}</p>
                    <div className='mb-4'>
                        <label>e-Mail Id</label>
                        <input type="text" className='form-control'
                        onChange={obj=>pickUsername(obj.target.value)}/>

                    </div>

                    <div className='mb-4'>
                        <label>Password</label>
                        <input type="password" className='form-control'
                         onChange={obj=>pickpassword(obj.target.value)}/>

                    </div>
                    <div className='text-center'>
                        <button className='btn btn-danger' onClick={Login}>Login</button>
                    </div>

                </div>

            </div>
            <div className='col-lg-4'></div>

        </div>
      
    </div>
  )
}

export default Mylogin;
