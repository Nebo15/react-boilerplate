
import Immutable from 'immutable'
import {POST_RECEIVED, POSTS_RECEIVED} from '../actions/posts'

const initialState = Immutable.fromJS({});
export default function (state = initialState, action) {
  switch (action.type) {
    case POSTS_RECEIVED: {
      return state.merge(action.payload);
    }
    case POST_RECEIVED: {
      return state.merge(action.payload);
    }
  }
  return state;
}
