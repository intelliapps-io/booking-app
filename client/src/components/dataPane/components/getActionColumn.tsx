import React, { useState } from "react";
import { ColumnProps } from "antd/lib/table";
import { Button, Popconfirm, Dropdown, Menu, Icon } from "antd";
import { MenuItemProps } from "antd/lib/menu/MenuItem";
import { ActiveIdState } from "../DataPane";

interface IGetActionColumnArgs {
  activeIdState?: ActiveIdState
  onDelete?: (id: string) => void
  onEdit?: (id: string) => void
  moreOptions?: DropdownMenuItemOption[]
}

interface DropdownMenuItemOption {
  icon?: string
  iconStyle?: React.CSSProperties
  text: React.ReactNode
  itemProps?: MenuItemProps
  onClick?: (id: string) => void
}

interface MenuDropdownProps<T> {
  id: string
  onDelete?: (id: string) => void
  onEdit?: (id: string) => void
  moreOptions?: DropdownMenuItemOption[]
}

export const MenuDropdown = <T extends { id: string }>(props: MenuDropdownProps<T>) => {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  return (
    <Dropdown
      className="action-col-dropdown"
      placement="bottomLeft"
      visible={dropdownVisible}
      getPopupContainer={(node) => {
        node.addEventListener('mouseleave', () => {
          setTimeout(() => setDropdownVisible(false), 500)
        })
        return node
      }}
      overlay={
        <Menu>
          {typeof props.onEdit === "function" && <Menu.Item className="dropdown-option-edit" onClick={event => { event.domEvent.stopPropagation(); props.onEdit!(props.id); }}>
            <Icon type="edit" style={{ color: "#0a78ff" }} /> Edit
        </Menu.Item>}

          {props.moreOptions && props.moreOptions.map((item, i) =>
            <Menu.Item key={i} onClick={(e) => { e.domEvent.stopPropagation(); if (item.onClick) item.onClick(props.id) }} {...item.itemProps}>
              {item.icon && <Icon type={item.icon} style={{ color: "#0a78ff", ...item.iconStyle }} />} {item.text}
            </Menu.Item>
          )}

          {typeof props.onDelete === "function" && <Menu.Item className="dropdown-option-delete">
            <Popconfirm
              onConfirm={(e) => { if (e) e.stopPropagation(); props.onDelete!(props.id) }}
              onCancel={(e) => { if (e) e.stopPropagation() }}
              title={`Delete`}
              okText="Delete"
              okButtonProps={{ type: "danger" }}
              cancelButtonProps={{ type: "primary" }}
            >
              <Icon type="delete" style={{ color: "#f5222d", marginRight: 8 }} /> Delete
          </Popconfirm>
          </Menu.Item>}
        </Menu>
      }
    >
      <Button
        icon="more"
        size="small"
        shape="circle"
        style={{ float: "right", background: "none" }}
        onClick={() => setDropdownVisible(true)}
      />
    </Dropdown>
  );
}

export function getActionColumn<T extends { id: string }>(args: IGetActionColumnArgs): ColumnProps<T> {
  return (
    {
      key: "actions",
      title: <span style={{ fontWeight: 100, marginLeft: 5 }}>Actions</span>,
      width: 35,
      render: (text: null, item: T) => <MenuDropdown {...args} id={item.id} />
    }
  )
}