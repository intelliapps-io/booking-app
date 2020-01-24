import React, { useContext } from 'react';
import { Descriptions } from 'antd'
import { AppContext } from '../../../lib/helpers/AppContext';
import { useEventQuery, useEventsQuery } from '../../../lib/codegen';
import {EventDescriptionWrap} from './EventDescriptionWrap'

interface QueryUserEventProps {
  

}
//antd data display

export const QueryUserEvent: React.FC<QueryUserEventProps> = props => {
  //client appointment query
  const eventsQuery = useEventsQuery({
    variables: {
      data: {
        limit: 10,
        offset: 0
      }
    }
    
  })  

  if (!eventsQuery.data || !eventsQuery.data.queryEvents) {
    return <div>no content</div>
  }
  const { items, total } = eventsQuery.data.queryEvents// how most querys shoould work
  console.log(items);

    if(items) {
      return (
        <div style={{width: '40%'}}>
          {items.map((item) =>
            <EventDescriptionWrap key={item.id} event={item as any} />
          )}
        </div>
        
      )
    }
  return (
    <div>
    
    </div>
  );

}
