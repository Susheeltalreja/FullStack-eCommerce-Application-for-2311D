import ProductForm from '@/Components/AdminComponents/ProductForm';
import { Button } from '@/Components/ui/button'
import React, { useState } from 'react'

function Products() {
  const [OpenForm, setOpenForm] = useState(false);
  return (
    <div className='relative'>
      <div className="absolute top-5 right-5">
        <ProductForm OpenForm={OpenForm} setOpenForm={setOpenForm}/>
        <Button className="cursor-pointer" onClick={() => setOpenForm(true)}>Add Product</Button>
      </div>
    </div>
  )
}

export default Products
