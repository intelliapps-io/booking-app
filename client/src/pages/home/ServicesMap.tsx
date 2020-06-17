import React, { useContext } from 'react';
import { useServicesQuery } from '../../lib/codegen';
import { ServicePriceForm } from '../admin/organization/Organization-Services/ServicePriceForm';
import ServiceDisplay from './ServiceDisplay';
import { ServiceDisplayTwo } from './ServiceDisplayTwo';
import { AppContext } from '../../lib/helpers/AppContext';
interface ServicesMapProps {

}

export const ServicesMap: React.FC<ServicesMapProps> = props => {
  const {organization} = useContext(AppContext)
  const servicesQuery = useServicesQuery({
    variables: {
      data: {
        limit: 5,
        offset: 0,
        
      }
    }
  })
  if (!servicesQuery.data || !servicesQuery.data.services) return <div>can not query services</div>
  if (organization) console.log(organization.name)
  const { items, total } = servicesQuery.data.services
  console.log(items)


  return(
    <div>
      {items.map((item, index) =>
      {
        if (index === 0  )
          return <li key={item.id} style={{ listStyleType: 'none' }} >
            <ServiceDisplay key={item.id}  service={item as any} servicesQuery={servicesQuery as any} />
          </li>
        else if (index === 1) 
          return <ServiceDisplayTwo key={item.id} service={item as any} servicesQuery={servicesQuery as any} />
        else if (index === 2)
          return <ServiceDisplay key={item.id} service={item as any} servicesQuery={servicesQuery as any} />
        else if (index === 3) 
          return <ServiceDisplayTwo key={item.id} service={item as any} servicesQuery={servicesQuery as any} />
        else if (index === 4)
          return <ServiceDisplay key={item.id} service={item as any} servicesQuery={servicesQuery as any} />
      }
        // <li key={item.id} style={{ listStyleType: 'none' }}>
        //   <ServiceDisplay key={item.id}  service={item as any} servicesQuery={servicesQuery as any} />
        //   <ServiceDisplayTwo key={item.id} service={item as any} servicesQuery={servicesQuery as any} />
        // </li>
      )}
    </div>
  );
}