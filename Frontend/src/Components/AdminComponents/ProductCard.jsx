import React from 'react'

import Image from "../../Images/Img1.png"

function ProductCard({product, setOpenForm, setEditProduct}) {
  return (
    <div className="shadow">
        <div className="">
            <img src={`http://localhost:5000/upload/${product.ProductImage}`} className='h-[200px] w-full object-cover' alt="" />
        </div>
        <div className="flex justify-between items-center px-4 py-1">
            <h1 className='font-bold'>{product.ProductName}</h1>
            <h1 className='font-bold'>Rs. {product.ProductPrice}</h1>
        </div>
        <div className="flex justify-between items-center px-4 py-1">
            <h1 className='font-bold'>{product.ProductCategory}</h1>
            <h1 className='font-bold'>{product.ProductBrand}</h1>
        </div>
        <div className="flex justify-between items-center px-4 py-2">
            <button className='bg-yellow-400 px-4 py-2 rounded-lg cursor-pointer font-bold'
            onClick={() => {
                setOpenForm(true)
                setEditProduct(product)
            }}
            >Edit</button>
            <button className='bg-red-600 px-4 py-2 rounded-lg cursor-pointer font-bold'>Delete</button>
        </div>
    </div>
  )
}

export default ProductCard
