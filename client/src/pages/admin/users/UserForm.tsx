import React from "react";
import { Form, Input, Select, PageHeader, Button } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import { UserRole, User } from "../../../lib/codegen";
// no api call in forms
interface UserFormProps {
  onSubmit: (data: User & { password: string } ) => void;//form may not always return password
  onDelete?: (id: string) => void
  userData?: User
  onNewUser: () => void
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  }
}

const _UserForm: React.FC<UserFormProps & FormComponentProps> = props => {
  const { getFieldDecorator } = props.form
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.form.validateFields((errors, values) => {
      if (!errors) {
        if (props.userData) {
        props.onSubmit({...props.userData, ...values})//if there is a change merge userData
        }
        else {
          props.onSubmit(values)
        }
      }
 
    })

  }
  const initializeForm = () => {
    if (props.userData) {
      props.form.setFieldsValue({
        firstName: props.userData.firstName,
        lastName: props.userData.lastName,
        email: props.userData.email,
        role: props.userData.role
      })
    }
  }
  return (
    <div>
      <PageHeader title={props.userData ? props.userData.name : 'Create user'}></PageHeader>
      <Form {...formItemLayout} onSubmit={handleFormSubmit}>

        <Form.Item label='First name'>
          {getFieldDecorator('firstName', {
            rules: [{min: 2, message: 'name lenght must be 3 or more'}, {required: true}]
          })(
            <Input placeholder='first name' />
          )}
        </Form.Item>
        <Form.Item label='Last name'>
          {getFieldDecorator('lastName', {
            rules: [{min: 2, message: 'name lenght must be 3 or more'},{required: true}]
          })(
            <Input placeholder='last name' />
          )}
        </Form.Item>
        <Form.Item label='Email'>
          {getFieldDecorator('email', {
            rules: [{ type: 'email', message: 'The input is not valid E-mail!' }, { required: true }]
          })(
            <Input placeholder='email' />
          )}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [{
                
                required: true,
                message: 'Please input ',
              },
            ],
          })(<Input.Password placeholder='password' />)}
        </Form.Item>
        <Form.Item label='Role'>
          {getFieldDecorator('role', {
            rules: [{ required: true }]
          })(
            <Select
              style={{
              width: 150
              }}
            >
            <Select.Option value={UserRole['Admin']}>Admin</Select.Option>
            <Select.Option value={UserRole['Employee']}>Employee</Select.Option>
          </Select>
          )}
        </Form.Item>
        <Button type="primary" htmlType="submit" >
          Submit
        </Button> 
        <Button onClick={initializeForm}>
          cancel
        </Button> 
        
        {props.onDelete && props.userData && <Button type="danger" onClick={() => props.onDelete!(props.userData!.id)}>
          Delete
        </Button>}
        
       {props.userData && <Button onClick={props.onNewUser}> 
          Create user
        </Button> }
      </Form>
    </div>  
  );
}

export const UserForm = Form.create<UserFormProps & FormComponentProps>({
  mapPropsToFields: props => {
    if (props.userData) return (
      {
        firstName: Form.createFormField({ value: props.userData.firstName }),
        lastName: Form.createFormField({ value: props.userData.lastName }),
        email: Form.createFormField({ value: props.userData.email }),
        role: Form.createFormField({value: props.userData.role})
      }
    )
  }
})(_UserForm);