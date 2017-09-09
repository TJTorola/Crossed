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
