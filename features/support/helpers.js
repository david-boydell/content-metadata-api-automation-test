import get from 'lodash.get'

const iterate = (json, string) => {
  return get(json, string)
}

export { iterate }
