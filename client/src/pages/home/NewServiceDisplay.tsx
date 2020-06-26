import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { Service, ServicesQuery, ServiceQueryVariables } from "../../lib/codegen";
import { QueryResult } from "react-apollo";

interface NewServiceDisplayProps {
  service: Service
  servicesQuery: QueryResult<ServicesQuery, ServiceQueryVariables>
}

export const NewServiceDisplay: React.FC<NewServiceDisplayProps> = props => {
  const { name, cost, description } = props.service
  return(
    <div className='contentwrap'>
      <div className='contentpic'></div>
      <div className='contenttext'>
        <p style={{ fontSize: '1.2em', fontWeight: 'bold', margin: '2px 0' }}>{name}</p>
        <p className='pricedesc' style={{ fontSize: '1em', padding: '0', margin: '1.5px 0' }}>Price: ${cost}</p>
        <p className='pricedesc' style={{ fontSize: '1em', padding: '0' }}>{description}</p>
        <Link
          to="/events">
          <Button className='button' type="primary" style={{ boxSizing: 'content-box', padding: '2px 30px', marginTop: '8px' }}>
            Book Now
          </Button>
        </Link>
      </div>
    </div>
  );
}