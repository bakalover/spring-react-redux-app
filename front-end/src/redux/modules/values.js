import entryAPI from 'api/entryAPI';
import { logout } from './auth';
import { setEntries, addEntry } from './table';

const SELECT_R = 'lab4/values/SELECT_R';
const SELECT_X = 'lab4/values/SELECT_X';
const CHANGE_Y = 'lab4/values/CHANGE_Y';
const CHANGE_MES = 'lab4/values/CHANGE_MES';
const CLEAR_CURRENT = 'lab4/values/CLEAR_CURRENT';

const initialState = {
  rValues: [-4, -3, -2, -1, 0, 1, 2, 3, 4],
  rCurrent: 1,
  xValues: [-4, -3, -2, -1, 0, 1, 2, 3, 4],
  xCurrent: undefined,
  yMin: -5,
  yMax: 5,
  yCurrent: undefined,
  mesCurrent: undefined
};

export default function valuesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SELECT_R:
      return Object.assign(
        {},
        state,
        {
          rCurrent: action.value
        }
      );
    case SELECT_X:
      return Object.assign(
        {},
        state,
        {
          xCurrent: action.value
        }
      );
    case CHANGE_Y:
      return Object.assign(
        {},
        state,
        {
          yCurrent: action.value
        }
      );
      case CHANGE_MES:
      return Object.assign(
        {},
        state,
        {
          mesCurrent: action.value
        }
      );
    case CLEAR_CURRENT:
      return Object.assign(
        {},
        state,
        {
          rCurrent: 1,
          xCurrent: undefined,
          yCurrent: undefined
        }
      );
    default:
      return state;
  }
}

export function selectR(value) {
  return { type: SELECT_R, value };
}

export function selectX(value) {
  return { type: SELECT_X, value };
}

export function changeY(value) {
  return { type: CHANGE_Y, value };
}

export function clearCurrent() {
  return { type: CLEAR_CURRENT };
}

export const checkEntry = () => (dispatch, getState) => {
  entryAPI.checkEntry(
    getState().values.xCurrent,
    getState().values.yCurrent,
    getState().values.rCurrent,
    JSON.parse(localStorage.getItem('userWl4')).jwt)
    .then(response => {
      if (response.status === 200) {
        dispatch(addEntry(response.data));
      } else {
        alert(`Непредвиденный ответ ${response.status} от сервера!`);
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        dispatch(logout());
      } else {
        alert(`Непредвиденный ответ ${error.response.status} от сервера!`);
      }
    });;
}

export const clearEntries = () => (dispatch) => {
  entryAPI.clearEntries(JSON.parse(localStorage.getItem('userWl4')).jwt)
    .then(response => {
      if (response.status === 200) {
        dispatch(setEntries([]));
      } else {
        alert(`Непредвиденный ответ ${response.status} от сервера!`);
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        dispatch(logout());
      } else {
        alert(`Непредвиденный ответ ${error.response.status} от сервера!`);
      }
    });;
}