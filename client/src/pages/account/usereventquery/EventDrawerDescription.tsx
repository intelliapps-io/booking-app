
import React from 'react';
import {Descriptions, Drawer } from 'antd'

interface EventDrawerDescriptionProps {

}

export const EventDrawerDescription: React.FC<EventDrawerDescriptionProps> = props => {
  return(
    <Drawer
      title="Basic Drawer"
      placement="right"
      closable={false}
      onClose={}
      visible={}
      >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>

  );
}