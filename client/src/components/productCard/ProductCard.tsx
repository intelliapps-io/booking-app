import React from "react";
import { isImageUrl } from "antd/lib/upload/utils";
import { Button } from "antd";
import './ProductCard.less'

interface ProductCardProps {
  name: React.ReactNode
  cost: number
  description?: React.ReactNode
  imageUrl?: React.ReactNode
  isSelected?: boolean
  onSelect?: (isSelected: boolean) => void
  style?: React.CSSProperties 
}

export const ProductCard: React.FC<ProductCardProps> = props => {
  return(
    <div className='productcard' style={props.style}>
      <h2>{props.name}</h2>
      <div className='imgwraper'>{typeof props.imageUrl === 'string' ? <img src={props.imageUrl} /> : props.imageUrl } </div>
      <div>{props.description}</div>
      <h3>${props.cost.toFixed(2)}</h3>
      <Button
        type={props.isSelected? 'danger' : 'primary'}
        onClick={() => { if (props.onSelect) props.onSelect(!props.isSelected) }}
      >
        {props.isSelected ? 'remove' : 'add to cart'}
      </Button>
    </div>
  );
}