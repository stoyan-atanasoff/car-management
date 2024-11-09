import { PropsWithChildren } from 'react'

export const FormFieldFeedback = ({children}: PropsWithChildren) => (
  <div className="text-red-500 text-sm mt-1">{children}</div>
)