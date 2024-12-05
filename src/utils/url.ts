export const getSWAPIUrlId = ({url, splitBy} : {url: string, splitBy: string}) => {
  return url.split(`${splitBy}/`)[1].replace('/', '')
}