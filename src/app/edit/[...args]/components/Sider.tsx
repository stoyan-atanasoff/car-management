import React, { PropsWithChildren } from 'react'

export const Sider = ({ children }:PropsWithChildren) => {
  return (
    <div className="md:w-1/3 lg:w-1/4 p-4 dark:bg-black">
      {children}
    </div>
  )
}