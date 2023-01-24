import { connect } from 'react-redux';
import App from './App';
import { initializeAuth } from 'redux/modules/auth';
import {
  addEntry
} from "redux/modules/table";

function mapStateToProps(state) {
  return {
    loggedUser: state.auth.loggedUser,
    isLoading: state.auth.isLoading,
    entities: state.values.entities
  };
}


function mapDispatchToProps(dispatch) {
  return {
    addEntry: (value) => dispatch(addEntry(value)),
    initializeAuth: () => dispatch(initializeAuth())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
