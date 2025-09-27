
import Usermodule from "./user/userapp";
import SellerModule from "./seller/sellerapp";

function App() {
  let sellerid = localStorage.getItem('sellerid');
  if(sellerid==null)
     
    return(<Usermodule/>)
    
  else
    return(<SellerModule/>)
 
}

export default App;
