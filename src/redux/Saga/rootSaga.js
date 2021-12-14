import { all } from 'redux-saga/effects';
import { auth_checkLoginWatcher, auth_LoginWatcher, logout_UserWatcher } from './loginSaga';

function* rootSaga() {
	yield all([auth_LoginWatcher(), auth_checkLoginWatcher(), logout_UserWatcher()]);
}
export default rootSaga;
