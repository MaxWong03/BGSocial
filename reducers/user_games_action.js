export const loading = 'LOADING'
export const list = 'LIST'
export const updateLoading = (data) => ({
  type: loading,
  data
})
export const updateList = (data) => ({
  type: list,
  data
})