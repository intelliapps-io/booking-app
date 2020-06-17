import React, { useState } from "react";
import { Input, Select, InputNumber } from 'antd';

type Currency = 'euro' | 'dollar' | 'yen' | string

interface ServicePriceFormProps {
  value?: number
  currency?: Currency
  onChange?: (value: number, currency: Currency) => void
  // initialValues: ({price: {number: 0, currency: 'dollar'}})
}

const { Option } = Select;

export const ServicePriceForm: React.FC<ServicePriceFormProps> = (props) => {
  const { onChange } = props
  const [number, setNumber] = useState(props.value ? props.value : 0);
  const [currency, setCurrency] = useState<Currency>('dollar');
  const triggerChange = (value: number, currency: Currency) => {
    setNumber(value)
    setCurrency(currency)
    if (onChange) {
      onChange(value, currency);
    }
  }

  const onNumberChange = (formVal: number | undefined) => {
    if (formVal)
      triggerChange(formVal, currency);
  }
  const onCurrencyChange = (newCurrency: string) => {
    // if (!('currency' in value)) {
    //   setCurrency(newCurrency);
    // }
    triggerChange(number, newCurrency);
  };

  return (
    <span>
      <InputNumber
        value={props.value || number}
        onChange={onNumberChange}
        min={0}
      >
      </InputNumber>
      {/* <Select></Select> */}
    </span>

  );
}