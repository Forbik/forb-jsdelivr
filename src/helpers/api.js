const apiUrl = process.env.VUE_APP_API_URL

const createEndpoint = (path, params) => {
  const queryParams = new URLSearchParams(params).toString()
  return `${apiUrl}${path}?${queryParams}`
}

export { createEndpoint }