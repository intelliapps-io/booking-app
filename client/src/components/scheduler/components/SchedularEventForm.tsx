import React, { useLayoutEffect } from 'react';
import { Modal, Form, DatePicker, TimePicker, Switch, Select, InputNumber, Checkbox, Button } from 'antd';
import { SchedularEvent } from '../SchedulerTypes';
import { FormComponentProps } from 'antd/lib/form';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import moment, { Moment } from 'moment';

interface SchedularEventFormProps {
  visibleState: [boolean, (state: boolean) => void]
  title: React.ReactNode
  submitText: React.ReactNode
  createEventDate?: Date | Moment
  editEventData?: SchedularEvent
  onSubmit: (data: SchedularEvent) => void
  onDelete?: (data: { event: SchedularEvent, excludeRecurringEvent: boolean }) => void
}

const _SchedularEventForm: React.FC<SchedularEventFormProps & FormComponentProps> = props => {
  const [isVisible, setIsVisible] = props.visibleState
  const { getFieldDecorator, getFieldValue } = props.form

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  }

  const isRecurring = getFieldValue('isRecurring') as boolean
  const recurrenceInterval = getFieldValue('recurrenceInterval') as number
  const recurrenceEndsOn = getFieldValue('recurrenceEndsOn') as Moment | undefined

  function getDateFromTimeField(fieldName: 'begins' | 'ends'): Date {
    try {
      const timeField = getFieldValue(fieldName) as Moment | undefined
      if (timeField) {
        const timeString = timeField.format('HH:mm')
        let dateString = ''
        if (props.editEventData) // use existing date
          dateString = moment(props.editEventData[fieldName]).format('YYYY-MM-DD')
        else if (props.createEventDate) // use create event date
          dateString = moment(props.createEventDate).format('YYYY-MM-DD')
        else
          throw new Error('You must supply either createEventDate or editEventData')
        return moment(`${dateString} ${timeString}`, 'YYYY-MM-DD HH:mm').toDate()
      } else
        throw new Error(`${fieldName} has no value and is undefined`)
    } catch (err) {
      throw err
    }
  }

  function getRecursOnArray(): SchedularEvent['recursOn'] {
    const selctedDays: number[] | undefined = getFieldValue('recursOn')
    let recursOn: SchedularEvent['recursOn'] = [false, false, false, false, false, false, false]
    if (!selctedDays) return undefined
    selctedDays.map((dayIndex) => recursOn![dayIndex] = true)
    return recursOn
  }

  function getEventFromFields(): SchedularEvent {
    const event: SchedularEvent = {
      id: props.editEventData ? props.editEventData.id : undefined,
      begins: getDateFromTimeField('begins'),
      ends: getDateFromTimeField('ends'),
      isRecurring: isRecurring ? isRecurring : false,
      recurrenceInterval,
      recursOn: getRecursOnArray(),
      recurrenceEndsOn: recurrenceEndsOn ? recurrenceEndsOn.toDate() : undefined,
    }
    return event
  }

  return (
    <Modal
      title={props.title}
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      okText={props.submitText}
      onOk={() => props.onSubmit(getEventFromFields())}
    >
      <Form {...formItemLayout}>
        <Form.Item label='Begins'>
          {getFieldDecorator('begins', {})(
            <TimePicker
              format='HH:mm'
              style={{ width: 110 }}
            />
          )}
        </Form.Item>
        <Form.Item label='Ends'>
          {getFieldDecorator('ends', {})(
            <TimePicker
              format='HH:mm'
              style={{ width: 110 }}
            />
          )}
        </Form.Item>
        <Form.Item label='Recurring'>
          {getFieldDecorator('isRecurring')(
            <Switch defaultChecked={props.editEventData && props.editEventData.isRecurring} />
          )}
        </Form.Item>
        {isRecurring && <>

          <Form.Item label='Recurs every'>
            {getFieldDecorator('recurrenceInterval', {
              initialValue: 1
            })(
              <InputNumber style={{ width: 55 }} min={1} max={52} />
            )}
            <span style={{ marginLeft: 10 }}>{recurrenceInterval === 1 ? 'week' : 'weeks'}</span>
          </Form.Item>

          <Form.Item label='Recurs On'>
            {getFieldDecorator('recursOn', {
            })(
              <CheckboxGroup options={[
                { label: 'Monday', value: 0 },
                { label: 'Tuesday', value: 1 },
                { label: 'Wednesday', value: 2 },
                { label: 'Thursday', value: 3 },
                { label: 'Friday', value: 4 },
                { label: 'Saturday', value: 5 },
                { label: 'Sunday', value: 6 }
              ]} />
            )}
          </Form.Item>

          <Form.Item label='Recurrence Ends After'>
            {getFieldDecorator('recurrenceEndsOn', {

            })(
              <DatePicker
                format='M/D/YY'
                style={{
                  width: 110
                }}
              />
            )}
          </Form.Item>
        </>}
      </Form>
      <Button.Group>
        {props.onDelete && props.editEventData &&
          <Button icon='delete' type='danger' onClick={() => {props.onDelete!({ event: props.editEventData!, excludeRecurringEvent: false }); setIsVisible(false)}}>{props.editEventData!.isRecurring ? 'Delete All Events' : 'Delete'}</Button>}
        {props.onDelete && props.editEventData && props.editEventData.isRecurring &&
          <Button icon='delete' type='default' onClick={() => { props.onDelete!({ event: props.editEventData!, excludeRecurringEvent: true }); setIsVisible(false)}}>Delete Only This Event</Button>}
      </Button.Group>
    </Modal>
  );
}

function recurrsArrayToNumArray(recursOn: SchedularEvent['recursOn']): Array<number> {
  if (recursOn) {
    let dayNumbers: Array<number> = []
    recursOn.map((dayState, index) => {
      if (dayState) dayNumbers.push(index)
    })
    return dayNumbers
  } else
    return []
}

export const SchedularEventForm = Form.create<FormComponentProps & SchedularEventFormProps>({
  mapPropsToFields: props => {
    const { editEventData, createEventDate } = props
    if (editEventData) return {
      begins: Form.createFormField({ value: moment(editEventData.begins) }),
      ends: Form.createFormField({ value: moment(editEventData.ends) }),
      isRecurring: Form.createFormField({ value: editEventData.isRecurring }),
      recurrenceInterval: editEventData.recurrenceInterval ? Form.createFormField({ value: editEventData.recurrenceInterval }) : undefined,
      recursOn: editEventData.recursOn ? Form.createFormField({ value: recurrsArrayToNumArray(editEventData.recursOn) }) : undefined,
      recurrenceEndsOn: editEventData.recurrenceEndsOn && editEventData.recurrenceEndsOn ? Form.createFormField({ value: moment(editEventData.recurrenceEndsOn) }) : undefined,
    }
    if (!editEventData && createEventDate) return {
      begins: Form.createFormField({ value: moment(createEventDate) }),
    }
  }
})(_SchedularEventForm)