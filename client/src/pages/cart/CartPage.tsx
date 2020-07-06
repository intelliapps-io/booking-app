import React, { useContext } from "react";
import { AppContext } from "../../lib/helpers/AppContext";
import { useServicesQuery, ServiceFragment } from "../../lib/codegen";
import { List, Button } from "antd";

export const CartPage: React.FC = props => {
  const { cartReducer } = useContext(AppContext)
  const [cartState, cartDispatch] = cartReducer

  const servicesQuery = useServicesQuery({ variables: { data: { limit: 1000 } } })
  const services = servicesQuery.data && servicesQuery.data.services ? servicesQuery.data.services.items : []
  return (
    <div>
      <h2>CartPage</h2>
      <hr />
      <h3>Available Services </h3>
      <List<ServiceFragment>
        dataSource={services}
        renderItem={(service) => <div style={{ display: 'inline' }}>
          <h4>{service.name} - ${service.cost}</h4>
          <Button icon='plus' onClick={() => cartDispatch({ type: 'addService', payload: { serviceId: service.id }})}/>
        </div>}
      />
      <hr />
      <h3>Your Cart </h3>
      <List<{ serviceId: string }>
        dataSource={cartState.services}
        renderItem={({ serviceId }) => {
          const service = services.find(({ id }) => id === serviceId)
          if (!service)
            return <div>Service No Longer Available</div>
          return <div style={{ display: 'inline' }}>
            <h4>{service.name} - ${service.cost}</h4>
            <Button icon='minus' onClick={() => cartDispatch({ type: 'removeService', payload: { serviceId: service.id }})} />
          </div>
        }}
      />
    </div>
  );
}