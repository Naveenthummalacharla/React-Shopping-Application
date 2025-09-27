import { useState, useEffect } from "react";
import swal from "sweetalert";




const Myhome = () => {
    let [allproduct, updateProduct] = useState([]);

    const getProduct = () => {
        fetch("http://localhost:1234/productlist")
            .then(response => response.json())
            .then(productArray => {
                updateProduct(productArray.reverse());
            })
    }

    useEffect(() => {
        getProduct();
    }, [1]);

    const addtoCart = async (productinfo) => {
        productinfo["qty"] = 1;
        let url = "http://localhost:1234/cartlist";
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(productinfo)
        };

        await fetch(url, postData)
            .then(response => response.json())
            .then(serverres => {
                swal(productinfo.name, " Added in your cart ..", "success");
            })
            .catch(err => {
                swal(productinfo.name, " Already Exist in your cart ..", "error");
            })
    }

    let [keyword, updatekeyword] = useState("");// search bar




    return (
        <section>

            <div id="banner"></div>

            <div className="container mt-4">

                <div className="row mb-4">

                    <div className="col-lg-4"></div>

                    <div className="col-lg-4">
                        <input type="text" className="form-control" placeholder="search....."
                            onChange={obj => updatekeyword(obj.target.value)} />
                    </div>

                    <div className="col-lg-4"></div>

                </div>



                <div className="row">
                    {
                        allproduct.map((product, index) => {

                            if (product.name.toLowerCase().includes(keyword.toLocaleLowerCase())) {

                                return (
                                    <div className="col-lg-3 mb-4" key={index}>
                                        <div className="p-4 shadow-sm">
                                            <h4 className="text-info mb-3 text-center"> {product.name} </h4>
                                            <img src={product.photo} className="rounded" height="140" width="100%" />
                                            <p className="mt-3"> {product.details} </p>
                                            <p className="m-3">Rs. {product.price} </p>
                                            <p className="text-center">
                                                <button className="btn btn-danger btn-sm"
                                                    onClick={addtoCart.bind(this, product)}>
                                                    <i className="fa fa-shopping-cart"></i> Add to Cart
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                )

                            }
                        })
                    }
                </div>
            </div>
           

            <footer className="bg-primary p-5 mt-5 text-white text-center">
                <p>React Shopping Web Application. Backend With Json Server For API</p>
            </footer>
        </section>
    )
}
export default Myhome;

