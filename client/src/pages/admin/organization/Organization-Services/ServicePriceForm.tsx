import React,{ useState }  from "react";
import {  Input, Select, InputNumber } from 'antd';

interface priceValues {
  number?: number
  currency? : 'euro' | 'dollar' | 'yen'| string
}
interface ServicePriceFormProps {
  value?: priceValues
  onChange?: (value: priceValues) => void
  // initialValues: ({price: {number: 0, currency: 'dollar'}})
}

const { Option } = Select;

export const ServicePriceForm: React.FC<ServicePriceFormProps> = ({ value = {}, onChange }) => {
  const [number, setNumber] = useState(0);
  const [currency, setCurrency] = useState('dollar');
  const triggerChange = (changedValue: priceValues) => {
    if (onChange) {
      onChange({ number, currency, ...value, ...changedValue });
    }
  }

  const onNumberChange = (e: number | undefined ) => {
    
    if (e) setNumber(number)
    triggerChange({ number: e });
  }
  // const onNumberChange = (e: { target: { value: any }; }) => {
  //   const newNumber = parseInt(e.target.value)

  //   if (newNumber) {
  //     setNumber(newNumber)
  //   }
  //   // if (Number.isNaN(number)) {
  //   //   return;
  //   // }
  //   // if (!(number in value)) {
  //   //   setNumber(newNumber);
  //   // }
  //   triggerChange({ number: newNumber });
  // };
  const onCurrencyChange = (newCurrency: string) => {
    if (!('currency' in value)) {
      setCurrency(newCurrency);
    }
    triggerChange({ currency: newCurrency });
  };

  return (
    <span>
      <InputNumber
  
        value={value.number || number}
        onChange={onNumberChange}
 
      >
      </InputNumber>
      {/* <Select></Select> */}
    </span>

  );
}