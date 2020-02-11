import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from 'antd';

import { Navbar } from './components/navbar/Navbar';
import Login from "./components/account/Login";
import Signup from "./components/account/Signup";
import ConfirmAccount from "./components/account/ConfirmAccount";
import { Home } from "./pages/home/Home";
import { Account } from "./pages/account/Account";
import { useMeQuery, useOrganizationQuery } from "./lib/codegen";
import { AppContext, getOrganizationUrlName } from "./lib/helpers/AppContext";
import { Events } from "./pages/events/Events";
import { Landing } from "./pages/landing/Landing";
import { AppError } from "./pages/appError/AppError";
import { __RouterContext } from "react-router"
import { Admin } from "./pages/admin/Admin";

export const AppLayout: React.FC = props => {
  const router = React.useContext(__RouterContext)
  const organizationUrlName = getOrganizationUrlName()
  const meQuery = useMeQuery()
  const organizationQuery = useOrganizationQuery({
    variables: { data: { urlName: organizationUrlName } },
    skip: !organizationUrlName,
    onError: () => router.history.push(`/error/${encodeURI(JSON.stringify({ title: 'Organization not found!', message: 'Please make sure you typed it correctly' }))}`)
  })
  
  return (
    <AppContext.Provider value={{
      user: meQuery.data && meQuery.data.me ? meQuery.data.me : null,
      meQuery,
      organization: organizationQuery.data && organizationQuery.data.organization ? organizationQuery.data.organization : null,
      organizationQuery,
      router: router as any
    }}>
      <Layout className="app-layout">
        {/** shows for organization url */}
        {(organizationUrlName || organizationQuery.loading) && <>
          {router.location.pathname.substr(0, 6) !== '/error' && <Navbar />}
          <Layout.Content className="content app-layout-content">
            <Switch>
              <Route exact path="/login/:messageName?" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/admin/:subpage" component={Admin} />
              <Route exact path="/account/confirm/:userId" component={ConfirmAccount} />
              <Route exact path="/account/:tabId?" component={Account} />
              <Route exact path="/events" component={Events} />
              <Route exact path="/error/:data" render={({ match }) =>
                <AppError title={JSON.parse(decodeURI(match.params.data)).title} message={JSON.parse(decodeURI(match.params.data)).message} />} />
              <Route path="/" component={Home} />
            </Switch>
          </Layout.Content>
        </>}

        {/** shows for booking app index */}
        {!organizationUrlName &&
          <Layout.Content className="content app-layout-content">
            <Landing />
          </Layout.Content>
        }
      </Layout>
    </AppContext.Provider>
  );
}

export default AppLayout;