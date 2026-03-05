import { Button } from '@/Components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import Filter from '@/Components/UserComponents/Filter'
import ProductCard from '@/Components/UserComponents/ProductCard'
import { ArrowUpDown } from 'lucide-react'
import React, { useState } from 'react'

function ProductsList() {

  const [SortProduct, setSortProduct] = useState("a to z");

  const [Filters, setFilter] = useState({});

  function HandleFilters(Key, value){
    let NewOptions = {...Filters};
    if(!NewOptions[Key]){
      NewOptions[Key] = [value]
    }else{
      const index = NewOptions[Key].indexOf(value);
      if(index === -1){
        NewOptions[Key].push(value)
      }else{
        NewOptions[Key].splice(index, 1)
      }
    }
    setFilter(NewOptions);
    console.log(NewOptions);
  }

  return (
    <div className="w-full h-full grid md:grid-cols-[300px_1fr] px-4 py-24 gap-2">
      {/* filters section  */}
      <div className="h-full">
        <Filter HandleFilters={HandleFilters}/>
      </div>
      {/* products section  */}
      <div className="h-full p-2">
        {/* header section  */}
        <div className="h-16 w-full border rounded-xl px-4 flex justify-between items-center">
          <div className="">
            Total: 10
          </div>
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline'><ArrowUpDown /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Sort Products</DropdownMenuLabel>
                  <DropdownMenuRadioGroup value={SortProduct} onValueChange={setSortProduct}>
                    <DropdownMenuRadioItem value="a to z">A to Z</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="z to a">Z to A</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Price low to high">Price Low To High</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Price high to low">Price High To Low</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* card section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  )
}

export default ProductsList
