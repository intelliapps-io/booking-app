import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import { Footer } from '../components/footer/Footer'



//parent component for state
const Parent = () => {

  return (
    <Footer
      
    />
    
  )
}

storiesOf('Footer', module)
  .add('Basic Example', () => <Parent/>)

