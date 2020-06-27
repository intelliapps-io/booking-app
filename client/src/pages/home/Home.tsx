import React, { useContext } from "react";
import "./Home.less";
import Title from "antd/lib/typography/Title";
import { Row, Col, Card, Button } from "antd";
import { AppContext } from "../../lib/helpers/AppContext";
import { Link } from "react-router-dom";

import { Footer } from "../../components/footer/Footer";
import { ServicesMap } from "./ServicesMap";
import { useServicesQuery, UserRole } from "../../lib/codegen";
import { PossibleFragmentSpreads } from "graphql/validation/rules/PossibleFragmentSpreads";
import { userInfo } from "os";
import { OrganizationInfo } from "./OrganizationInfo";

interface IProps {

}

export const Home: React.FC<IProps> = props => {
  const { organization, user } = useContext(AppContext)
  if (organization) {
    
  }
  // show nothing on loading
  if (!organization)
    return <div  />
  // destructure display variables
  const { name,landingHtml, phone, address, contactEmail, hoursOfOperation } = organization


  return (
    <div className="home-root">
      <div className='herolanding'>
        <div className='intro-wrap' id='name'></div>
        {/* <div className='intro-wrap' id='name'>{name}</div> */}
        <div className='intro-wrap'>
          <div style={{width: '90%', margin: '15% auto' }}>
            <p className='catchphrase' style={{}}>Exceptional Services</p>
            <p className='support' style={{ }}>Provided to you how and when<br/> you want.</p>
            <Link
              to="/events">
                <Button type="primary" style={{ boxSizing: 'content-box',  padding: '3px 30px', marginTop: '15px' }}>
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <OrganizationInfo />
      {(() => {
        if (UserRole.Customer) {
          return <div style={{ textAlign: 'center', color: 'rgb(59, 104, 230)', fontSize: '1.5em', fontWeight:'bold'}}>Services</div>
        }
      })()}
      
      {(() => {
        if (UserRole) {
          return <div className='herocontent'>
           <div className='innerherocontent'> <ServicesMap /></div>
          </div>
        }
      })()}
      {/* <div className='people'>
        <span>What people are saying . . .</span>
        
      </div> */}
      <Footer />
    </div>
  );
}