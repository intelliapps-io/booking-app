//tsfrc
import React, { useContext } from "react";
import { useCreateServiceMutation, useDeleteServiceMutation, Service } from "../../../../lib/codegen";
import { Form, PageHeader, Spin, Input, Button, TimePicker, notification, Icon, Alert, Divider, Tabs, InputNumber } from 'antd';
import { ServicePriceForm } from './ServicePriceForm'
import { FormComponentProps } from "antd/lib/form";
import { AppContext } from "../../../../lib/helpers/AppContext";
import TextArea from "antd/lib/input/TextArea";

interface ServicesFormProps {
 
}

interface formData {
  name: string;
  cost: number;
  description?: string | null | undefined;
  UPCCode?: string | null | undefined;
  id: string;
  duration: number;
  employeeIds: string[]
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
const _ServicesForm: React.FC<FormComponentProps & ServicesFormProps> = props => {
  const { getFieldDecorator, getFieldsValue } = props.form
  const { organization } = useContext(AppContext)// global varables
  const [createService] = useCreateServiceMutation()
  const [deleteService] = useDeleteServiceMutation()

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = getFieldsValue() as formData

      createService({
        variables: {
          data: {
            name: formData.name,
            cost: formData.cost,
            duration: formData.duration,
            employeeIds: formData.employeeIds,
            UPCCode: formData.UPCCode,
            description: formData.description
          }
        }
      })
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          console.error(err)
        })    

  }

  return(
    <div>
      <Form {...formItemLayout}  onSubmit={handleFormSubmit} className='form'>
      <Form.Item label='Service'>
        {getFieldDecorator('name', {
          rules: [{ min: 2, message: 'create service' }, { required: true }],

        })(
          <Input placeholder='create service' />
        )}
        </Form.Item>
        <Form.Item label='cost'>
        {getFieldDecorator('cost', {
          rules: [{ message: 'create price' }, { required: true }],
          
          initialValue: 0
        })(
          
          <ServicePriceForm />
        )}
        </Form.Item>
        <Form.Item label='description'>
        {getFieldDecorator('description', {
          rules: [{ message: 'Description reqired' }, { required: true }],
          initialValue: 0,
        })(
          <TextArea />
        )}
        </Form.Item>
        
      <div className='btn'>
        <Button type="primary" htmlType="submit" style={{padding: '6px 20px'}}  >
          Submit
        </Button>
      </div>
    </Form>
    </div>
  );
}
export const ServicesForm = Form.create<ServicesFormProps & FormComponentProps>(

  )(_ServicesForm);