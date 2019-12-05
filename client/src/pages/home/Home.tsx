import React, { useContext } from "react";
import "./Home.less";
import Title from "antd/lib/typography/Title";
import { Row, Col, Card } from "antd";
import { AppContext } from "../../lib/helpers/AppContext";

interface IProps {

}

export const Home: React.FC<IProps> = props => {
  const { organization } = useContext(AppContext)
  if (!organization)
    return <div />
  return (
    <div className="home-root">
      <Title className="home-title">Welcome to My App</Title>
      <h1>HomePage</h1>
    </div>
  );
}