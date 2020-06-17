import React, { useContext, useState } from "react"
import { Form, DatePicker, TimePicker, InputNumber, Button, Descriptions } from "antd"
import { FormComponentProps } from "antd/lib/form"
import { UserSelect } from "../../../../components/userSelect/UserSelect"
import { UserRole, useCreateEventMutation, UserQuery, EmployeeSchedulesProps, User, useUserQuery } from "../../../../lib/codegen"
import moment, { Moment } from "moment"
import { AppContext } from "../../../../lib/helpers/AppContext"
import { Redirect } from "react-router-dom"

import "./NewEventForm.less"
import { DayPicker } from "../../../../components/dayPicker/DayPicker"
import { format } from "path"
import FormItem from "antd/lib/form/FormItem"
import { UserAccountForm } from "../../../account/useraccountform/UserAccountForm"
import TimelineItem from "antd/lib/timeline/TimelineItem"
import { create } from "domain"
import { ThankYou } from "../ThankYou"
import { ServicesSelect } from "../../../../components/servicesSelect/ServicesSelect"


interface NewEventFormProps {
  style?: React.CSSProperties
  onChange?: (day: Moment) => void
}

interface FormData {
  date: Moment
  time: Moment
  duration: number
  employeeId: string
  service: string
}

const _NewEventForm: React.FC<NewEventFormProps & FormComponentProps> = props => {
  const { getFieldDecorator, getFieldsValue } = props.form
  const [createEvent] = useCreateEventMutation()
  const { user, meQuery, organization } = useContext(AppContext)
  const isLoggedIn = user || meQuery.loading
  const [showThankYou, setShowThankyou] = useState(false)
  const employeeId = props.form.getFieldValue('employeeId') as string | undefined
  const employeeQuery = useUserQuery({
    variables: {
      id: employeeId!
    },
    skip: !employeeId
  })

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = getFieldsValue() as FormData
    const mergeDateTime = () => {
      const dateString = formData.date.format('YYYY-MM-DD')
      const timeString = formData.time.format('HH:mm:ss')
      return moment(`${dateString} ${timeString}`, 'YYYY-MM-DD HH:mm:ss')
    }
    const eventMade = () => {
      if (!formData.date) {
        window.alert('please select date')
      } else if (!formData.time) {
        window.alert('please select time')
      } else if (!formData.employeeId) {
        window.alert('please select provider')
      } else {
        if (window.confirm('confim event?')) {
          createEvent({
            variables: {
              data: {
                datetime: mergeDateTime(),
                duration: formData.duration,
                employeeId: formData.employeeId,
                // service: formData.service
              }
            }
          })
            .then(result => {
              console.log(result)
              setShowThankyou(true)
            })
            .catch(err => {
              console.error(err)
            })

        } else return false
      }
    }
    eventMade()
  }

  return (
    <Form style={props.style} onSubmit={event => onSubmit(event)}>
      {!isLoggedIn && <Redirect to="/login" />}
      {showThankYou && <Redirect to="/events/thankyou" />}
      <div className='item-selector-wrap' >
        <Form.Item style={{ margin: '0 5px 0 0', display: 'inline-block', float: 'left' }}>

          {getFieldDecorator('date', {
            rules: [{ required: true, message: 'Date required' }]
          })(
            <DayPicker style={{ width: 'fit-content' }} />
          )}
        </Form.Item>
        <div className='innerwrap'>
          <div className='innerformwrap' style={{}}>
          <Form.Item style={{ float: 'left', marginRight: '8px' }}>
              {getFieldDecorator('service', {
                rules: [{ required: true, message: 'service required' }]
              })(
                <ServicesSelect style={{width: 100}} />
              )}
            </Form.Item>
            <Form.Item style={{ float: 'left', marginRight: '8px' }}>
              {getFieldDecorator('time', {
                rules: [{ required: true, message: 'time required' }]
              })(
                <TimePicker use12Hours={true} format='h:mm a' style={{ minWidth: 175 }} />
              )}
            </Form.Item>
            <Form.Item style={{ float: 'left', marginRight: '8px' }}>
              <span>Duration: </span>{getFieldDecorator('duration', {
                rules: [{ required: true }],
                initialValue: 30
              })(
                <InputNumber min={30} max={60} step={15} />
              )}
            </Form.Item>
            <Form.Item style={{ float: 'left', }}>
              {getFieldDecorator('employeeId', {
                rules: [{ required: true, message: 'provider required' }]
              })(
                <UserSelect role={UserRole['Employee']} style={{ width: 180 }} />
              )}
            </Form.Item>
          </div>
          <div className='innerformwrap' style={{}}>
            <div className='eventoutline' style={{}} >
              <Descriptions title="Appointment Status">
                <Descriptions.Item label="Date">
                  {(() => {
                    const date = props.form.getFieldValue('date') as Moment
                    if (date) {
                      return date.format('MM/DD/YYYY')
                    } else {
                      return 'no date selected'
                    }
                  })()}
                </Descriptions.Item>
                <Descriptions.Item label="Provider">{(() => {
                  if (employeeQuery.data && employeeQuery.data.user) {
                    return employeeQuery.data.user.name
                  } else {
                    return 'no Employee selected'
                  }
                })()}</Descriptions.Item>
                <Descriptions.Item label="Client">{user ? user.name : ''}</Descriptions.Item>
                <Descriptions.Item label="Time">{(() => {
                  const time = props.form.getFieldValue('time') as Moment
                  if (time) {
                    return time.format('HH:mm')
                  } else {
                    return 'no time selected'
                  }
                })()}</Descriptions.Item>
                <Descriptions.Item label="Location">{organization ? organization.address : ''}</Descriptions.Item>
              </Descriptions>
            </div>
            <div className='eventoutline' style={{}} >
              <div>
                <Descriptions title="confirm">
                  <Descriptions.Item label="Service(s)">{}</Descriptions.Item>
                  <Descriptions.Item label="Cost">{}</Descriptions.Item>
                  <Descriptions.Item label="Total">{}</Descriptions.Item>
                </Descriptions>
              </div>

              <Form.Item style={{ margin: ' 0 auto', display: 'flex', justifyContent: 'space-around', padding: 0 }}>
                <Button type="primary" htmlType="submit" style={{}}>
                  Create Event
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>

      </div>
    </Form>
  )
}

export const NewEventForm = Form.create<FormComponentProps & NewEventFormProps>()(_NewEventForm)