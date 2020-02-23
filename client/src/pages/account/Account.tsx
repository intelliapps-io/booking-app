import React, { useContext } from "react";
import { UserRole, User } from "../../lib/codegen";
import { Spin, Alert, List, Typography, Form, Tabs, } from "antd";
import SplitPane from "react-split-pane"
import { AppContext } from "../../lib/helpers/AppContext";
import { UserForm } from "../admin/users/UserForm";
import { UserAccountForm } from './useraccountform/UserAccountForm'
import '../account/Account.less'
import { QueryUserEvent } from "./usereventquery/QueryUserEvents";
import { SchedulerPage } from "./schedulerPage/SchedulerPage";
import { RouteComponentProps, Link } from "react-router-dom";
const { TabPane } = Tabs

enum TabID {
  overview = 'overview',
  calender = 'calender',
  tradeboard = 'tradeboard',
  settings = 'settings'
}

interface IProps {

}

const isTabIdValid = (str?: string): boolean =>
  str === TabID['overview'] ||
  str === TabID['calender'] ||
  str === TabID['tradeboard'] ||
  str === TabID['settings']

export const Account: React.FC<IProps & RouteComponentProps<{ tabId?: TabID }>> = props => {
  const { user } = useContext(AppContext);

  if (!user)
    return <Spin />

  return (
    <div>
      <div style={{
        display: 'flex', padding: '15px 0', alignItems: 'center',
        borderBottom: '3px solid #fff', width: 'fit-content', marginBottom: '3%'
      }}>
        {user.role}:
          <div style={{ marginLeft: '3%', fontWeight: 'bold', fontSize: '1.2em', display: 'flex' }}>
          <div style={{ marginRight: '3%' }}>{`${user.lastName.charAt(0).toUpperCase()}${user.lastName.slice(1)}`}</div>
          <div>{` ${user.firstName.charAt(0).toUpperCase()}${user.firstName.slice(1)}`}</div>
        </div>
      </div>

      <div>
        <Tabs
          defaultActiveKey={props.match.params.tabId}
          activeKey={isTabIdValid(props.match.params.tabId) ? props.match.params.tabId : 'overview'}
          tabPosition='left'
          onTabClick={(tabId: TabID) => props.history.push(`/account/${tabId}`)}
        >
          <TabPane tab="Over View" key={TabID['overview']}>
            <div>
              <h3>Event List</h3>
              <QueryUserEvent />

            </div>
          </TabPane>

          <TabPane tab="My Calender" key={TabID['calender']}>
            <SchedulerPage />
          </TabPane>

          <TabPane tab="Trade Board" key={TabID['tradeboard']}>
            <h1> bye</h1>
          </TabPane>

          <TabPane tab="Settings" key={TabID['settings']}>
            <h3 style={{}}>Your information</h3>
            <UserAccountForm />
          </TabPane>

        </Tabs>

      </div>

    </div>
  );
}