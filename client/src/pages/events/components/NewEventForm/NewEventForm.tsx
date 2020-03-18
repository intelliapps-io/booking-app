import React, { useContext } from "react"
import { Form, DatePicker, TimePicker, InputNumber, Button } from "antd"
import { FormComponentProps } from "antd/lib/form"
import { UserSelect } from "../../../../components/userSelect/UserSelect"
import { UserRole, useCreateEventMutation } from "../../../../lib/codegen"
import moment, { Moment } from "moment"
import { AppContext } from "../../../../lib/helpers/AppContext"
import { Redirect } from "react-router-dom"

import "./NewEventForm.less"
import { DayPicker } from "../../../../components/dayPicker/DayPicker"

interface NewEventFormProps {
  style?: React.CSSProperties
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
        <Form.Item style={{width: '23%'}}>
          {getFieldDecorator('date', {})(
            <DayPicker/>
          )}
        </Form.Item>
        <Form.Item style={{width: '23%'}}>
          {getFieldDecorator('time', {})(
            <TimePicker use12Hours={true} format='h:mm a' style={{ minWidth: 175 }} />
          )}
        </Form.Item>
        <Form.Item label={'duration'} style={{ }}>
          {getFieldDecorator('duration', {
            initialValue: 30
          })(
            <InputNumber min={30} max={60} step={15} />
          )}
        </Form.Item>
        <Form.Item style={{width: '23%'}}>
          {getFieldDecorator('employeeId', {})(
            <UserSelect role={UserRole['Employee']} style={{ maxWidth: 300 }} />
         )}
        </Form.Item>
      </div>


      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Event
        </Button>
      </Form.Item>
    </Form>
  )
}

export const NewEventForm = Form.create<FormComponentProps & NewEventFormProps>()(_NewEventForm)