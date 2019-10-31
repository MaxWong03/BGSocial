import {
  loading,
  list,
} from './user_games_action'


export const initState = {
  loading: true,
  list: [],
}
export const initReducer = (state, {type, data}) => {
  switch (type) {
    case list:
      return {
        ...state,
        list: data
      }
    case loading:
      return {
        ...state,
        loading: data
      }
    default:
      return state
  }
}