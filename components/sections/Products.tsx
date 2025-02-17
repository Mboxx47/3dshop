"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Catalog, { ProductType } from './Catalogue'
import Preview from './Preview'
import { Vector3 } from 'three'

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType>({
    imgSrc: "/assets/ROG-Strix-Z790-I-Gaming.png",
    title: "Third Motherboard",
    price: 99.99,
    modelSrc: "/assets/Board TestV1.glb",
    modelDetails: "This model has these features",
    
    modelScale: new Vector3(6,6,6)
  })

  const handleProductClick = (product: ProductType) =>{
    setSelectedProduct(product);
  }
  return (
    <div id="catalog" className='max-w-[1536px] flex flex-col mx-auto pt-8'>
      <Catalog selectedProduct={selectedProduct} onProductClick={handleProductClick}/>
      <Preview selectedProduct ={selectedProduct}/>
    </div>
 
  )
  
  
}

export default Products