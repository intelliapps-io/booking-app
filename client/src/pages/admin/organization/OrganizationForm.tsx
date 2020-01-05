import React, { useContext } from 'react';
import { AppContext } from '../../../lib/helpers/AppContext';
import { FormComponentProps } from "antd/lib/form";
import {Form, PageHeader, Spin, Input, Button } from 'antd'
import { useUpdateOrganizationMutation, Organization } from '../../../lib/codegen';

interface OrganizationFormProps {

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

const _OrganizationForm: React.FC<OrganizationFormProps & FormComponentProps> = props => {
  const { organization } = useContext(AppContext)// global varables react
  const [updateOrganization] = useUpdateOrganizationMutation()
  if (!organization) return <Spin />

  const {getFieldDecorator} = props.form
  
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.form.validateFields((errors, values: Organization) => {
      if (!errors) {
        console.log(values)
        updateOrganization({
          variables: {
            data: {
              name: values.name,
              address: organization.address,
              phone: organization.phone,
              contactEmail: organization.contactEmail,
              hoursOfOperation: organization.hoursOfOperation,
              landingHtml: organization.landingHtml,
              urlName: organization.urlName,
            },
            id: organization.id
          }
        })  
      }
 
    })

  }
  return(
    <div>
      <PageHeader title={organization.name}></PageHeader>
      <Form {...formItemLayout} onSubmit={handleFormSubmit}>

        <Form.Item label='First name'>
          {getFieldDecorator('name', {
            rules: [{ min: 2, message: 'name lenght must be 3 or more' }, { required: true }],
            initialValue: organization.name
          })(
            <Input placeholder='organization name' />
          )}
        </Form.Item>

        <Button type="primary" htmlType="submit" >
          Submit
        </Button> 
      </Form>  


    </div>
  );
}
export const OrganizationForm = Form.create<OrganizationFormProps & FormComponentProps>(

)(_OrganizationForm);
  