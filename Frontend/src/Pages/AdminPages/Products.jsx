import ProductCard from '@/Components/AdminComponents/ProductCard';
import ProductForm from '@/Components/AdminComponents/ProductForm';
import { Button } from '@/Components/ui/button'
import { FetchProductThunk } from '@/StateManagment/AdminStates/ProductSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function Products() {
  const [OpenForm, setOpenForm] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchProductThunk());
  }, [])

  const {Products} = useSelector(st => st.Product)

  // console.log(Products)

  return (
    <div className='relative py-20 px-4'>
      <div className="absolute top-5 right-5">
        <ProductForm OpenForm={OpenForm} setOpenForm={setOpenForm}/>
        <Button className="cursor-pointer" onClick={() => setOpenForm(true)}>Add Product</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {
          Products && Products.length > 0 ? (
            Products.map((item) => (
              <ProductCard product={item}/>
            ))
          ) : (<p>No Products found</p>)
        }
      </div>
    </div>
  )
}

export default Products
