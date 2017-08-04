import { takeLatest } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';
// import { flickrImages, shutterStockVideos } from '../Api/api';
import * as types from '../constants/actionTypes';

const shutterStockVideos = () => Promise.resolve({success: true})
const flickrImages = () => Promise.resolve({success: true})


function* _searchMediaSaga({ payload }) {
  try {
    const videos = yield call(shutterStockVideos, payload);
    const images = yield call(flickrImages, payload);
    yield [
      put({ type: types.SHUTTER_VIDEOS_SUCCESS, videos }),
      put({ type: types.SELECTED_VIDEO, video: videos[0] }),
      put({ type: types.FLICKR_IMAGES_SUCCESS, images }),
      put({ type: types.SELECTED_IMAGE, image: images[0] })
    ];
  } catch (error) {
    yield put({ type: 'SEARCH_MEDIA_ERROR', error });
  }
}



// Watches for SEARCH_MEDIA_REQUEST action type asynchronously
export function* watchSearchMedia() {
  yield takeLatest(types.SEARCH_MEDIA_REQUEST, _searchMediaSaga);
}
