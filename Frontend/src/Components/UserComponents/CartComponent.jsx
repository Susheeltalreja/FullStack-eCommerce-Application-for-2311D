import React, { useEffect } from 'react';
import { ShoppingBag, Minus, Plus, Trash2, Lock } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { FetchCartThunk } from '@/StateManagment/UserSlices/UserCartSlice';

const CartComponent = ({ OpenCart, setOpenCart }) => {

    const { UserData } = useSelector(st => st.Auth);
    const { Cart } = useSelector(st => st.Cart);

    const dispatch = useDispatch();
    console.log(UserData);

    useEffect(() => {
        dispatch(FetchCartThunk(UserData?.Id))
    }, [])

    console.log("cart", Cart)

    return (
        <Sheet open={OpenCart} onOpenChange={setOpenCart}>
            <SheetContent side="right" className="z-[70] flex flex-col w-full sm:max-w-md p-0">
                <SheetHeader className="p-6 border-b">
                    <SheetTitle className="flex items-center gap-2 text-xl font-semibold">
                        <ShoppingBag className="w-5 h-5" /> Your Cart
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Static Item 1 */}
                    {
                        Cart && Cart.length > 0 ? (
                            Cart.map((item) => (
                                <div className="flex gap-4 p-2 pb-4 border-b border-gray-100">
                                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            src={`http://localhost:5000/upload/${item?.ProductId?.ProductImage}`}
                                            alt="Product Name"
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3 className="line-clamp-1">{item?.ProductId?.ProductName}</h3>
                                                {
                                                    item?.ProductId?.ProductSalePrice ? (
                                                        <div className="text-right">
                                                            <p className="text-sm font-bold text-red-600">Rs. {item?.ProductId?.ProductSalePrice}</p>
                                                            <p className="text-xs text-gray-400 line-through">Rs. {item?.ProductId?.ProductPrice}</p>
                                                        </div>
                                                    ) : (<p className="text-sm text-black">Rs. {item?.ProductId?.ProductPrice}</p>)
                                                }
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500 uppercase tracking-wide">{item?.ProductId?.ProductCategory}</p>
                                        </div>

                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <div className="flex items-center border rounded-lg bg-gray-50">
                                                <button className="p-1.5 hover:text-red-500 transition-colors">
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-8 text-center font-semibold text-gray-700">1</span>
                                                <button className="p-1.5 hover:text-green-600 transition-colors">
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            <button className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors">
                                                <Trash2 size={16} />
                                                <span className="text-xs font-medium">Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (<p>No products in cart</p>)
                    }
                </div>

                <SheetFooter className="p-6 border-t bg-gray-50">
                    <div className="w-full space-y-4">
                        <div className="flex justify-between text-base font-semibold text-gray-900">
                            <span>Subtotal</span>
                            <span>Rs. 10,500</span>
                        </div>
                        <p className="text-xs text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <Button className="w-full h-12 text-lg font-bold gap-3 bg-black hover:bg-zinc-800 transition-all">
                            <Lock size={18} />
                            CHECKOUT
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default CartComponent;