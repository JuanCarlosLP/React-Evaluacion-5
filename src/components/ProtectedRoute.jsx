import React from "react";
import { Route } from "react-router-dom";
//* Components
import SignIn from './SignIn';

export default function ProtectedRoute(props) {
  return (
    <Route path={props.path}>
      {props.user ? 
      (props.children) :
      (
        <SignIn setUserFn={props.setUserFn} />
      )}
    </Route>
  );
}