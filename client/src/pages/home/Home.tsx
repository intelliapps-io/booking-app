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
  const {landingHtml, phone, address, contactEmail, hoursOfOperation } = organization


  return (
    <div className="home-root">
      <div className='herolanding'>
        <div className='intro-wrap'></div>
        <div className='intro-wrap'>
          <div style={{width: '90%', margin: '15% auto' }}>
            <p style={{fontSize: '3em', fontWeight: 'bold', marginBottom: '20px'}}>Exceptional Services</p>
            <p style={{ fontSize: '1.5em' }}>Provided to you how and when<br/> you want.</p>
            <Link
              to="/events">
                <Button type="primary" style={{ boxSizing: 'content-box',  padding: '3px 30px', marginTop: '15px' }}>
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <OrganizationInfo/>
      {(() => {
        if (UserRole) {
          return <div className='herocontent'><ServicesMap/></div>
        }
      })()}
      <div className='people'>
        <span>What people are saying . . .</span>
        
      </div>
      <Footer />
    </div>
  );
}