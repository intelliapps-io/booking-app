import React, { useContext } from 'react';
import './Footer.less'
import { AppContext } from '../../lib/helpers/AppContext';
import { Organization } from '../../lib/codegen';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import { Descriptions } from 'antd';
import { TwitterOutlined, InstagramOutlined, FacebookOutlined } from '@ant-design/icons';

export interface FooterProps {
  
  
}

export const Footer: React.FC<FooterProps> = () => {
  const { organization } = useContext(AppContext)
  console.log(organization!.hoursOfOperation)

  //simple way of converting hours for each day for now
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
  
  
  return (  
    <div className='div'>
      <div className='tittlewrap'>
        <div className='logoandname' style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'space-between' }}>
          <div className="logo"></div>
          <span style={{ fontSize: '.9em' }}>Copyright 2020 {organization!.name}</span>
        </div>
      </div>
      <div className='innerdiv' >
        <div className='content' >
          <Descriptions title="Company" style={{width: '100%'}}>
            <Descriptions.Item label="Location">{organization!.address}</Descriptions.Item>
            <br />
            <br/>
            <Descriptions.Item label="Phone">{organization!.phone}</Descriptions.Item>
            <br />
            <br/>
            <Descriptions.Item label="Emial">{organization!.contactEmail}</Descriptions.Item>
            <br />
            <br/>
            <Descriptions.Item label=""><Link to="/login">Login</Link></Descriptions.Item>
            <br />
            <br/>
            <Descriptions.Item label=""><Link to="/signup">Signup</Link></Descriptions.Item>
          </Descriptions>
        </div>
        <div className='content' style={{}} >
          <Descriptions title="Office Hours">
            <Descriptions.Item label="Sunday">{sundayHours()}</Descriptions.Item> 
            <Descriptions.Item label="Monday">{mondayHours()}</Descriptions.Item> 
            <Descriptions.Item label="Tuesday">{tuesdayHours()}</Descriptions.Item>
            <Descriptions.Item label="Wednesday">{wednesdayHours()}</Descriptions.Item>
            <Descriptions.Item label="Thursday">{thursdayHours()}</Descriptions.Item> 
            <Descriptions.Item label="Friday">{fridayHours()}</Descriptions.Item>
            <Descriptions.Item label="Saturday">{saturdayHours()}</Descriptions.Item> 
         </Descriptions>
        </div>
        <div className='content' style={{}} >
          <Descriptions title="social">
            <div style={{ display: 'flex' , alignItems: 'center'}}>
            <Link to='#'><TwitterOutlined translate={TwitterOutlined} className='icon' /></Link>
            <Link to='#'><InstagramOutlined translate={InstagramOutlined} className='icon' /></Link>
            <Link to='#'><FacebookOutlined translate={FacebookOutlined} className='icon' /></Link>
            </div>
          </Descriptions> 
         
        </div>
      </div>
    </div>
  );
}
 
