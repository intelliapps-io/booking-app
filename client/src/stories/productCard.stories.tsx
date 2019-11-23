import React from 'react';
import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import { Scheduler } from '../components/scheduler/Scheduler';
import { ProductCard } from '../components/productCard/ProductCard';

storiesOf('Product Card', module)
  .add('Basic Example', () => <ProductCard />)