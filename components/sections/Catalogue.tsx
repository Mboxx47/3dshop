import React from 'react'
import ProductCard from '../ProductCard';
import { Vector3 } from 'three';
import { modelScale } from 'three/webgpu';

const products = [
  {
    imgSrc: "/assets/R (2).png",
    title: "First Motherboard",
    price: 799.99,
    modelDetails: "This model has these features that are the best",
    modelSrc: "/assets/TestMotherboard.glb",
    modelScale: new Vector3(15,15,15)
  },
  {
    imgSrc: "/assets/R (3).png",
    title: "Second Motherboard",
    price: 899.99,
    modelSrc: "/assets/Board TestV1.glb",
    modelDetails: "This model has these features too and more",
    modelScale: new Vector3(6,6,6)

  },
  {
    imgSrc: "/assets/ROG-Strix-Z790-I-Gaming.png",
    title: "Third Motherboard",
    price: 999.99,
    modelSrc: "/assets/Board TestV1.glb",
    modelDetails: "This model has these features",
    modelScale: new Vector3(3,3,3)

  }
];

export interface ProductType{
  imgSrc: string;
  title: string;
  price: number;
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
            price={product.price}
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