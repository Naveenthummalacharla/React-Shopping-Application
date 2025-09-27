import { useState, useEffect } from "react";
import swal from "sweetalert";

const Mycart = () => {
    let [allproduct, updateProduct] = useState([]);
    const getProduct = () => {
        fetch("http://localhost:1234/cartlist")
            .then(response => response.json())
            .then(productArray => {
                updateProduct(productArray);
            })
    }

    useEffect(() => {
        getProduct();
    }, [1]);

    const changeQty = async (product, action) => {
        if (action === "A")
            product["qty"] = product.qty + 1;
        if (action === "B")
            product["qty"] = product.qty - 1;

        if (product.qty <= 0) {
            delItem(product.id, product.name); // delete from cart api if qty is 0
        } else {
            let url = "http://localhost:1234/cartlist/" + product.id
            let postData = {
                headers: { 'Content-Type': 'application/json' },
                method: "PUT",
                body: JSON.stringify(product)
            };
            await fetch(url, postData)
                .then(response => response.json())
                .then(serverres => {
                    swal(product.name, " Quantity Updated in Cart !", "success");
                    getProduct();// reload the list with updated value
                })
                .catch(error => {
                    swal("Error", " While Updating Quantity", "error");
                })
        }
    }

    const delItem = async (id, name) => {
        let url = "http://localhost:1234/cartlist/" + id;
        let postData = { method: "DELETE" };
        await fetch(url, postData)
            .then(response => response.json())
            .then(emptyres => {
                swal(name, " Deleted from Cart !", "success");
                getProduct();// reload the list after delete
            }).catch(error => {
                swal("Error", " While Deleting From Cart", "error");
            })
    }

    let total = 0;

    let[fullname, pickname] = useState("");
    let[mobile, pickmobile] = useState("");
    let[email, pickemail] = useState("");
    let[address, pickadress] = useState("");

    //for validation

    let[nameError, updateNameError] = useState("");
    let[mobileError, updateMobileError] = useState("");
    let[emailError, updateEmailError] = useState("");
    let[addressError, updateAddressError] = useState("");

    const save =()=>{

       let formStatus = true;

       if(fullname == ""){
        formStatus = false
        updateNameError("Invalid Name !")
       }else{
        updateNameError("")
       }
     
       var mpattern = /^[0]?[6789]\d{9}$/; //firstenquiry.com website
       if(!mpattern.test(mobile)){
        formStatus = false
        updateMobileError("Invalid Mobile No !")
       }else{
        updateMobileError("")
       }
       
       let epatern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
       if(!epatern.test(email)){
        formStatus = false
        updateEmailError("Invalid e-Mail Id!")
       }else{
        updateEmailError("")
       }

       if(address == ""){
        formStatus = false
        updateAddressError("Invalid Delivery Address!")
       }else{
        updateAddressError("")
       }

      if(allproduct.length == 0){
        formStatus = false
      }

     if(formStatus === true){
        
       let orderdata = {
        custometname:fullname,
         mobile:mobile, 
         email:email, 
         address:address,
         itemlist:allproduct,
         
        }

        let url = "http://localhost:1234/orderlist";
        let postData = {
            headers : {"Content-Type":"application/json"},
            method : "POST",
            body : JSON.stringify(orderdata)
        }
           
        
            fetch(url,postData)
            .then((response)=>response.json())
            .then((severRes)=>{
                swal("Order Id :" + severRes.id, "Received Successfully....!", "success" )
            })
        }else{
            swal("Input Error", "Please Enter Customer Details", "warning")
        }
    }

    return (
        <div className="container mt-4">

            <div className="row">
             
             
                    <div className=" col-lg-4 pt-5">
                    <div className="card border-0 shadow-lg">
                        <div className="card header bg-primary text-white text-center p-3 rounded-0">Enter Customer  Details</div>
                        <div className="card-body">

                            <div className="mb-3">
                                <label> Customer Name</label>
                                <input type="text" className="form-control"
                                onChange={obj=>pickname(obj.target.value)}/>
                                <small className="text-danger">{nameError}</small>
                            </div>

                            <div className="mb-3">
                                <label> Mobile No</label>
                                <input type="number" className="form-control"
                                     onChange={obj=>pickmobile(obj.target.value)}/>
                                 <small className="text-danger">{mobileError}</small>
                            </div>

                            <div className="mb-3">
                                <label> e-Mail Id</label>
                                <input type="email" className="form-control"
                                     onChange={obj=>pickemail(obj.target.value)}/>
                                <small className="text-danger">{emailError}</small>
                            </div>

                            <div className="mb-3">
                                <label>Delivery Adress</label>
                                <textarea type="text" className="form-control"
                                     onChange={obj=>pickadress(obj.target.value)}/>
                                <small className="text-danger">{addressError}</small>
                            </div>

                            <div className="card-footer text-center">
                               <button className="btn btn-danger" onClick={save}>Place Order</button>
                            </div>
                        </div>

                    </div>
                    </div>
               


                    <div className="col-lg-8">

                    <h3 className="text-center">
                        Items in Cart : {allproduct.length}
                    </h3>
                    <table className="table table-bordered text-center">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Photo</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allproduct.map((product, index) => {
                                    total = total + (product.price * product.qty);
                                    return (
                                        <tr key={index}>
                                            <td> {product.name} </td>
                                            <td> {product.price}.Rs </td>

                                            
                                            <td className="input-group">
                                                <button className="btn btn-info btn-sm"
                                                    onClick={changeQty.bind(this, product, "A")}>
                                                    <i className="fa fa-plus"></i>
                                                </button>

                                                <input type="text"
                                                    value={product.qty}
                                                    readOnly
                                                    size="1"
                                                    className="text-center border-0" />

                                                <button className="btn btn-warning btn-sm"
                                                    onClick={changeQty.bind(this, product, "B")}>
                                                    <i className="fa fa-minus"></i>
                                                </button>
                                             </td>
                                        

                                            <td> {product.qty * product.price}.Rs </td>
                                            <td> <img src={product.photo} height="40" width="50" /> </td>
                                            <td className="text-center">
                                                <i className="fa fa-trash fa-2x text-danger"
                                                    onClick={delItem.bind(this, product.id, product.name)}></i>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td colSpan={4} className="text-end">
                                   Rs. {total}
                                </td>
                                <td colSpan={2}>Total Amount</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Mycart;