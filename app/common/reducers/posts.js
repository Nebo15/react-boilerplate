
import Immutable from 'immutable'
import {POST_RECEIVED, POSTS_RECEIVED} from '../actions/posts'

const initialState = Immutable.fromJS({
  indexPagePosts: [],
  entities: {
    posts: {}
  }
});
export default function (state = initialState, action) {
  switch (action.type) {
    case POSTS_RECEIVED: {
      return state.mergeDeep({
        indexPagePosts: action.payload.result,
        entities: action.payload.entities
      });
    }
    case POST_RECEIVED: {
      return state.mergeDeep({
        entities: action.payload.entities
      });
    }
  }
  return state;
}
