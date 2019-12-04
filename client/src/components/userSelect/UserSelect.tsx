import React from "react";
import { useUsersQuery, UserRole } from "../../lib/codegen";
import { Alert, Select } from "antd";

interface UserSelectProps {
  role: UserRole
  style?: React.CSSProperties
  onChange?: (value: string) => void
}

export const UserSelect: React.FC<UserSelectProps> = props => {
  const { error, data } = useUsersQuery({
    variables: {
      data: {
        limit: 100,
        offset: 0,
        role: props.role
      }
    }
  })

  if (error)
    return <Alert message={error.message} type="error" />

  const users = data ? data.users.items : []

  return(
    <Select<string>
      style={props.style}
      placeholder="Select an Employee"
      showSearch={true}
      onChange={props.onChange}
      filterOption={(input, option) => {
        if (option.props.children && typeof option.props.children === 'string') {
          return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        } else return false
      }}
    >
      {users.map(user =>
        <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>)}
    </Select>
  );
}