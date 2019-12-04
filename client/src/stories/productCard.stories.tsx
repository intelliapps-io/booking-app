import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import { Scheduler } from '../components/scheduler/Scheduler';
import { ProductCard } from '../components/productCard/ProductCard';


//parent component for state
const Parent = () => {
  const [isSelected, setIsSelected] = useState(false)//togle between state
  return (
    <ProductCard
      category={<a>Artworks</a>}
      name={<a>Off RED & BlUE</a>}
      imageUrl='https://images.pexels.com/photos/2471235/pexels-photo-2471235.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
      description={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the`}
      cost={15}
      isSelected={isSelected}
      onSelect={(toggle) => setIsSelected(toggle)}
      style={{
        width: '50%',
        margin: '20px'
        
      }}
    />
  )
}

storiesOf('Product Card', module)
  .add('Basic Example', () => <Parent/>)

