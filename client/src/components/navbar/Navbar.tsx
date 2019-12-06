import "./Navbar.less"
import React, { useContext } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Menu, Icon, Layout } from "antd";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../../lib/codegen";
import { AppContext } from "../../lib/helpers/AppContext";

interface NavbarProps extends RouteComponentProps {

}

const _Navbar: React.FC<NavbarProps> = props => {
  const [logout] = useLogoutMutation()//gql hook
  const { user, meQuery } = useContext(AppContext)

  const handleLogout = () => logout().then(() => meQuery.refetch())

  function PublicMenu() {
    return [
      <Menu.Item key="/login"><Link to="/login">Login</Link></Menu.Item>,
      <Menu.Item key="/signup"><Link to="/signup">Signup</Link></Menu.Item>,
    ]
  }

  function UserMenu() {
    return [
      <Menu.Item key="/events"><Link to="/events"><Icon type="calendar"/> Events</Link></Menu.Item>,
      <Menu.Item key="/account"><Link to="/account"><Icon type="user"/> Account</Link></Menu.Item>,
      <Menu.Item key="4" className="account" onClick={() => handleLogout()}>
        <Icon type="logout" /> Logout
      </Menu.Item>
    ]
  }

  return (
    <div>
      <Layout.Header className="navbar">
        <Link to="/"><div className="logo"></div></Link>
        <Menu className="menu" theme="dark" mode="horizontal" selectedKeys={[props.location.pathname]}>
          {user && user.id ? UserMenu() : PublicMenu()}
        </Menu>
      </Layout.Header>
    </div>
  );
}

export const Navbar = withRouter(_Navbar)