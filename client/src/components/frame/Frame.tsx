import React, { useState, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'

// @ts-ignore
export const Frame = ({ children, ...props }) => {
  const [contentRef, setContentRef] = useState(null)
  // @ts-ignore
  const mountNode = contentRef && contentRef.contentWindow.document.body

  const [isLoaded, setIsLoaded] = useState(false)

  useLayoutEffect(() => setIsLoaded(true), [])

  return (
    <iframe {...props} ref={setContentRef as any}>
      {mountNode &&
        createPortal(
          React.Children.only(children),
          mountNode
        )}
    </iframe>
  )
}