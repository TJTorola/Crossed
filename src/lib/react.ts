import { VALID_ELEMENTS } from "../config/html"
import { regexResults } from "./utility"

/**
 * A selector is a string that is similar to css selectors. It allows us to
 * easily write nodes with unchanging classes and ids.
 *
 * EX: main#crossed
 *     div.is-hidden
 *     div#red.show
 */

const joinClasses = (
  selectorData: SelectorData,
  props
): { className?: string } => {
  const classArr = [...(props.className || []), ...selectorData.className]
  return classArr.length > 0 ? { className: classArr.join(" ") } : {}
}

const joinIds = (selectorData: SelectorData, props): { id?: string } => {
  const idArr = [...(props.id || []), ...selectorData.id]
  return idArr.length > 0 ? { id: idArr.join(" ") } : {}
}

/**
 * el()
 * A wrapper around React.createElement to provide a more succient API
 *
 * @arg       {String}        selector
 * @arg       {Object}        props
 * @arg       {Array}         children
 *
 * @returns   {React.element}
 */

export const el = (selector, ...propsAndChildren) => {
  const props =
    propsAndChildren[0] !== null && typeof propsAndChildren[0] === "object"
      ? propsAndChildren[0]
      : {}

  const children =
    Array.isArray(propsAndChildren[0]) ||
    typeof propsAndChildren[0] === "string"
      ? propsAndChildren[0]
      : Array.isArray(propsAndChildren[1]) ||
        typeof propsAndChildren[1] === "string"
        ? propsAndChildren[1]
        : undefined

  const selectorData = getSelectorData(selector)
  const mergedProps = Object.assign(
    {},
    props,
    joinClasses(selectorData, props),
    joinIds(selectorData, props)
  )

  return React.createElement(selectorData.elementType, mergedProps, children)
}

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
