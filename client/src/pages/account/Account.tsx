import React, { useContext } from "react";
import { UserRole, User } from "../../lib/codegen";
import { Spin, Alert, List, Typography, Form } from "antd";
import SplitPane from "react-split-pane"
import { AppContext } from "../../lib/helpers/AppContext";
import { UserForm } from "../admin/users/UserForm";
import {UserAccountForm } from './useraccountform/UserAccountForm'
import '../account/Account.less'



interface IProps {

}


export const Account: React.FC<IProps> = props => {
  const {user} = useContext(AppContext);
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
        
        <SplitPane split="vertical" minSize={50} defaultSize={100}>
          <div>
            <h3>Appointments</h3>
          </div>
          <div style={{width: '80%', margin: 'auto'}}>
            <h3 style={{}}>Your information</h3>
            <div>
              <UserAccountForm />
            </div>
          </div>
          {/* {adminAccount()} */}
        </SplitPane>

      </div>
      
    </div>
  );
}