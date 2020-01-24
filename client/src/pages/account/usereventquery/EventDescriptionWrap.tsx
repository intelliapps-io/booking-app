import React from 'react';
import { Event } from '../../../lib/codegen';
import { Descriptions } from 'antd';

interface EventDescriptionWrapProps {
  event: Event

}

export const EventDescriptionWrap: React.FC<EventDescriptionWrapProps> = props => {
  const {begins,customer,employee} = props.event
  return(
    <Descriptions title="User Info">
      <Descriptions.Item label="Customer">{customer.name}</Descriptions.Item>
      <Descriptions.Item label="Employee">{employee.name}</Descriptions.Item>
      <Descriptions.Item label="Start">{begins}</Descriptions.Item>
  </Descriptions>
  );
}