import React from "react";
import { useState, useEffect } from "react";
import Table from './table'
export type CartItemType = {
  id: number;
  category: string;
  image: string;
  price: number;
  title: string;
  quantity:number
};

function AddToCart() {
  const [products, setProducts] = useState([]as CartItemType[]);
  const [cart, setCart] = useState([]as CartItemType[]);
  const [total, setTotal] = useState<Number>(0)
  useEffect(() => {
    
    fetch("https://fakestoreapi.com/products?limit=18")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);



  const addToCart = (item: CartItemType) => {
    let newItem:any = cart.find((pro) => pro.id === item.id);
    let newCart;

    if (newItem) {
      newCart = cart.map((pro) =>
        pro.id === item.id
          ? { ...newItem, quantity: newItem.quantity + 1 }
          : pro
      );
    } else {
      newCart = [...cart, { ...item, quantity: 1 }];
    
    }
    setCart(newCart);
    cartTotal(newCart)
  };
 
  function cartTotal(newCart:Array<Record<string, string | number>>) {
    let totalsum = newCart.reduce((total, item: any) => (total + (item.quantity * (item.price))), 0);
    setTotal(totalsum)
  }
  function remove(index: number) {
    const items = cart.filter((item) => item.id !== index)
    setCart(items)
    cartTotal(items)
  }
  function decre(key:number){
    const cart1 = [...cart];
    cart1[key].quantity -= 1;
    setCart(cart1);
    cartTotal(cart);
  }
  function incre(key:number){
    const cart1 = [...cart];
    cart1[key].quantity += 1;
    setCart(cart1);
    cartTotal(cart);
  }
  return (


    <>
<h1>Store</h1>
      <div className="cart">

        {products.map((product:CartItemType, index) => (
          <div key={product.id} className="cart-items">
            <h4>{product.title}</h4>
            <div><img alt={product.title} src={product.image} /></div>
            <p>{product.price + "Rs"}</p>
            <button className="add" key={index} onClick={() => addToCart(product)}>Add To cart</button>
          </div>
        ))}
        <Table car={cart} sum={total} remove={remove} decrease={decre} increase={incre}/>

      </div>
    </>
  )
} export default AddToCart;
