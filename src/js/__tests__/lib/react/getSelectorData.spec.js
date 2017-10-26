import test from "ava"
import crossed from "../../../build/crossed.js"

const { getSelectorData } = crossed.lib.react

test("it returns correct structure", t => {
  t.deepEqual(getSelectorData("div"), {
    elementType: "div",
    className: [],
    id: []
  })
})

test("it throws when given an invalid element", t => {
  t.throws(() => getSelectorData("dev"))
})

test("it adds a single class", t => {
  t.deepEqual(getSelectorData("div.class"), {
    elementType: "div",
    className: ["class"],
    id: []
  })
})

test("it adds a single id", t => {
  t.deepEqual(getSelectorData("div#id"), {
    elementType: "div",
    className: [],
    id: ["id"]
  })
})

test("it adds a multiple classes", t => {
  const result = getSelectorData("div.classOne.classTwo")
  t.true(result.className.includes("classOne"))
  t.true(result.className.includes("classTwo"))
})

test("it adds a multiple ids", t => {
  const result = getSelectorData("div#idOne#idTwo")
  t.true(result.id.includes("idOne"))
  t.true(result.id.includes("idTwo"))
})

test("it adds a multiple classes and ids", t => {
  const result = getSelectorData("div#idOne.classOne#idTwo.classTwo")
  t.true(result.className.includes("classOne"))
  t.true(result.className.includes("classTwo"))
  t.true(result.id.includes("idOne"))
  t.true(result.id.includes("idTwo"))
})
