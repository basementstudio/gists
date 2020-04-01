// A "casual" uid generator.
// The magic here is done in .toString(36), which converts an integer into a 12 digit string.

function getRandomString(length = 7) {
  return Math.random()
    .toString(36)
    .substr(2, length) // Remove first two characters because one includes a dot
}

export default (length = 7, result = getRandomString(length)) => {
  if (length > 200) throw "Max length is 200"
  if (result.length < length) {
    const toAdd = getRandomString(length - result.length)
    return uid(length, `${result}${toAdd}`)
  } else if (result.length > length) {
    return result.substr(0, length)
  } else return result
}
