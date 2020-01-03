import { ColumnProps, PaginationConfig } from "antd/lib/table";

export interface ICustomPager extends Omit<Omit<PaginationConfig, "current">, "pageSize"> {
  current: number
  pageSize: number
}

export interface DataPaneTableProps<T> {
  columns: Array<ColumnProps<T>>
  pageSize: number
  handlePageChange: (offset: number) => void
  initialPage: () => number
  widthPercent?: number
  onRowClick?: (props: DataPaneRenderProps<T>) => void
  renderExpandedRow?: (item: T) => React.ReactNode
}

export interface DataPaneRenderProps<T> {
  activeItem: T | undefined
}

export type DataPaneRenderFunc<T> = (props: DataPaneRenderProps<T>) => React.ReactNode