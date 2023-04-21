import React from 'react'
import "../Home/Home.css"
import {useCollection} from 'react-firebase-hooks/firestore'
import { db } from '../config/Config';
export const IndividualFilteredProduct = ({individualFilteredProduct, addToCart}) => {

    const handleAddToCart=()=>{
        addToCart(individualFilteredProduct);
    }

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    console.log(individualFilteredProduct)

    const times = useCollection(
        db.collection('Products').orderBy("time", "asc")
    )
    return (
        <div className='product'>
            <div className='product-img'>
                <img className='product__img' src={individualFilteredProduct.url} alt="product-img"/>
            </div>
            <div className='product__content'>
                <div className='product-text category'>Danh mục: {truncate(individualFilteredProduct.categorys, 15)}</div>
                <div className='product-text title'>Sản phẩm: {truncate(individualFilteredProduct.title, 15)}</div>
                <div className='product-text description'>ND: {truncate(individualFilteredProduct.content, 15)}</div>
                <div className='product-text price'>Giá sản phẩm: {individualFilteredProduct.price}đ</div>
                {/* <div className='product-text number'>Số điện thoại: {individualFilteredProduct.number || "Không có"}</div> */}                
                <div className='btn btn-danger btn-md cart-btn' onClick={handleAddToCart}>Mua ngay</div>
            </div>
        </div> 
    )
}