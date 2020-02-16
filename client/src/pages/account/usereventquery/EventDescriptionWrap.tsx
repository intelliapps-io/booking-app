import React, { useContext, ReactEventHandler, useState } from 'react';
import Moment from 'moment';
import { Event, EventsQueryVariables, EventsQuery } from '../../../lib/codegen';
import {EventDrawerDescription} from './EventDrawerDescription';
import { Descriptions, Drawer } from 'antd';
import { AppContext } from '../../../lib/helpers/AppContext';
import { QueryResult } from 'react-apollo';

interface EventDescriptionWrapProps {
  event: Event
  eventsQuery: QueryResult<EventsQuery, EventsQueryVariables>

}

export const EventDescriptionWrap: React.FC<EventDescriptionWrapProps> = props => {
  const { begins, customer, employee, datetime } = props.event
  const { organization, user } = useContext(AppContext)
  const descriptionStyle = {
    padding: '2px 5px',
  }

  const [isVisible, setIsVisible] = useState(false)

  const handleClick = () => {
    console.log(props.event)
    setIsVisible(true)
    console.log(isVisible)

  }

  return (
    <div>
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
      <EventDrawerDescription VisibelState={[isVisible, setIsVisible]} descrptionProps={props.event} eventsQuery={props.eventsQuery}/> 
    </div>
  )
} 