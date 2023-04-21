
import React, {useEffect, useState} from 'react'
import { db } from '../config/Config';
export const IndividualProduct = ({individualProduct, addToCart}) => {
    console.log(individualProduct);
    const handleAddToCart=()=>{
        addToCart(individualProduct);
    }

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    } 
        
    console.log(individualProduct.ID)
    
    return (
        <div id={individualProduct.ID} className='product'>
            <div className='product-img'>
                <img className='product__imgs' style={{width:200, height:240, objectFit: 'cover'}} src={individualProduct.url} alt="product-img"/>
            </div>
            <div className='product__content'>
                <div className='product-text category'>Danh mục: {truncate(individualProduct.categorys, 15)}</div>
                <div className='product-text title'>Sản phẩm: {truncate(individualProduct.title, 15)}</div>
                <div className='product-text description'>Nội dung: {truncate(individualProduct.content, 15)}</div>
                <div className='product-text price'>Giá sản phẩm: {individualProduct.price}đ</div>
                
                <div className='btn btn-danger btn-md cart-btn' onClick={handleAddToCart}>Mua ngay</div>
            </div>
        </div> 
    )
}