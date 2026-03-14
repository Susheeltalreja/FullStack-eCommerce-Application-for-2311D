import React, { useState } from 'react'
import { Button } from '../ui/button'

import Image from "../../Images/Img1.png";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Minus, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCartThunk } from '@/StateManagment/UserSlices/UserCartSlice';
import { toast } from 'sonner';

function ProductCard({ Product }) {

    const [Open, setOpen] = useState(false)
    const [Quantity, setQuantity] = useState(1);

    const {UserData} = useSelector(st => st.Auth);
    // console.log(UserData);

    const dispatch = useDispatch();
    function HandleCart(id){
        dispatch(AddToCartThunk({UserId: UserData?.Id, ProductId: id, Quantity: Quantity})).then((res) => {
            if(res?.payload?.success){
                toast.success(`${res?.payload?.message}`)
            }else{
                toast.error(`${res?.payload?.message}`)
            }
        })
    }

    return (
        <div className="">

            {/* Detail component  */}
            <Dialog open={Open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Product Detail
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                        <div className="">
                            <img src={`http://localhost:5000/upload/${Product.ProductImage}`} className='h-[200px] w-full object-cover' alt="" />
                        </div>
                        <div className="flex justify-between items-center px-4 py-1">
                            <h1 className='font-bold'>{Product.ProductName}</h1>
                            {
                                Product.ProductSalePrice ? (
                                    <div className="flex gap-2 items-center">
                                        <h1 className='line-through text-[10px] font-bold'>Rs. {Product.ProductPrice}</h1>
                                        <h1 className='font-bold'>Rs. {Product.ProductSalePrice}</h1>
                                    </div>
                                ) : (<h1 className='font-bold'>Rs. {Product.ProductPrice}</h1>)
                            }
                        </div>
                        <div className="flex justify-between items-center px-4 py-1">
                            <h1 className='font-bold uppercase text-[12px]'>{Product.ProductCategory}</h1>
                            <h1 className='font-bold uppercase text-[12px]'>{Product.ProductBrand}</h1>
                        </div>
                    </div>
                    <DialogFooter>
                        <div className="flex w-full justify-between items-center">
                            <div className="space-x-2">
                                <Button variant='outline' className="cursor-pointer"
                                onClick={() => {if(Quantity > 1) {setQuantity(Quantity - 1)}}}
                                ><Minus /></Button>
                                <span className='px-3 py-2 border rounded-lg'>{Quantity}</span>
                                <Button variant='outline' className="cursor-pointer"
                                onClick={() => setQuantity(Quantity + 1)}
                                ><Plus /></Button>
                            </div>
                            <div className="">
                                <Button className="cursor-pointer" onClick={() => HandleCart(Product?._id)}>Add to Cart</Button>
                            </div>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {/* Card  */}
            <div className="shadow">
                <div className="" onClick={() => setOpen(true)}>
                    <img src={`http://localhost:5000/upload/${Product.ProductImage}`} className='h-[200px] w-full object-cover' alt="" />
                </div>
                <div className="flex justify-between items-center px-4 py-1">
                    <h1 className='font-bold'>{Product.ProductName}</h1>
                    {
                        Product.ProductSalePrice ? (
                            <div className="flex gap-2 items-center">
                                <h1 className='line-through text-[10px] font-bold'>Rs. {Product.ProductPrice}</h1>
                                <h1 className='font-bold'>Rs. {Product.ProductSalePrice}</h1>
                            </div>
                        ) : (<h1 className='font-bold'>Rs. {Product.ProductPrice}</h1>)
                    }
                </div>
                <div className="flex justify-between items-center px-4 py-1">
                    <h1 className='font-bold uppercase text-[12px]'>{Product.ProductCategory}</h1>
                    <h1 className='font-bold uppercase text-[12px]'>{Product.ProductBrand}</h1>
                </div>
                <div className="flex justify-between items-center px-4 py-2">
                    <Button className="cursor-pointer w-full" onClick={() => HandleCart(Product?._id)}>Add to cart</Button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
