import React, { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import ImageUpload from './ImageUpload'

const Inputs = [
    {
        name: "ProductName",
        label: "Product Name",
        placeholder: "Enter your product name!",
        type: "text"
    },
    {
        name: "ProductPrice",
        label: "Product Price",
        placeholder: "Enter your product price!",
        type: "number"
    },
    {
        name: "ProductSalePrice",
        label: "Product Sale Price (Optional)",
        placeholder: "Enter your product price!",
        type: "number"
    },
    {
        name: "ProductQuantity",
        label: "Product Quantity",
        placeholder: "Enter your product quantity!",
        type: "number"
    },
]

function ProductForm({ OpenForm, setOpenForm }) {

    const [ProductData, setProductData] = useState({
        ProductImage: "",
        ProductName: "",
        ProductPrice: 0,
        ProductSalePrice: 0,
        ProductQuantity: 0,
        ProductCategory: "",
        ProductBrand: "",
        ProductDesc: ""
    })

    console.log("Data: ", ProductData)

    return (
        <div>
            <Sheet open={OpenForm} onOpenChange={setOpenForm}>
                <SheetContent side='right'>
                    <SheetHeader>
                        <SheetTitle>Product Form</SheetTitle>
                    </SheetHeader>
                    <div className="px-4 space-y-2 overflow-auto">

                        <div className="">
                            <ImageUpload ProductData={ProductData} setProductData={setProductData}/>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {
                                Inputs.map((input) => (
                                    <div className={`space-y-2 ${input.name === "ProductQuantity" || input.name === "ProductSalePrice" ? "col-span-2" : ""}`}>
                                        <Label>{input.label}</Label>
                                        <Input type={input.type} placeholder={input.placeholder}
                                            onChange={(e) => setProductData({
                                                ...ProductData,
                                                [input.name]: e.target.value
                                            })}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                                <Label>Product Category</Label>
                                <Select
                                    onValueChange={(value) => setProductData({
                                        ...ProductData,
                                        "ProductCategory": value
                                    })}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select your category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Product Category</SelectLabel>
                                            <SelectItem value="men">Men</SelectItem>
                                            <SelectItem value="women">Women</SelectItem>
                                            <SelectItem value="children">Childrens</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Product Brand</Label>
                                <Select
                                    onValueChange={(value) => setProductData({
                                        ...ProductData,
                                        "ProductBrand": value
                                    })}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select your Brand" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Product Brand</SelectLabel>
                                            <SelectItem value="adidas">Adidas</SelectItem>
                                            <SelectItem value="nike">Nike</SelectItem>
                                            <SelectItem value="khaadi">Khaadi</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Product Description</Label>
                            <Textarea
                                onChange={(e) => setProductData({
                                    ...ProductData,
                                    "ProductDesc": e.target.value
                                })}
                                placeholder="Enter your product's description" />
                        </div>
                        <div className="">
                            <Button className="cursor-pointer w-full">Add</Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default ProductForm
