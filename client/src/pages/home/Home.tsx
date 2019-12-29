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
      <div className='intro-wrap'>
        hello
      </div>
      <div className='intro-wrap'>
        <p>Exceptional Services</p>
        <h1>Provided to you how and how you want.</h1>
        <Link
          to="/events">
          <Button type="primary">
            Book Now
          </Button>
        </Link>
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