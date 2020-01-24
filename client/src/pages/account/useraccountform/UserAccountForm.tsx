import React, { useContext } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Spin,Form, Input, Icon, Button, message, notification } from 'antd';
import { AppContext } from '../../../lib/helpers/AppContext';
import { UserRole, User, useUpdateUserMutation } from '../../../lib/codegen';
import { validate } from 'graphql';
import { callbackify } from 'util';

interface UserAccountFormProps {

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


const _UserAccountForm: React.FC<UserAccountFormProps & FormComponentProps> = props => {
  const { user } = useContext(AppContext);
  const [UpdateUser] = useUpdateUserMutation({})
  if (!user) return <Spin />
  const { getFieldDecorator } = props.form

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.form.validateFields((error: any, values: User) => {
      if (!error) {
        UpdateUser({
          variables: {
            data: {
              userId: user.id,
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email
            },
          }
        })
          .then((values) => {
          notification['success']({ message: 'Account updated'})
        })
        
      }
    })
  }


  return (
    <div style={{}}>
      <Form {...formItemLayout} onSubmit={handleSubmit} style={{}}>
        <Form.Item label='First Name'>
          {getFieldDecorator('firstName', {
            rules: [{ required: true }],
            initialValue: user.firstName
          })(
            <Input disabled={user.role === UserRole.Admin || user.role === UserRole.Employee } placeholder='First Name'/>
          )}
        </Form.Item>
        <Form.Item label='Last Name'>
          {getFieldDecorator('lastName', {
            rules: [{ required: true }],
            initialValue: user.lastName
          })(
            <Input disabled={user.role === UserRole.Admin || user.role === UserRole.Employee} placeholder='Last Name'/>
          )}
        </Form.Item>
        <Form.Item label='Email'>
          {getFieldDecorator('email', {
            rules: [{ type: 'email', message: 'The input is not valid E-mail!' }, { required: true }],
            initialValue: user.email
          })(
            <Input disabled={user.role === UserRole.Admin || user.role === UserRole.Employee} placeholder='email' />
          )}
        </Form.Item>
        {/* <Form.Item label='Password'>
          {getFieldDecorator('password', {
            rules: [
               { required: true },
            ],
            
          })(
            <Input.Password placeholder='password' />
          )}
        </Form.Item>
        <Form.Item label=' Confirm Password'>
          {getFieldDecorator('confirm', {
            rules: [
             { required: true },
             {
              validator: (rule, value: string) => {
              return value === props.form.getFieldValue('password')
            }, message: 'password must match'}
            ],
          })(
            <Input.Password placeholder='password' />
          )}
        </Form.Item> */}
        
        <Button type="primary" htmlType="submit" >
          Submit
        </Button>
        
      </Form>
    </div>
  );
}
export const UserAccountForm = Form.create<UserAccountFormProps & FormComponentProps>(

)(_UserAccountForm)