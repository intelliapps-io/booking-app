import React, { useContext } from "react";
import "./Home.less";
import Title from "antd/lib/typography/Title";
import { Row, Col, Card, Button } from "antd";
import { AppContext } from "../../lib/helpers/AppContext";
import { Link } from "react-router-dom";

interface IProps {

}

export const Home: React.FC<IProps> = props => {
  const { organization } = useContext(AppContext)
  
  // show nothing on loading
  if (!organization)
    return <div />
  
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
              <Button type="primary" style={{ width: '30%', boxSizing: 'content-box', padding: '6px 0' }}>
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <h1>hello</h1>
      </div>
      {/* <div className="footer">
        <h1>HomePage</h1>
        <h3>{phone}</h3>
        <h3>{address}</h3>
        <h3>contact us {contactEmail}</h3>
      </div> */}
      {/** Custom Organizaton HTML */}
      {/* <div dangerouslySetInnerHTML={{ __html: landingHtml }}/> */}
    </div>
  );
}