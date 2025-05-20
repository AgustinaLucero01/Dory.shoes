import {React, useState} from "react";
import Products from "../products/Products.jsx";
import Cart from "./Cart.jsx";
const Count =() =>{
 const [Total, setTotal]=useState(0);
 const [CountProduct, setCountProduct]=useState(0);
 const [Allproduct, setAllproduct]=useState([]);

return(
     <>
    <Cart Allproduct={Allproduct}
    setAllproduct={setAllproduct}
    Total={Total}
    setTotal={setTotal}
    CountProduct={CountProduct}
    setCountProduct={setCountProduct}
     />
    <Products
    Allproduct={Allproduct}
    setAllproduct={setAllproduct}
    Total={Total}
    setTotal={setTotal}
    CountProduct={CountProduct}
    setCountProduct={setCountProduct}/>
     </>
 )
}
export default Count

