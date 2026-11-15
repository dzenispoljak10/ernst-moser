import { jsx as _jsx, jsxs as _jsxs, Fragment } from 'react/jsx-runtime'
import { wrapProps } from './wrap'

export type { JSX } from 'react/jsx-runtime'
export { Fragment }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function jsx(type: any, props: any, key?: any) {
  return _jsx(type, wrapProps(type, props), key)
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function jsxs(type: any, props: any, key?: any) {
  return _jsxs(type, wrapProps(type, props), key)
}
