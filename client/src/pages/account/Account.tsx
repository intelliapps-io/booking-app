import React, { useContext } from "react";
import { UserRole, User } from "../../lib/codegen";
import { Spin, Alert, List, Typography, Form, Tabs,} from "antd";
import SplitPane from "react-split-pane"
import { AppContext } from "../../lib/helpers/AppContext";
import { UserForm } from "../admin/users/UserForm";
import {UserAccountForm } from './useraccountform/UserAccountForm'
import '../account/Account.less'
import { QueryUserEvent } from "./usereventquery/QueryUserEvents";



interface IProps {

}


export const Account: React.FC<IProps> = props => {
  const { user } = useContext(AppContext);
  const {TabPane} = Tabs
  if (!user)
    return <Spin />
  const adminAccount = () => {
    if (user.role === UserRole.Admin) return (
      <div className='admin'>
        you are admin
      </div>

    )
  };

  return (
    <div>
      <div style={{
        display: 'flex', padding: '15px 0', alignItems: 'center',
        borderBottom: '3px solid #fff', width: 'fit-content', marginBottom: '3%'
      }}>
        {user.role}: 
          <div style={{marginLeft: '3%', fontWeight: 'bold', fontSize:'1.2em', display: 'flex'}}>
          <div style={{ marginRight: '3%' }}>{`${user.lastName.charAt(0).toUpperCase()}${user.lastName.slice(1)}`}</div>
            <div>{` ${user.firstName.charAt(0).toUpperCase()}${user.firstName.slice(1)}`}</div>
          </div>
      </div>

      <div>
        <Tabs defaultActiveKey="1" tabPosition='left'>
          <TabPane tab="Over View" key="1">
            <div>
              <h3>Event List</h3>
              <QueryUserEvent/>
                
            </div>
            {/* {adminAccount()} */}
          </TabPane>
          <TabPane tab="My Calender" key="2">
            <h1> hello</h1>
          </TabPane>
          <TabPane tab="Trade Board" key="3">
            <h1> bye</h1>
          </TabPane>
          <TabPane tab="User Data" key="4">
          <h3 style={{}}>Your information</h3>
            <UserAccountForm />
          </TabPane>

        </Tabs>
      
      </div>
      
    </div>
  );
}