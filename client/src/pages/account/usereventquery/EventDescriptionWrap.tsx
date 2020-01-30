import React from 'react';
import Moment from 'moment';
import { Event } from '../../../lib/codegen';
import { Descriptions } from 'antd';

interface EventDescriptionWrapProps {
  event: Event

}

export const EventDescriptionWrap: React.FC<EventDescriptionWrapProps> = props => {
  const { begins, customer, employee, datetime,} = props.event
  return(
    <Descriptions title="User Info">
      <Descriptions.Item label="Customer">{customer.name}</Descriptions.Item>
      <Descriptions.Item label="Employee">{employee.name}</Descriptions.Item>
      <Descriptions.Item label="Date Time">
        {Moment(datetime).format('YYYY/MM/DD')}
      </Descriptions.Item>
      <Descriptions.Item label="Start">{begins}</Descriptions.Item>
  </Descriptions>
  );
}