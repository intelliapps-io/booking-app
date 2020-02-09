import React, { useContext, ReactEventHandler } from 'react';
import { Descriptions } from 'antd'
import { AppContext } from '../../../lib/helpers/AppContext';
import { useEventQuery, useEventsQuery, UserRole } from '../../../lib/codegen';
import { EventDescriptionWrap } from './EventDescriptionWrap';
import './queryUserEvents.less'
interface QueryUserEventProps {
  

}
//antd data display

export const QueryUserEvent: React.FC<QueryUserEventProps> = props => {
  //client appointment query
  const { user } = useContext(AppContext);
  const eventsQuery = useEventsQuery({
    variables: {
      data: {
        limit: 10,
        offset: 0
      }
    }
    
  }) 
  const handleClick: ReactEventHandler = () => {
    console.log(eventsQuery.data!.queryEvents.items[0])
  }

  if (!eventsQuery.data || !eventsQuery.data.queryEvents) {
    return <div>no content</div>
  }
  const { items, total } = eventsQuery.data.queryEvents// how most querys shoould work
  console.log(items);

    if(items && user!.role === UserRole.Admin) {
      return (
        <div className='list'>
          {items.map((item) =>
            <li key={item.id} onClick={handleClick}><EventDescriptionWrap key={item.id} event={item as any} /></li>
          )}
        </div>
        
      )
    }else if(items && user!.id === user!.id && user!.role != UserRole.Admin) {
      return (
        <div className='list'>
          {items.map((item) =>
            <li key={item.id} onClick={handleClick}><EventDescriptionWrap key={item.id} event={item as any} /></li>
          )}
        </div>
        
      )
    }
    
  return (
    <div>
    
    </div>
  );

}
