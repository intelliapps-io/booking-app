import React, { useContext, ReactEventHandler } from 'react';
import Moment from 'moment';
import { Event, UserRole } from '../../../lib/codegen';
import { Descriptions } from 'antd';
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

  const handleClick: ReactEventHandler = () => {
    console.log(props.event)
  }

  return (
    <div style={descriptionStyle} onClick={handleClick}>
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
}