import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { decart, getCart, incart } from "../utils/requests";

export default function Cart({logged, token}){
    const {id} = useParams();
    const [data, setData] = useState();
    var price = 0;
    useEffect(() => {
        const fetchData = async () => {
            await getCart(id, setData, token);
        };
        fetchData();
    }, [id, data]);
    const handleinc = async(id,product_id)=>{
        // const ind = data.findIndex((ele)=>ele.id==id&&ele.product_id==product_id);
        //     const curr = data[ind];
        //     curr.count += 1;
        //     data[ind] = curr;
        //     setData(data);
        await incart(id, product_id, token);
    }
    const handledec = async(id,product_id)=>{
        // const ind = data.findIndex((ele)=>ele.id==id && ele.product_id==product_id);
        // if(ind!==-1){
        // const curr = data[ind];
        // curr.count -=1;
        // data[ind] = curr;
        // setData(data);
        // }
        await decart(id, product_id, token);
    }
    if( data ){
        return (<><h1 className="carthead"><em>CART 🛒 </em></h1><div className="products">{data[0].price&&data.map((ele) => {
            {price += parseInt(ele.price)*ele.count}
            return (<div key={ele.product_id} className="card">
            <div className="card text-bg-info mb-3" style={{width: "18rem"}}>
                <img src={ele.product_img} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h3><em>{ele.product_name.toLocaleUpperCase()}</em></h3>
                        <p className="card-text text-base"><b className="">PRICE:</b> ${ele.price}</p>
                        <div className="Qty"><div><b>Quantity:</b> {ele.count}</div>{logged&&(<button className="incdec" onClick={()=>{handleinc(id,ele.product_id)}}>+</button>)}{logged&&(<button className="incdec" onClick={()=>{handledec(id,ele.product_id)}}>-</button>)}</div>
                </div>
            </div>
        </div>)})}
        {!data[0].price&&<div className="empty"><img src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png"/></div>}
    </div>{price!==0&&<h2 className="total">TOTAL: ${price}</h2>}</>);
    }else{
        return(<></>)
    }
}