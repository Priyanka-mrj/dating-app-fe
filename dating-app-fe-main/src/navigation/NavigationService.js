import {
  CommonActions,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

const navigationRef = createNavigationContainerRef();

function getState() {
  return navigationRef?.getState();
}

function navDispatch(args) {
  navigationRef.dispatch(args);
}

function navigate(name, params = null) {
  navigationRef.dispatch(
    CommonActions.navigate({
      name,
      params,
    }),
  );
}

function push(name, params) {
  navigationRef.dispatch(
    StackActions.push({
      name,
      params,
    }),
  );
}

function replace(name, params) {
  navigationRef.dispatch(
    StackActions.replace({
      name,
      params,
    }),
  );
}

function popToTop() {
  navigationRef.dispatch(StackActions.popToTop());
}

function pop(navigationObject) {
  navigationRef.dispatch(StackActions.pop(navigationObject));
}

function goBack() {
  navigationRef.dispatch(CommonActions.goBack());
}

function setParams(routeKey, params = {}) {
  if (routeKey && params) {
    navigationRef.dispatch({
      ...CommonActions.setParams({...params}),
      source: routeKey,
    });
  }
}

export {
  getState,
  navDispatch,
  navigate,
  navigationRef,
  push,
  popToTop,
  replace,
  pop,
  goBack,
  setParams
};
