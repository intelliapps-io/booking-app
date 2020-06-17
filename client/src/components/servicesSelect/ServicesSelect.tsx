import React from "react";
import { useServicesQuery } from "../../lib/codegen";
import { Select } from "antd";

interface ServicesSelectProps {
  serviceIds?: string[]
  style?: React.CSSProperties
}

export const ServicesSelect: React.FC<ServicesSelectProps> = props => {
  const servicesQuery = useServicesQuery({ variables: { data: { limit: 9999 }}})
  const services = servicesQuery.data && servicesQuery.data.services ? servicesQuery.data.services.items : []

  const handleChange = (value: any) => {

  }
  return (
    <Select mode="tags" style={{width: '300px' }} placeholder="Select Service" onChange={handleChange}>
      {services.map(service => <Select.Option key={service.id} value={service.id}>{service.name}</Select.Option>)}
    </Select>
  );
}