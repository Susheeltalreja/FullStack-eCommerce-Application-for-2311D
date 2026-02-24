import React, { useRef, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Check, CloudIcon, FolderIcon, X } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';

function ImageUpload() {

    const [Image, setImage] = useState("");
    const InputRef = useRef();

    function SelectImage(e) {
        setImage(e.target.files[0])
    }

    function HandleDrag(e) {
        e.preventDefault();
    }

    function HandleDrop(e) {
        e.preventDefault();
        setImage(e.dataTransfer.files[0]);
    }

    function HandleRemove(){
        setImage("");
        if(InputRef.current.value){
            InputRef.current.value = ""
        }
    }

    async function HandleUploadImage(){
        const data = new FormData();
        data.append("ProductImage", Image)
        const response = await axios.post("http://localhost:5000/product/upload", data)
        console.log("Response", response)
    }

    return (
        <div className="space-y-2">
            <Label>Product Image</Label>
            <Input type="file" onChange={(file) => SelectImage(file)} id="image" className="hidden" ref={InputRef} />
            <Label htmlFor="image" className="h-32 w-full border border-zinc-900 border-dashed rounded-lg"
                onDragOver={(params) => HandleDrag(params)}
                onDrop={(params) => HandleDrop(params)}
            >
                {
                    !Image ? (<div className="w-full flex justify-around items-center">
                        <CloudIcon size={40} />
                        <h1>Drag & Drop or Click to Select Image</h1>
                    </div>) : (
                        <div className="w-full flex justify-around items-center">
                            <FolderIcon size={40}/>
                            <h2>{Image.name}</h2>
                            <Button variant='outline' onClick={() => HandleRemove()}><X /></Button>
                            <Button variant='outline' onClick={() => HandleUploadImage()}><Check /></Button>
                        </div>
                    )
                }
            </Label>
        </div>
    )
}

export default ImageUpload
