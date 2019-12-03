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
      name={<a>Apples</a>}
      imageUrl='https://www.aldi.us/fileadmin/_processed_/e/f/csm_Apples_D_01_552c95e84b.jpg'
      description={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged`}
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

