import Tippy from '@tippyjs/react'
import React from 'react'
import 'tippy.js/dist/tippy.css'

// Tippy.defaultProps = {
//   maxWidth: '500px',
//   duration: [300, 300],
//   theme: 'knigAm',
//   animation: 'scale',
//   delay: [300, 0],
//   ignoreAttributes: true,
//   touch: 'hold',
//   arrow: false,
//   interactive: true
// }

export const Tooltip: Tooltip = ({ children, content, ...rest }) => {
  if (!children) return null
  if (!content) return children

  return (
    <Tippy content={content} {...rest}>
      {children}
    </Tippy>
  )
}

type Tooltip = {
  (props: MyProps): null | React.ReactElement
}

type MyProps = {
  content?: string
  children?: React.ReactElement
}
