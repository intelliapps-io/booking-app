import React, { useContext, useState } from 'react';
import { AppContext } from '../../../lib/helpers/AppContext';
import { FormComponentProps } from "antd/lib/form";
import { Form, PageHeader, Spin, Input, Button, TimePicker, notification, Icon, Alert, Divider } from 'antd'
import { useUpdateOrganizationMutation, Organization } from '../../../lib/codegen';
import { transformHoursOfOperation } from './organizationFormHelpers';
import { validateUrlName } from '../../../lib/helpers/helpers'
import moment from 'moment';
import './Organization.less'
import { ApolloError } from 'apollo-boost';
import { RichTextEditor } from '../../../components/richTextEditor/RichTextEditor';

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
  const { organization, meQuery } = useContext(AppContext)// global varables react
  const [urlLocked, setUrlLocked] = useState(true)
  const [updateOrganization] = useUpdateOrganizationMutation()
  if (!organization) return <Spin />

  const { getFieldDecorator } = props.form

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.form.validateFields((errors, values: Organization) => {
      const data = {
        name: values.name,
        address: values.address,
        phone: values.phone,
        contactEmail: values.contactEmail,
        hoursOfOperation: transformHoursOfOperation(values),
        landingHtml: values.landingHtml,
        urlName: values.urlName,
      }

      if (!errors) {
        updateOrganization({
          variables: {
            data,
            id: organization.id
          }
        })
          .then((value) => {
            notification['success']({ message: 'Organization has been saved' })
            meQuery.refetch()
            if (value) {
              
            }
          })
          .catch((error: ApolloError) => notification['error']({ message: error.message }))
      }
    })

  }
  return (
    <div className='formwrap'>
      <div className='companytitle'>{organization.name}</div>
      <Form {...formItemLayout} onSubmit={handleFormSubmit} style={{ width: '80%', margin: '0 auto' }}>
        <Form.Item label='Name'>
          {getFieldDecorator('name', {
            rules: [{ min: 2, message: 'name lenght must be 3 or more' }, { required: true }],
            initialValue: organization.name
          })(
            <Input placeholder='organization name' />
          )}
        </Form.Item>
        <Form.Item label='URL Name'>
          {getFieldDecorator('urlName', {
            rules: [
              {
                min: 3, message: 'name lenght must be 3 or more'
              },
              {
                required: true
              },
              {
                validator: (rule, value) => validateUrlName(value)
              }
            ],
            initialValue: organization.urlName
          })(
            <Input disabled={urlLocked} placeholder='subdomain of your organization' addonBefore={<Icon onClick={() => setUrlLocked(!urlLocked)} type={urlLocked ? 'lock' : 'unlock'} />} />
          )}
          {!urlLocked && <Alert type='error' message={<span>Changing url name will change the entire domain of your organization and website. <br /> <b>PROCEED WITH EXTREME CAUTION!</b></span>} />}
        </Form.Item>
        <Form.Item label='Address'>
          {getFieldDecorator('address', {
            rules: [{ min: 2, message: 'please enter organization address' }, { required: true }],
            initialValue: organization.address
          })(
            <Input placeholder='organization address' />
          )}
        </Form.Item>
        <Form.Item label='Phone Number' >
          {getFieldDecorator('phone', {
            rules: [{ min: 10, message: 'please enter organization phone number' }, { required: true }],
            initialValue: organization.phone
          })(
            <Input placeholder='organization phone number' />
          )}
        </Form.Item>
        <Form.Item label='Contact Email' >
          {getFieldDecorator('contactEmail', {
            rules: [{ min: 10, message: 'please enter organization contact email' }, { required: true }],
            initialValue: organization.contactEmail
          })(
            <Input placeholder='organization phone contact email' />
          )}
        </Form.Item>
        {/* monday */}
        <p style={{ padding: '2px 0', fontSize: '1.5em', textAlign: 'center' }}>Hours of Opperation</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Form.Item label="Mon Start" style={{ margin: '0 2%' }}>
            {getFieldDecorator('monday_start', {
              rules: [{ required: true }],
              initialValue: moment().startOf('day').add(organization.hoursOfOperation.monday.start, "minutes")//moment takes number object and converts to time by using start of day 00 to value entered 0900

            })(<TimePicker format=" HH:mm" style={{ marginLeft: '2%', width: '90%' }} />)
            }
          </Form.Item >
          <Form.Item label="Mon End" style={{}}>
            {getFieldDecorator('monday_end', {
              rules: [{ required: true }],
              initialValue: moment().startOf('day').add(organization.hoursOfOperation.monday.end, "minutes")

            })(<TimePicker format=" HH:mm" style={{ marginLeft: '2%', width: '90%' }} />)
            }
          </Form.Item>
        </div>
        {/* tuesday */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Form.Item label="Tue Start" style={{ margin: '0 2%' }}>
            {getFieldDecorator('tuesday_start', {
              rules: [{ required: true }],
              initialValue: moment().startOf('day').add(organization.hoursOfOperation.tuesday.start, "minutes")

            })(<TimePicker format=" HH:mm" style={{ marginLeft: '2%', width: '90%' }} />)
            }
          </Form.Item >
          <Form.Item label="Tue End" style={{}}>
            {getFieldDecorator('tuesday_end', {
              rules: [{ required: true }],
              initialValue: moment().startOf('day').add(organization.hoursOfOperation.tuesday.end, "minutes")

            })(<TimePicker format=" HH:mm" style={{ marginLeft: '2%', width: '90%' }} />)
            }
          </Form.Item>
        </div>
        {/* wednesday */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Form.Item label="Wed Start" style={{ margin: '0 2%' }}>
            {getFieldDecorator('wednesday_start', {
              rules: [{ required: true }],
              initialValue: moment().startOf('day').add(organization.hoursOfOperation.wednesday.start, "minutes")

            })(<TimePicker format=" HH:mm" style={{ marginLeft: '2%', width: '90%' }} />)
            }
          </Form.Item >
          <Form.Item label="Wed End" style={{}}>
            {getFieldDecorator('wednesday_end', {
              rules: [{ required: true }],
              initialValue: moment().startOf('day').add(organization.hoursOfOperation.wednesday.end, "minutes")
            })(<TimePicker format=" HH:mm" style={{ marginLeft: '2%', width: '90%' }} />)
            }
          </Form.Item>
        </div>
        {/* Thurdays */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Form.Item label="Thu Start" style={{ margin: '0 2%' }}>
            {getFieldDecorator('thursday_start', {
              rules: [{ required: true }],
              initialValue: moment().startOf('day').add(organization.hoursOfOperation.thursday.start, "minutes")
            })(<TimePicker format=" HH:mm" style={{ marginLeft: '2%', width: '90%' }} />)
            }
          </Form.Item >
          <Form.Item label="Thu End" style={{}}>
            {getFieldDecorator('thursday_end', {
              rules: [{ required: true }],
              initialValue: moment().startOf('day').add(organization.hoursOfOperation.thursday.end, "minutes")
            })(<TimePicker format=" HH:mm" style={{ marginLeft: '2%', width: '90%' }} />)
            }
          </Form.Item>
        </div>
        {/* Fridays */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Form.Item label="Fri Start" style={{ margin: '0 2%' }}>
            {getFieldDecorator('firday_start', {
              rules: [{ required: true }],
              initialValue: moment().startOf('day').add(organization.hoursOfOperation.friday.start, "minutes")
            })(<TimePicker format=" HH:mm" style={{ marginLeft: '2%', width: '90%' }} />)
            }
          </Form.Item >
          <Form.Item label="Fri End" style={{}}>
            {getFieldDecorator('friday_end', {
              rules: [{ required: true }],
              initialValue: moment().startOf('day').add(organization.hoursOfOperation.friday.end, "minutes")
            })(<TimePicker format=" HH:mm" style={{ marginLeft: '2%', width: '90%' }} />)
            }
          </Form.Item>
        </div>
        {/* Saturday */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Form.Item label="Sat Start" style={{ margin: '0 2%' }}>
            {getFieldDecorator('saturday_start', {
              rules: [{ required: true }],
              initialValue: moment().startOf('day').add(organization.hoursOfOperation.saturday.start, "minutes")
            })(<TimePicker format=" HH:mm" style={{ marginLeft: '2%', width: '90%' }} />)
            }
          </Form.Item >
          <Form.Item label="Sat End" style={{}}>
            {getFieldDecorator('saturday_end', {
              rules: [{ required: true }],
              initialValue: moment().startOf('day').add(organization.hoursOfOperation.saturday.end, "minutes")
            })(<TimePicker format=" HH:mm" style={{ marginLeft: '2%', width: '90%' }} />)
            }
          </Form.Item>
        </div>
        {/* Sunday */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Form.Item label="Sun Start" style={{ margin: '0 2%' }}>
            {getFieldDecorator('sunday_start', {
              rules: [{ required: true }],
              initialValue: moment().startOf('day').add(organization.hoursOfOperation.sunday.start, "minutes")

            })(<TimePicker format=" HH:mm" style={{ marginLeft: '2%', width: '90%' }} />)
            }
          </Form.Item >
          <Form.Item label="Sun End" style={{}}>
            {getFieldDecorator('sunday_end', {
              rules: [{ required: true }],
              initialValue: moment().startOf('day').add(organization.hoursOfOperation.sunday.end, "minutes")

            })(<TimePicker format=" HH:mm" style={{ marginLeft: '2%', width: '90%' }} />)
            }
          </Form.Item>
        </div>

        <Button type="primary" htmlType="submit" >
          Submit
        </Button>

        <Divider />

        <Form.Item>
          {getFieldDecorator('landingHtml', {
            valuePropName: 'value',
            getValueFromEvent: (event) => event,
            trigger: 'onEdit',
            initialValue: organization.landingHtml
          })(<RichTextEditor />)}
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
