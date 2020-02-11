import React, { useContext, ReactEventHandler, useState } from 'react';
import Moment from 'moment';
import { Event, UserRole } from '../../../lib/codegen';
import { Descriptions, Drawer } from 'antd';
import { AppContext } from '../../../lib/helpers/AppContext';

interface EventDescriptionWrapProps {
  event: Event

}

export const EventDescriptionWrap: React.FC<EventDescriptionWrapProps> = props => {
  const { begins, customer, employee, datetime } = props.event
  const { organization, user } = useContext(AppContext)
  const descriptionStyle = {
    padding: '2px 5px',
  }


  const [notVisible, visible] = useState(true)

  const handleClick: ReactEventHandler = () => {
    console.log(props.event)
    visible
  }
  if (user!.id === props.event.customer.id || user!.id === props.event.employee.id) {
    return (
      <div style={descriptionStyle } onClick={handleClick}>
        <Descriptions title="Appointment Info">
          <Descriptions.Item label="Date Time">
            {Moment(datetime).format('YYYY/MM/DD')}
          </Descriptions.Item>
          <Descriptions.Item label="Customer">{customer.name}</Descriptions.Item>
          <Descriptions.Item label="Employee">{employee.name}</Descriptions.Item>
          <Descriptions.Item label="Start">{begins}</Descriptions.Item>
          <Descriptions.Item label="Location">{organization!.address}</Descriptions.Item>
        </Descriptions>
      </div>
    )
  } else if (user!.role === UserRole.Admin) {
    return (
      <div onClick={handleClick}>
        <Descriptions title="Appointment Info" style={descriptionStyle }>
          <Descriptions.Item label="Date Time">
            {Moment(datetime).format('YYYY/MM/DD')}
          </Descriptions.Item>
          <Descriptions.Item label="Customer">{customer.name}</Descriptions.Item>
          <Descriptions.Item label="Employee">{employee.name}</Descriptions.Item>
          <Descriptions.Item label="Start">{begins}</Descriptions.Item>
          <Descriptions.Item label="Location">{organization!.address}</Descriptions.Item>
        </Descriptions>
      </div>
    )
  }
  return(
    <div>
      <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={handleClick}
          visible={handleClick}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
    </div>
  );
}