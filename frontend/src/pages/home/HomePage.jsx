import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import HomeScreen from './HomeScreen';
import AuthScreen from './AuthScreen';

function HomePage() {
  const user = false;

  return <div>{user ? <HomeScreen/> : <AuthScreen/>}</div>
}

export default HomePage