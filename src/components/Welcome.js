import React, { useEffect, useState } from "react";
import Searchbar from "./searchbar";
import { getProducts, gotoCart } from "../utils/requests";
import Searchresult from "./searchresult";

export default function Welcome({logged, setLogged, token}){  
    const [search, setSearch] = useState();
    const [products, setProducts] = useState();
    const id = localStorage.getItem('id');
    // const storedSessionId = sessionStorage.getItem("sessionId");
    // const token = localStorage.getItem('token');
    const handleCart=async(product_id)=>{
        await gotoCart(id, product_id, token);
    }
    useEffect(()=>{
        const fetchData = async()=>{
            await getProducts(setProducts);
        }
        fetchData()
    },[]);
    return (<>
        <Searchbar setSearch={setSearch} logged={logged} setLogged={setLogged} token={token}/>
        {search&&(<Searchresult search={search} handleCart={handleCart} logged={logged}/>)}
        {!search&&products&& (<div className="products">{products.map((ele)=>{return (<div className="card border-warning mb-3" style={{width:"18rem", flexWrap:"wrap"}}>
            <div className="card-header">{ele.product_name.toUpperCase()}</div>
            <div className="card-body">
                <h5 className="card-title"></h5>
                <img src={ele.product_img} className="card-img-top" alt="..." />
                <p className="card-text"><b className="">PRICE:</b> ${ele.price} </p>
                {/* <p><b>Category: </b>{ele.category.toUpperCase()}</p> */}
                {logged&&(<button type="button" className="btn btn-success" onClick={()=>{handleCart(ele.product_id)}}>Add to Cart</button>)}
            </div>
        </div>)})}</div>)}
        {/* <h1>{storedSessionId}</h1> */}
    </>);
}