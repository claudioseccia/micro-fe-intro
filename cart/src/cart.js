import React, {useState,useEffect} from 'react';
import { BehaviorSubject } from "rxjs";

const API_SERVER = "http://localhost:8080";
export const jwt = new BehaviorSubject(null);
export const cart = new BehaviorSubject(null);
// jwt.subscribe((token)=>console.log(token)); //called everytime a new value is get
// jwt.next(newValue);

//manage the cart
export const getCart = () => {
  fetch(`${API_SERVER}/cart`,{
    headers: {
      'Content-Type':'application/json',
      Authorization: `Bearer ${jwt.value}`
    }
  })
  .then(res=>res.json())
  .then(res=>{
    cart.next(res); 
    return res;
  })
}
//add to cart (takes the cart id as a param)
export const addToCart = (id) => {
  fetch(`${API_SERVER}/cart`,{
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      Authorization: `Bearer ${jwt.value}`
    },
    body: JSON.stringify({id})
  })
  .then(res=>res.json())
  .then(res=>{
    getCart();
  })
}
//delete cart item
export const clearCart = () => {
  fetch(`${API_SERVER}/cart`,{
    method: 'DELETE',
    headers: {
      'Content-Type':'application/json',
      Authorization: `Bearer ${jwt.value}`
    }
  })
  .then(res=>res.json())
  .then(res=>{
    getCart();
  })
}
//manage the login:
export const login = (username, password) =>
  fetch(`${API_SERVER}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      jwt.next(data.access_token);
      getCart();
      return data.access_token;
    });

  export function useLoggedIn() {
    const[loggedIn,setLoggedIn] = useState(!!jwt.value); //!!jwt.value returns true|false depending on jwt.value is set or not
    useEffect(()=>{
      setLoggedIn(!!jwt.value);
      return jwt.subscribe((c)=>{
        setLoggedIn(!!jwt.value);
      })
    },[]);
    return loggedIn; //true or false
  } 