import React, { useContext } from "react"
import { Form, DatePicker, TimePicker, InputNumber, Button, Descriptions } from "antd"
import { FormComponentProps } from "antd/lib/form"
import { UserSelect } from "../../../../components/userSelect/UserSelect"
import { UserRole, useCreateEventMutation } from "../../../../lib/codegen"
import moment, { Moment } from "moment"
import { AppContext } from "../../../../lib/helpers/AppContext"
import { Redirect } from "react-router-dom"

import "./NewEventForm.less"
import { DayPicker } from "../../../../components/dayPicker/DayPicker"
import { format } from "path"
import FormItem from "antd/lib/form/FormItem"

interface NewEventFormProps {
  style?: React.CSSProperties
  onChange?: (day: Moment) => void

}

interface FormData {
  date: Moment
  time: Moment
  duration: number
  employeeId: string
}

const _NewEventForm: React.FC<NewEventFormProps & FormComponentProps> = props => {
  const { getFieldDecorator, getFieldsValue } = props.form
  const [createEvent] = useCreateEventMutation()
  const { user, meQuery } = useContext(AppContext)
  const isLoggedIn = user || meQuery.loading         


  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = getFieldsValue() as FormData
    
    const mergeDateTime = () => {
      const dateString = formData.date.format('YYYY-MM-DD')
      const timeString = formData.time.format('HH:mm:ss')
      return moment(`${dateString} ${timeString}`, 'YYYY-MM-DD HH:mm:ss')
    }

    createEvent({
      variables: {
        data: {
          datetime: mergeDateTime(),
          duration: formData.duration,
          employeeId: formData.employeeId
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

  return (
    <Form style={props.style} onSubmit={event => onSubmit(event)}>
      {!isLoggedIn && <Redirect to="/login"/>}
      <div className='item-selector-wrap' >
        <Form.Item style={{ margin: '0 5px 0 0', display: 'inline-block', float: 'left'}}>
            {getFieldDecorator('date', {})(
              <DayPicker style={{width: 'fit-content'}}/>
            )}
          </Form.Item>
        <div className='innerwrap'>
          <div className='innerformwrap' style={{}}>
            <Form.Item style={{ float: 'left', marginRight: '8px'}}>
              {getFieldDecorator('time', {})(
              <TimePicker use12Hours={true} format='h:mm a' style={{ minWidth: 175 }} />
            )}
            </Form.Item>
            <Form.Item style={{ float: 'left', marginRight: '8px'}}>
              <span>Duration: </span>{getFieldDecorator('duration', {
              initialValue: 30
            })(
              <InputNumber min={30} max={60} step={15} />
            )}
            </Form.Item>
            <Form.Item style={{float: 'left',}}>
            {getFieldDecorator('employeeId', {})(
              <UserSelect role={UserRole['Employee']} style={{width: 180}} />
            )}
            </Form.Item>
          </div>
          <div className='innerformwrap' style={{}}>
            <div className='eventoutline' style={{ }} >
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
              <Descriptions.Item label="Provider">{}</Descriptions.Item>
              <Descriptions.Item label="Client">{}</Descriptions.Item>
              <Descriptions.Item label="Time">{}</Descriptions.Item>
              <Descriptions.Item label="Location">{}</Descriptions.Item>
            </Descriptions>
            </div>
            <div className='eventoutline' style={{  }} >
              <div>
              <Descriptions title="confirm">
                <Descriptions.Item label="Service(s)">{}</Descriptions.Item>
                <Descriptions.Item label="Cost">{}</Descriptions.Item>
                <Descriptions.Item label="Total">{}</Descriptions.Item>
              </Descriptions>
              </div>

              <Form.Item style={{margin: ' 0 auto', display: 'flex', justifyContent: 'space-around', padding: 0}}>
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