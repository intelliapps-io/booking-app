import React, { useState } from "react";
import { DataPane } from "../../../../components/dataPane/DataPane";
import { Service, useServicesQuery, ServiceFragment, useDeleteServiceMutation } from "../../../../lib/codegen";
import { ServicesForm } from "./ServicesForm";
import ButtonGroup from "antd/lib/button/button-group";
import { Button, Popconfirm } from "antd";

interface ServicesPaneProps {

}

export const ServicesPane: React.FC<ServicesPaneProps> = props => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const servicesQuery = useServicesQuery({ variables: { data: { limit: 20 } } })
  const [deleteService] = useDeleteServiceMutation({ onCompleted: () => servicesQuery.refetch() })
  const data = servicesQuery.data && servicesQuery.data.services ? servicesQuery.data.services : { items: [], total: 0 }

  return (
    <DataPane<ServiceFragment>
      loading={servicesQuery.loading}
      style={{ height: '100%' }}
      activeIdState={[activeId, setActiveId]}
      dataSource={data}
      renderPane={() => <ServicesForm
        serviceId={activeId}
      />}
      tableProps={{
        columns: [
          {
            key: 'name',
            dataIndex: 'name',
            title: 'Name',
            render: (text, record) => text
          },
          {
            key: 'cost',
            dataIndex: 'cost',
            title: 'Cost',
            render: (text, record) => text
          },
          {
            key: 'description',
            dataIndex: 'description',
            title: 'Description',
            render: (text, record) => text
          },
          {
            key: 'options',
            render: (text, record) => {

              return <Popconfirm
                onConfirm={() => deleteService({ variables: { id: record.id }})}
                okButtonProps={{ type: 'danger' }}
                title="You can not undelete"
              >
                <Button icon='delete' />
              </Popconfirm>
            }
          }
        ],
        pageSize: servicesQuery.variables.data.limit!,
        initialPage: () => 1,
        handlePageChange: offset => {
          servicesQuery.refetch({ data: { ...servicesQuery.variables.data, offset } })
        }
      }}
    />
  );
}