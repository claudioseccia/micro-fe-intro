import React, {useState, useEffect, useRef} from 'react'
import { getProductById, currency } from 'home/products';
import placeAddToCart from 'addtocart/placeAddToCart';
import { useParams } from 'react-router-dom';
const PDPContent = () => {
    //const id = 1;
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const addToCart = useRef(null);
    useEffect(()=>{
        if(id) {
            getProductById(id).then(setProduct); //same as: getProductById(id).then(product=>setProduct(product));
        }else {
            setProduct(null);
        }
    }, [id]);
    useEffect(()=>{
        if(addToCart.current) {
            placeAddToCart(addToCart.current, product.id);
        }
    },[product]);
    if(!product) return null;
    console.log(product);
    return (
        <div className='grid grid-cols-2 gap-5'>
            <div><img src={product.image} alt={product.name} /></div>
            <div>
                <div className='flex'>
                    <div className='font-bold text-3xl flex-grow'>
                        {product.name}
                    </div>
                    <div className='font-bold text-3xl flex-end'>
                        {currency.format(product.price)}
                    </div>
                </div>
                <div ref={addToCart}></div>
                <div className='mt-10'>{product.description}</div>
                <div className='mt-10'>{product.longDescription}</div>
            </div>
        </div>
    )
}
export default PDPContent;