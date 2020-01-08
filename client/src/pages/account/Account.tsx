import React, { useContext } from "react";
import { } from "../../lib/codegen";
import { Spin, Alert, List, Typography } from "antd";
import { AppContext } from "../../lib/helpers/AppContext";

interface IProps {

}

export const Account: React.FC<IProps> = props => {
  const {user} = useContext(AppContext);
  if (!user)
    return <Spin />

  return (
    <div>
      <h2>Account</h2>
      <h3>{user.firstName}</h3>
      
    </div>
  );
}