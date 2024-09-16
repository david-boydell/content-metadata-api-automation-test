import get from 'lodash.get'

const dotPath = (string) => {
  return string.replaceAll(' ', '.')
}

const iterate = (json, string) => {
  return get(json, dotPath(string))
}

export { dotPath, iterate }
