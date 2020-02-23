
import React, {useState, useContext} from 'react';
import {Descriptions, Drawer, Button, notification } from 'antd'
import { DrawerProps } from 'antd/lib/drawer';
import { ApolloError } from 'apollo-boost';
import { Event, useDeleteEventMutation, useEventsQuery, EventsQuery, EventsQueryVariables, Organization, OrganizationProps } from '../../../lib/codegen';
import { QueryResult } from 'react-apollo';
import Moment from 'moment';
import { AppContext } from '../../../lib/helpers/AppContext';

interface EventDrawerDescriptionProps {
  VisibelState: [boolean, (state: boolean) => void]
  descrptionProps: Event
  eventsQuery: QueryResult<EventsQuery, EventsQueryVariables>
}

export const EventDrawerDescription: React.FC<EventDrawerDescriptionProps> = props => {
  const [isVisible, setToVisible] = props.VisibelState
  const { organization} = useContext(AppContext)
  const [deleteEvent] = useDeleteEventMutation()
  const {refetch} = props.eventsQuery
  const onDelete = () => {
    if (window.confirm('delete event?')) {
      deleteEvent(
        {
          variables: {
            id: props.descrptionProps.id
          }
  
        }
      )
        .then(() => {
          setToVisible(false)
          refetch()
  
        })
      .catch((error: ApolloError) => notification['error']({ message: error.message }))
    }else return false
   
  }
  const onClose = () => (
    setToVisible(false)

  )
  return (
    <Drawer
      title="Full Inquiry"
      placement="right"
      closable={true} 
      onClose={onClose}
      visible={isVisible}
      width={500}
      >
      <Descriptions title="Event Information">
        <Descriptions.Item label="Date Time">
          {Moment(props.descrptionProps.datetime).format('YYYY/MM/DD')}
        </Descriptions.Item>
        <Descriptions.Item label="Start">{props.descrptionProps.begins}</Descriptions.Item>
        <Descriptions.Item label="End">{props.descrptionProps.ends}</Descriptions.Item>
        <Descriptions.Item label="Customer">{props.descrptionProps.customer.name}</Descriptions.Item>
        <Descriptions.Item label="Customer Contact">{props.descrptionProps.customer.email}</Descriptions.Item>
        <br/>
        <Descriptions.Item label="Employee">{props.descrptionProps.employee.name}</Descriptions.Item>
        <br />
        <br />
        <Descriptions.Item label="Location">{organization!.address}</Descriptions.Item>
      </Descriptions>
      <Button onClick={onDelete}>Delete Event</Button>
    </Drawer>

  );
}