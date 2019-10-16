import React from "react";
import { useUsersQuery, User } from "../../lib/codegen";
import { Spin, Alert, List, Typography } from "antd";

interface IProps {

}

export const Account: React.FC<IProps> = props => {
  const { loading, error, data } = useUsersQuery({
    variables: {
      data: {
        limit: 10,
        offset: 0
      }
    }
  })

  if (loading)
    return <Spin />
  if (error)
    return <Alert message={error.message} type="error" />

  const users = data ? data.users.items : []
  
  return (
    <div>
      <h2>Account</h2>
      <List
        bordered
        dataSource={users}
        header={<h3>Users List</h3>}
        renderItem={user => (
          <List.Item>
            <Typography.Text mark>{user.role}</Typography.Text> {user.email}
          </List.Item>
        )}
        style={{
          width: 500,
          margin: 10
        }}
      />
    </div>
  );
}