import { VALID_ELEMENTS } from "../config/html.js"
import { regexResults } from "./utility.js"

/**
 * A selector is a string that is similar to css selectors. It allows us to
 * easily write nodes with unchanging classes and ids.
 *
 * EX: main#crossed
 *     div.is-hidden
 *     div#red.show
 */

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

export const el = () => {}

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

export const selectorToNodeAndProps = selector => {
  const node = VALID_ELEMENTS.find(element => selector.startsWith(element))
  if (node === undefined) {
    throw new Error(`
      ${selector} is not a valid element.
      See src/config/html.js - VALID_ELEMENTS.
    `)
  }

  const idRegex = /(#[_a-zA-Z]+[_a-zA-Z0-9-]*)/g
  const classRegex = /(\.[_a-zA-Z]+[_a-zA-Z0-9-]*)/g

  return {
    node,
    props: {
      className: regexResults(classRegex)(selector).map(str => str.slice(1)),
      id: regexResults(idRegex)(selector).map(str => str.slice(1))
    }
  }
}
