import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_LIST_POST, DELETE_LIST_POST } from "./constant";
import { getPostDataAPI, deletePostDataAPI } from "./API";
import { getListPostSuccess, deletePostDataSuccess } from "./actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* getListPostSaga(action) {
  try {
    const data = yield call(getPostDataAPI);
    yield put(getListPostSuccess(data));
  } catch (error) {
    toast.error("Lỗi rồi, không lấy được data đâu!!!");
  }
}

function* deleteListPostSaga(action) {
  const id = action.payload;
  console.log(">>> arr đã xóa", action);
  try {
    const data = yield call(deletePostDataAPI, id);
    console.log(">>> arr đã xóa", data);
    yield put(deletePostDataSuccess(data));
    toast.success("Xóa thành công!", { autoClose: 2000 });
  } catch (error) {
    toast.error("Lỗi rồi, không xóa đâu!!!", { autoClose: 2000 });
  }
}

function* getSaga() {
  yield takeLatest(GET_LIST_POST, getListPostSaga);
}

function* deleteSaga() {
  yield takeLatest(DELETE_LIST_POST, deleteListPostSaga);
}

function* postsSaga() {
  yield all([getSaga(), deleteSaga()]);
}

export default postsSaga;
