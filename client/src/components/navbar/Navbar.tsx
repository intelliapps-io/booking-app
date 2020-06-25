import "./Navbar.less"
import React, { useContext } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Menu, Icon, Layout } from "antd";
import { Link } from "react-router-dom";
import { useLogoutMutation, UserRole } from "../../lib/codegen";
import { AppContext } from "../../lib/helpers/AppContext";
import SubMenu from "antd/lib/menu/SubMenu";

interface NavbarProps {

}

export const Navbar: React.FC<NavbarProps> = props => {

  const { user, meQuery, organization, router } = useContext(AppContext)
  const [logout] = useLogoutMutation()//gql hook

  if (!organization) {
    return <div />
  }

  const { name } = organization

  const handleLogout = () => logout().then(() => meQuery.refetch())

  function PublicMenu() {
    return [
      <Menu.Item key="/login"><Link to="/login">Login</Link></Menu.Item>,
      <Menu.Item key="/signup"><Link to="/signup">Signup</Link></Menu.Item>,
    ]
  }

  function UserMenu() {
    let menuItems: React.ReactNode[] = [
      <Menu.Item key="/events"><Link to="/events"><Icon type="calendar" /> Events</Link></Menu.Item>,
      <Menu.Item key="/account"><Link to="/account"><Icon type="user" /> Account</Link></Menu.Item>
    ]

    if (user && user.role === UserRole['Admin'])
      menuItems.push(
        <SubMenu
          title={<Link to="/admin/dashboard"><Icon type="star" /> Admin</Link>}
        >
          <Menu.Item key="/admin/users"><Link to="/admin/users"><Icon type="team" /> Users</Link></Menu.Item>
          <Menu.Item key="/admin/org"><Link to="/admin/org"><Icon type="shop" /> Organization</Link></Menu.Item>
        </SubMenu>
      )

    menuItems.push(
      <Menu.Item key="4" className="account" onClick={() => handleLogout()}>
        <Icon type="logout" /> Logout
      </Menu.Item>
    )

    return menuItems
  }

  return (
    <div className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', alignContent: 'center' }}>
        <Link id="logolink" to="/"><div className="logo"></div></Link>
        {/* <span style={{ marginLeft: '10px', fontWeight: "bold" }}>{name}</span> */}
      </div>
      <Menu className="menu" mode="horizontal" selectedKeys={[router.location ? router.location.pathname : '']}>
        {user && user.id ? UserMenu() : PublicMenu()}
      </Menu>
    </div>
  );
}