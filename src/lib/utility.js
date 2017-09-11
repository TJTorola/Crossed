/**
 * Takes a regex and query and retuns array of results with regex returned to
 * initial state
 *
 * @param  {Regex}  regex
 * @param  {String} query
 *
 * @return {Array}
 */
const regexResults = regex => query => {
  const takeResult = (execResult, results = []) =>
    execResult !== null
      ? takeResult(regex.exec(query), [...results, execResult[0]])
      : results

  return takeResult(regex.exec(query))
}

export default {
  regexResults
}
