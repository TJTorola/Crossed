import test from "ava"
import { selectorToNodeAndProps } from "./el.js"

test("selectorToNodeAndProps() returns correct structure", t => {
  t.deepEqual(selectorToNodeAndProps("div"), {
    node: "div",
    props: {
      className: [],
      id: []
    }
  })
})

test("selectorToNodeAndProps() adds a single class", t => {
  t.deepEqual(selectorToNodeAndProps("div.class"), {
    node: "div",
    props: {
      className: ["class"],
      id: []
    }
  })
})

test("selectorToNodeAndProps() adds a single id", t => {
  t.deepEqual(selectorToNodeAndProps("div#id"), {
    node: "div",
    props: {
      className: [],
      id: ["id"]
    }
  })
})

test("selectorToNodeAndProps() adds a multiple classes", t => {
  const result = selectorToNodeAndProps("div.classOne.classTwo")
  t.true(result.props.className.includes("classOne"))
  t.true(result.props.className.includes("classTwo"))
})

test("selectorToNodeAndProps() adds a multiple ids", t => {
  const result = selectorToNodeAndProps("div#idOne#idTwo")
  t.true(result.props.id.includes("idOne"))
  t.true(result.props.id.includes("idTwo"))
})

test("selectorToNodeAndProps() adds a multiple classes and ids", t => {
  const result = selectorToNodeAndProps("div#idOne.classOne#idTwo.classTwo")
  t.true(result.props.className.includes("classOne"))
  t.true(result.props.className.includes("classTwo"))
  t.true(result.props.id.includes("idOne"))
  t.true(result.props.id.includes("idTwo"))
})
