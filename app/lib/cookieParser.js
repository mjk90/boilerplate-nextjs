// we may need a proper parser for cookie string in the future
const cookieParser = (cookies) => {
  if (!cookies) return {};
  return cookies.split(';').reduce((res, cookie) => {
    const [key, value] = cookie.split('=');
    return {
      ...res,
      [key.trim()]: value
    }
  }, {})
}

export default cookieParser;
