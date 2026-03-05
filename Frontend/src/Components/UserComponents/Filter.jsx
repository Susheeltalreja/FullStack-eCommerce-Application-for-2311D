import React from 'react'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

const Brands = [
    {
        name: 'khaadi',
        label: "Khaadi"
    },
    {
        name: 'nike',
        label: "Nike"
    },
    {
        name: 'adidas',
        label: "Adidas"
    },
]
const Categories = [
    {
        name: 'men',
        label: "Men"
    },
    {
        name: 'women',
        label: "Women"
    },
    {
        name: 'children',
        label: "Children"
    },
]

function Filter({HandleFilters}) {
    return (
        <div className="h-full px-4 py-2 border-r">
            <div className="space-y-2">
                <h1 className='font-bold text-lg'>Categories</h1>
                {
                    Categories.map((item) => (
                        <div className="flex gap-2 items-center justify-start px-2" key={item.name}>
                            <Checkbox id={item.name}
                            onCheckedChange = {() => HandleFilters("Category", item.name)}
                            />
                            <Label htmlFor={item.name}>{item.label}</Label>
                        </div>
                    ))
                }
            </div>
            <div className="space-y-2">
                <h1 className='font-bold text-lg'>Brands</h1>
                {
                    Brands.map((item) => (
                        <div className="flex gap-2 items-center justify-start px-2" key={item.name}>
                            <Checkbox id={item.name} 
                             onCheckedChange = {() => HandleFilters("Brand", item.name)}
                            />
                            <Label htmlFor={item.name}>{item.label}</Label>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Filter
