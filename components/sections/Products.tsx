"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Catalog, { ProductType } from './Catalogue'
import Preview from './Preview'
import { Vector3 } from 'three'

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType>({
    imgSrc: "/assets/R (3).png",
    title: "Second Motherboard",
    price: 899.99,
    modelSrc: "/assets/TestMotherboard.glb",
    modelDetails: "This model has these features too and more",
    modelScale: new Vector3(15,15,15)
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