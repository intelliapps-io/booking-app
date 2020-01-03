import './DataPane.less'
import React, { useState, useEffect } from "react"
import SplitPane, { Props } from "react-split-pane"
import { Table, Pagination } from "antd"
import { ICustomPager, DataPaneTableProps, DataPaneRenderProps } from "./dataPaneTypes";

export type ActiveIdState = [string | null, (id: string | null) => void]

interface DataPaneProps<T> {
  activeIdState: ActiveIdState
  dataSource: {
    total: number,
    items: Array<T>
  }
  renderPane: (props: DataPaneRenderProps<T>) => React.ReactNode
  tableProps: DataPaneTableProps<T>
  loading?: boolean
  style?: React.CSSProperties
  paneProps?: Props
  wrapperStyle?: React.CSSProperties
}

export function DataPane<T extends { id: string }>(props: DataPaneProps<T>) {
  const [Pager, setPager] = useState<ICustomPager>({
    pageSize: props.tableProps.pageSize ? props.tableProps.pageSize : 0,
    current: props.tableProps.initialPage(),
    total: props.dataSource.total,
    size: "small",
  })

  useEffect(() => {
    if (props.dataSource.total !== Pager.total && !props.loading) setPager({ ...Pager, total: props.dataSource.total })
  }, [props.dataSource])

  const renderProps: DataPaneRenderProps<T> = {
    activeItem: (() => props.dataSource.items.find(item => item.id === props.activeIdState[0]))()
  }

  return (
    <div style={props.style}>
      <SplitPane
        className="data-pane"
        split="vertical"
        minSize={50}
        defaultSize={100}
        {...props.paneProps}
      >
        <div className="left-pane">
          <Table<T>
            loading={props.loading}
            dataSource={props.dataSource.items}
            columns={props.tableProps.columns}
            rowKey={item => item.id}
            rowClassName={item => props.activeIdState[0] === item.id ? 'row-active' : ''}
            onRow={item => ({ onClick: () => { props.activeIdState[1](item.id); if (props.tableProps.onRowClick) props.tableProps.onRowClick(renderProps) } })}
            pagination={Pager}
            style={{ marginRight: 1 }}
            expandedRowRender={props.tableProps.renderExpandedRow ? record => props.tableProps.renderExpandedRow!(record) : undefined}
          />
          <br />
          <Pagination {...Pager} key={1} style={{ marginTop: 2 }} onChange={(page, pageSize) => {
            setPager({ ...Pager, current: page })
            props.tableProps.handlePageChange((page - 1) * (pageSize ? pageSize : Pager.pageSize))
          }} />
        </div>
        <div className="right-pane">
          {props.renderPane(renderProps)}
        </div>
      </SplitPane>
    </div>
  );
}