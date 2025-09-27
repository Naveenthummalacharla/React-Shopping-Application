import {HashRouter, Routes, Route} from "react-router-dom";
import Sellerheader from "./sellerheader";
import Mydashboard from "./dashboard";
import Order from "./order";
import ProductList from "./productlist";
import Newproduct from "./newproduct";



const SellerModule =()=>{
  return(
    <HashRouter>
        <Sellerheader/>

        <Routes>
            <Route exact path="/" element={<Mydashboard/>}/>
            <Route exact path="/order" element={<Order/>}/>
            <Route exact path="/newproduct" element={<Newproduct/>}/>
            <Route exact path="/productlist" element={<ProductList/>}/>
        </Routes>
    </HashRouter>
  )
}
export default SellerModule;
