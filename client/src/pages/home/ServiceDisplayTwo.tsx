import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "antd";
import { Service, ServicesQuery, ServiceQueryVariables } from '../../lib/codegen';
import { QueryResult } from 'react-apollo';

interface ServiceDisplayTwoProps {
  service: Service
  servicesQuery: QueryResult<ServicesQuery, ServiceQueryVariables>

}

export const ServiceDisplayTwo: React.FC<ServiceDisplayTwoProps> = props => {
  const { name, cost, description } = props.service
  return(
    <div className='contentwrap'>
          <div className='contentpic'></div>
          <div className='contenttext'>
            <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{name}</p>
            <p style={{ fontSize: '1em', }}>Price: ${cost}</p>
            <p style={{ fontSize: '1em', width: '80%' }}>{description}</p>
            <Link
              to="/events">
              <Button type="primary" style={{ boxSizing: 'content-box',  padding: '3px 20px', marginTop: '15px' }}>
                Book Now
              </Button>
            </Link>
          </div>
        </div>
  );
}