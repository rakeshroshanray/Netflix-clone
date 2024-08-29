import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import HomeScreen from './HomeScreen';
import AuthScreen from './AuthScreen';
import { useAuthStore } from '../../store/authUser';

function HomePage() {
  const {user} = useAuthStore();

  return <div>{user ? <HomeScreen/> : <AuthScreen/>}</div>
}

export default HomePage