import { jsxDEV as _jsxDEV, Fragment } from 'react/jsx-dev-runtime'
import { wrapProps } from './wrap'

export type { JSX } from 'react/jsx-dev-runtime'
export { Fragment }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function jsxDEV(type: any, props: any, key: any, isStatic: boolean, source?: any, self?: any) {
  return _jsxDEV(type, wrapProps(type, props), key, isStatic, source, self)
}
