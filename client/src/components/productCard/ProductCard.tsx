import React from "react";
import { isImageUrl } from "antd/lib/upload/utils";
import { Button } from "antd";
import './ProductCard.less'
import { redirectTo } from "@reach/router";

interface ProductCardProps {
  name: React.ReactNode
  cost: number
  category?: React.ReactNode
  description?: React.ReactNode
  imageUrl?: React.ReactNode
  isSelected?: boolean
  onSelect?: (isSelected: boolean) => void
  style?: React.CSSProperties 
}

export const ProductCard: React.FC<ProductCardProps> = props => {
  return(
    <div className='productcard' style={props.style}>

      <div className='innercard'>
        <Button className="category">{props.category}</Button>
        <h2 className='productname'>{props.name}</h2>
        <div className='description'>{props.description}</div>
        <div className='actionwrap'>
          <div className='price'>${props.cost.toFixed(2)}</div>
          <Button
            type={props.isSelected? 'danger' : 'primary'}
            onClick={() => { if (props.onSelect) props.onSelect(!props.isSelected) }}
           >
            {props.isSelected ? 'remove' : 'add to cart'}
          </Button>
        </div>
      </div>
      <div className='imagewrap'>
        {typeof props.imageUrl === 'string' ? <div style={{
          background: `url("${props.imageUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          display: 'flex',
          width: '100%',
          height: '100%'

        }}/> : props.imageUrl}
    
      </div>
    </div>
  );
}