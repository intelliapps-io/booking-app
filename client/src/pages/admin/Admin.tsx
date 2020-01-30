import './Admin.less'
import React, { useContext } from "react";
import { AppContext } from '../../lib/helpers/AppContext';
import { UserRole } from '../../lib/codegen';
import { Route, Switch } from 'react-router-dom';
import { useRedirectError } from '../../lib/helpers/hooks/useRedirectError';
import { AdminDashboard } from './dashboard/AdminDashboard';
import { UsersList } from './users/UsersList';
import { OrganizationForm } from './organization/OrganizationForm';

interface AdminProps {

}

export const Admin: React.FC<AdminProps> = props => {
  const { user, meQuery } = useContext(AppContext)
  const { renderRedirectError } = useRedirectError()

  if ((!meQuery.loading && user && user.role !== UserRole['Admin']) || (!meQuery.loading && !user))
    return <div>{renderRedirectError({ message: 'You are not authorized to access admin', title: 'Error 422' })}</div>

  return (
    <div className="admin-wrapper">
      <Switch>
        <Route path="/admin/dashboard" component={AdminDashboard}/>
        <Route path="/admin/users" component={UsersList} />
        <Route path="/admin/org" component={OrganizationForm}/>
      </Switch>
    </div>
  );
}