import React from 'react'
import { Button } from '../ui/button'

import Image from "../../Images/Img1.png";

function ProductCard() {
    return (
        <div className="shadow">
            <div className="">
                <img src={Image} className='h-[200px] w-full object-cover' alt="" />
            </div>
            <div className="flex justify-between items-center px-4 py-1">
                <h1 className='font-bold'>Product 1</h1>
                <h1 className='font-bold'>Rs. 2000</h1>
                {/* <h1 className={`font-bold ${product.ProductSalePrice ? "line-through" : ""}`}>Rs. {product.ProductPrice}</h1> */}
                {/* <h1 className={`${product.ProductSalePrice ? "block" : "hidden"} font-bold`}>Rs. {product.ProductSalePrice}</h1> */}
            </div>
            <div className="flex justify-between items-center px-4 py-1">
                <h1 className='font-bold'>Men</h1>
                <h1 className='font-bold'>Nike</h1>
            </div>
            <div className="flex justify-between items-center px-4 py-2">
                <Button className="cursor-pointer w-full">Add to cart</Button>
            </div>
        </div>
    )
}

export default ProductCard
