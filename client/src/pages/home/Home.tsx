import React, { useContext } from "react";
import "./Home.less";
import Title from "antd/lib/typography/Title";
import { Row, Col, Card } from "antd";
import { AppContext } from "../../lib/helpers/AppContext";

interface IProps {

}

export const Home: React.FC<IProps> = props => {
  const { organization } = useContext(AppContext)
  
  // show nothing on loading
  if (!organization)
    return <div />
  
  // destructure display variables
  const { name, landingHtml, phone, address, contactEmail, hoursOfOperation } = organization


  return (
    <div className="home-root">
      <Title className="home-title">{name}</Title>

      

      <div className="footer">
        <h1>HomePage</h1>
        <h3>{phone}</h3>
        <h3>{address}</h3>
        <h3>contact us {contactEmail}</h3>
      </div>
      {/** Custom Organizaton HTML */}
      <div dangerouslySetInnerHTML={{ __html: landingHtml }}/>
    </div>
  );
}