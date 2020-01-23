import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "antd";

export interface HomeContentProps {
  
}
 
const HomeContent: React.FC<HomeContentProps> = () => {
  return ( 
    <div className='contentwrap'>
      <div className='contenttext'>
        <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>Service</p>
        <p style={{fontSize: '1.3em', width: '80%'}}>
          RandomText is a tool designers and developers
          can use to quickly grab dummy 
          text in either Lorem Ipsum or Gibberish format.
        </p>
        <Link
          to="/events">
          <Button type="primary" style={{ width: '25%', boxSizing: 'content-box', padding: '5px 0', marginTop: '20px' }}>
            Book Now
          </Button>
        </Link>
      </div>
      <div className='contentpic'></div>
    </div>
  );
}
 
export default HomeContent;