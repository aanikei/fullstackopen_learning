const filterReducer = (state = '', action) => {
  console.log('filterReducer action', action)
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload
    default:
      return state
  }
}

export const filterChange = filter => {
  console.log('filterChange filter', filter)
  return {
    type: 'SET_FILTER',
    payload: filter,
  }
}

export default filterReducer
