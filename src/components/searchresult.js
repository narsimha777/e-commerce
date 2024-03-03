import React, { useEffect, useState } from "react";
import { getSearchresult } from "../utils/requests";

export default function Searchresult({search, handleCart, logged}){
    const [products, setData] = useState(); 
    useEffect(()=>{
        const fetchData = async() =>{
        await getSearchresult(search, setData);
        }
        fetchData();
    },[search]);
    // return (<h1>{search}</h1>)
    if (products) {
        return (<div>{search && (<div className="products">{products.map((ele) => {
            return (<div class="card border-warning mb-3" style={{ width: "18rem" }}>
                <div class="card-header">{ele.product_name.toUpperCase()}</div>
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <img src={ele.product_img} className="card-img-top" alt="..." />
                    <p class="card-text"><b className="">PRICE:</b> ${ele.price} </p>
                    {/* <p><b>Category: </b>{ele.category.toUpperCase()}</p> */}
                    {logged&&(<button type="button" class="btn btn-success" onClick={() => { handleCart(ele.product_id) }}>Add to Cart</button>)}
                </div>
            </div>)
        })}
        </div>)}</div>)
    } else {
        return (<>{!products && (<div className="emptyres"><h2>No Results.... 😓</h2></div>)}</>)
    }
}