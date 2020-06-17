import React from "react";
import { NewEventForm } from "./components/NewEventForm/NewEventForm";

interface EventsProps {

}

export const Events: React.FC<EventsProps> = props => {
  return(
    <div style={{padding: '0 3%'}}>
      <h2>Events</h2>
      <NewEventForm style={{ margin: 20 }} />
    </div>
  );
}