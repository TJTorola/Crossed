/**
 * Takes a regex and query and retuns array of results with regex returned to
 * initial state
 *
 * @param  {Regex}  regex
 * @param  {String} query
 *
 * @return {Array}
 */
export const regexResults = (regex: RegExp) => (
  query: string
): Array<string> => {
  const takeResult = (
    execResult: RegExpExecArray,
    results: Array<string> = []
  ): Array<string> =>
    execResult !== null
      ? takeResult(regex.exec(query), [...results, execResult[0]])
      : results

  return takeResult(regex.exec(query))
}
