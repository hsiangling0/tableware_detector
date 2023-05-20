import React from 'react';
import { Redirect } from 'react-router-dom';


export default function withAuth(Component) {
  const token = JSON.parse(localStorage.getItem('token') || '{}');
  return JSON.stringify(token) === '{}' ? (
    <Redirect to={'/tableware_detector/account'} />
  ) : (
    <div>{Component}</div>
  );
}
