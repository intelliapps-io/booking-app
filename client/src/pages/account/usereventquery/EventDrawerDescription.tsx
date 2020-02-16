
import React, {useState} from 'react';
import {Descriptions, Drawer, Button, notification } from 'antd'
import { DrawerProps } from 'antd/lib/drawer';
import { ApolloError } from 'apollo-boost';
import { Event, useDeleteEventMutation, useEventsQuery, EventsQuery, EventsQueryVariables } from '../../../lib/codegen';
import { QueryResult } from 'react-apollo';

interface EventDrawerDescriptionProps {
  VisibelState: [boolean, (state: boolean) => void]
  descrptionProps: Event
  eventsQuery: QueryResult<EventsQuery, EventsQueryVariables>
}

export const EventDrawerDescription: React.FC<EventDrawerDescriptionProps> = props => {
  const [isVisible, setToVisible] = props.VisibelState
  const [deleteEvent] = useDeleteEventMutation()
  const {refetch} = props.eventsQuery
  const onDelete = () => {
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
  }
  const onClose = () => (
    setToVisible(false)

  )
  return (
    <Drawer
      title="Basic Drawer"
      placement="right"
      closable={true} 
      onClose={onClose}
      visible={isVisible}
      width={500}
      >
      <p>{props.descrptionProps.customer.firstName}</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <Button onClick={onDelete}>Delete Event</Button>
    </Drawer>

  );
}