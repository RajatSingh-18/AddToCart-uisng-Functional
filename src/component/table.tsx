import React from "react";
import {CartItemType } from './addtocart'
  type dataprops={
  car:Array<Record<string, string | number>>,
  sum:Number,
  remove: (index: number) => void;
  decrease:(key:number)=>void
  increase:(key:number)=>void
}
function Cart(props:dataprops){
return(
    <>
   
    <div className="cartproduct">
        <h1>Cart</h1>
        <table>
            <thead>
                <tr>
                    <th>Product name</th>
                    <th>Product Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>

                {

                    props.car.map((index:any,key:number) => {
                        return (
                            <tr>
                                <td>{index.title}</td>
                                <td>{index.price}</td>
                                <td><button onClick={() =>props.increase(key)} >+</button>
                                <span>{index.quantity}</span>
                                <button onClick={() =>props.decrease(key)}>-</button></td>
                                <td><button className="remove" onClick={() =>props.remove(index.id)} >Delete</button></td>
                            </tr>
                        )
                    })
                    
                }
            </tbody>
        </table>
        <div>
        <h3>{"Total:"+props.sum.toFixed(2)}</h3>
      
     
        </div>
    </div>
</>
)

}export default Cart
