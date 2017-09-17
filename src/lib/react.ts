import { VALID_ELEMENTS } from "../config/html"
import { regexResults, isObjectLiteral } from "./utility"

/**
 * A selector is a string that is similar to css selectors. It allows us to
 * easily write nodes with unchanging classes and ids.
 *
 * EX: main#crossed
 *     div.is-hidden
 *     div#red.show
 */

type Props = {
  [key: string]: any
}

type Children = React.ReactElement<any>[] | string

const joinSelectorDataByKey = (key: string) => (
  selectorData: SelectorData,
  props: Props
) => {
  const data = [...(props[key] || []), ...selectorData[key]]
  return data.length > 0 ? { [key]: data.join(" ") } : {}
}

const joinClasses = joinSelectorDataByKey("className")
const joinIds = joinSelectorDataByKey("id")

let currentKey = 0
const element = (selector: string, props: Props, children?: Children) => {
  currentKey = (currentKey + 1) % Number.MAX_SAFE_INTEGER

  const selectorData = getSelectorData(selector)
  const mergedProps = Object.assign(
    {},
    props,
    joinClasses(selectorData, props),
    joinIds(selectorData, props),
    { key: currentKey }
  )

  return React.createElement(selectorData.elementType, mergedProps, children)
}

const overloadedElement = (
  selector: string,
  maybePropsOrChildren?: Props | Children | string,
  maybeChildren?: Children | string
) => {
  //   >(.)__ <(.)__ =(.)__
  //    (___/  (___/  (___/
  if (
    Array.isArray(maybePropsOrChildren) ||
    typeof maybePropsOrChildren === "string"
  ) {
    return element(selector, {}, maybePropsOrChildren)
  }

  return element(selector, maybePropsOrChildren || {}, maybeChildren)
}

export const el = overloadedElement

/**
 * selectorToNodeAndProps()
 * Takes a selector and returns an object to use in creating
 *
 * @arg       {String}        selector
 *
 * @typedef   {Object}        NodeAndProps
 * @property  {String}        NodeAndProps.node
 * @property  {Object}        NodeAndProps.props
 * @property  {Array}         NodeAndProps.props.className
 * @property  {Array}         NodeAndProps.props.id
 *
 * @returns   {NodeAndProps}
 */

type SelectorData = {
  elementType: string
  className: string[]
  id: string[]
}

export const getSelectorData = (selector: string): SelectorData => {
  const elementType = VALID_ELEMENTS.find(element =>
    selector.startsWith(element)
  )
  if (elementType === undefined) {
    throw new Error(`
      ${selector} is not a valid element.
      See src/config/html.js - VALID_ELEMENTS.
    `)
  }

  const idRegex = /(#[_a-zA-Z]+[_a-zA-Z0-9-]*)/g
  const classRegex = /(\.[_a-zA-Z]+[_a-zA-Z0-9-]*)/g

  return {
    elementType,
    className: regexResults(classRegex)(selector).map(str => str.slice(1)),
    id: regexResults(idRegex)(selector).map(str => str.slice(1))
  }
}
