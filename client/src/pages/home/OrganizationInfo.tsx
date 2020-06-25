import React, { useContext } from 'react'
import { AppContext } from '../../lib/helpers/AppContext';
import './OrganizationInfo.less'
import { Descriptions } from 'antd';
import { Link } from 'react-router-dom';
import { SendOutlined, PhoneOutlined, CompassOutlined } from '@ant-design/icons';
interface OrganizationInfoProps {

}

export const OrganizationInfo: React.FC<OrganizationInfoProps> = props => {
  const { organization, user } = useContext(AppContext)
  const sundayHours = () => {
    const startTime = organization!.hoursOfOperation.sunday.start
    const endTime = organization!.hoursOfOperation.sunday.end
    if (startTime == 0) {
      return <div>Closed</div>
    }else return<div>{startTime / .6}-{endTime / .6}</div>
  }
  const mondayHours = () => {
    const startTime = organization!.hoursOfOperation.monday.start
    const endTime = organization!.hoursOfOperation.monday.end
    if (startTime == 0) {
      return <div>Closed</div>
    } else return <div>{startTime / .6}-{endTime / .6}</div>
  }
  const tuesdayHours = () => {
    const startTime = organization!.hoursOfOperation.tuesday.start
    const endTime = organization!.hoursOfOperation.tuesday.end
    if (startTime == 0) {
      return <div>Closed</div>
    } else return <div>{startTime / .6}-{endTime / .6}</div>
  }
  const wednesdayHours = () => {
    const startTime = organization!.hoursOfOperation.wednesday.start
    const endTime = organization!.hoursOfOperation.wednesday.end
    if (startTime == 0) {
      return <div>Closed</div>
    } else return <div>{startTime / .6}-{endTime / .6}</div>
  }
  const thursdayHours = () => {
    const startTime = organization!.hoursOfOperation.thursday.start
    const endTime = organization!.hoursOfOperation.thursday.end
    if (startTime == 0) {
      return <div>Closed</div>
    } else return <div>{startTime / .6}-{endTime / .6}</div>
  }
  const fridayHours = () => {//start time takes current time of day even if changed in opperation hours
    const startTime = organization!.hoursOfOperation.friday.start
    const endTime = organization!.hoursOfOperation.friday.end
    if (startTime == 0) {
      return <div>Closed</div>
    } else return <div>{startTime / .6}-{endTime / .6}</div>
  }
  const saturdayHours = () => {
    const startTime = organization!.hoursOfOperation.saturday.start
    const endTime = organization!.hoursOfOperation.saturday.end
    if (startTime == 0) {
      return <div>Closed</div>
    } else return <div>{startTime / .6}-{endTime / .6}</div>
  }
  
  return(
    <div className='hero-info'>
      <div className="infowrap">
        <Descriptions title="Office Hours">
          <Descriptions.Item label="Sun">{sundayHours()}</Descriptions.Item> 
          <Descriptions.Item label="Mon">{mondayHours()}</Descriptions.Item> 
          <Descriptions.Item label="Tue">{tuesdayHours()}</Descriptions.Item>
          <Descriptions.Item label="Wed">{wednesdayHours()}</Descriptions.Item>
          <Descriptions.Item label="Thu">{thursdayHours()}</Descriptions.Item> 
          <Descriptions.Item label="Fri">{fridayHours()}</Descriptions.Item>
          <Descriptions.Item label="Sat">{saturdayHours()}</Descriptions.Item> 
        </Descriptions>
      </div>
      <div className='infowrap' id='about'>
        <Descriptions title={organization!.name}>
          <Descriptions.Item >
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitationullamco laboris nisi ut aliquip ex ea commodo consequat
            </p>
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className="infowrap">
        <Descriptions title="Contact" style={{width: '100%'}}>
          <span className='contact'>
            <CompassOutlined translate={CompassOutlined} className='icon'/>
            {organization!.address}
          </span>
          <br/>
          <span className='contact'>
            <PhoneOutlined translate={PhoneOutlined} className='icon' />
            {organization!.phone}
          </span>
          <br/>
          <span className='contact'>
            <SendOutlined translate={SendOutlined} className='icon' /> 
            {organization!.contactEmail}
          </span>
        </Descriptions>
        <Link to="/login">Login</Link>
        <br/>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}