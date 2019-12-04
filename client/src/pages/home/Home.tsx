import React from "react";
import "./Home.less";
import Title from "antd/lib/typography/Title";
import { Row, Col, Card } from "antd";

interface IProps {

}

export const Home: React.FC<IProps> = props => {
  return (
    <div className="home-root">
      <Title className="home-title">Welcome to My App</Title>
      <h1>HomePage</h1>
    </div>
  );
}