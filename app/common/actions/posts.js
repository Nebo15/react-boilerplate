require('es6-promise').polyfill();
require('isomorphic-fetch');

import { normalize, Schema, arrayOf } from 'normalizr';

const post = new Schema('posts', {idAttribute: 'id'});

export const POSTS_RECEIVED= 'POSTS_RECEIVED';

const API_HOST = 'http://localhost:8080';

export function getPosts () {

  return (dispatch) => {
    return fetch(`${API_HOST}/api/posts`, {
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(response) {
        response = normalize(response, arrayOf(post));

        dispatch({
          type: POSTS_RECEIVED,
          payload: response
        });

      });
  }

}

export const POST_RECEIVED = 'POST_RECEIVED';
export function getPost (id) {

  return (dispatch) => {
    return fetch(`${API_HOST}/api/posts/${id}`).then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(response) {

        response = normalize(response, post);

        dispatch({
          type: POST_RECEIVED,
          payload: response
        });

      });
  }

}
