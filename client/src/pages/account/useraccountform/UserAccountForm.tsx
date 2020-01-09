import React, { useContext } from 'react';
import Form, { FormComponentProps } from 'antd/lib/form';
import { Input, Spin } from 'antd';
import { AppContext } from '../../../lib/helpers/AppContext';

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
  const { getFieldDecorator } = props.form
  const { user } = useContext(AppContext);
  if(!user) return <Spin/>
  return (
    <div>
      <Form {...formItemLayout}>
        <Form.Item label='Name'>
          {getFieldDecorator('user.name', {
            rules: [{required: true }],
          })}
        </Form.Item>
        
      </Form>
    </div>
  );
}
export const UserAccountForm = Form.create<UserAccountFormProps & FormComponentProps>(

)(_UserAccountForm)