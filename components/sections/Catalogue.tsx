import React from 'react'
import ProductCard from '../ProductCard';
import { Vector3 } from 'three';
import { modelScale } from 'three/webgpu';

const products = [
  {
    imgSrc: "/assets/R (2).png",
    title: "First Generation",
    
    modelDetails: "This model has these features",
    modelSrc: "/assets/TestMotherboard.glb",
    modelScale: new Vector3(15,15,15)
  },
  {
    imgSrc: "/assets/R (3).png",
    title: "Second Generation",
   
    modelSrc: "/assets/TestMotherboard.glb",
    modelDetails: "This model has these features too and more",
    modelScale: new Vector3(15,15,15)

  },
  {
    imgSrc: "/assets/ROG-Strix-Z790-I-Gaming.png",
    title: "Third Generation",
    
    modelSrc: "/assets/TestMotherboard.glb",
    modelDetails: "This model has these features that are the best",
    modelScale: new Vector3(15,15,15)

  }
];

export interface ProductType{
  imgSrc: string;
  title: string;
  
  modelSrc: string;
  modelDetails: string;
  modelScale: Vector3;
}

interface CatalogProps{
  selectedProduct: ProductType;
  onProductClick: (product: ProductType) => void;
}

const Catalog = ({selectedProduct, onProductClick}: CatalogProps) => {
  return (
    <div className='max-w-[1024px] mx-auto'>
     
      <div className='w-full flex flex-col lg:flex-row gap-6 mx-auto'>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            index={index}
            title={product.title}
            imgSrc={product.imgSrc}
            
            modelScale ={product.modelScale}
            isActive={selectedProduct.title === product.title}
            onClick={() => onProductClick(product)}
          />
        ))}
      </div>
    </div>
  )
}

export default Catalog