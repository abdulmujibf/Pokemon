import {createStore} from 'redux'

const initState = {
  favorites: []
}

const reducer = (state = initState, action) => {
  const {type, payload} = action
  switch(type){
    case 'ADDFAVORITES':
      return {...state, favorites: [...state.favorites, payload]}
    default:
      return state
  }
}

const store = createStore(reducer)

export default store