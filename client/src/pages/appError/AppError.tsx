import "./AppError.less"
import React, { ReactNode, CSSProperties } from "react";

export interface AppErrorData {
  title: ReactNode
  message: ReactNode
}

interface AppErrorProps extends AppErrorData {
  style?: CSSProperties
  className?: string
}

export const AppError: React.FC<AppErrorProps> = props => {

  return(
    <div className={props.className} style={props.style}>
      <h1>Content Error</h1>
      <h2>{props.title}</h2>
      <h3>{props.message}</h3>
    </div>
  );
}