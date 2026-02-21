import React from 'react'
import { Navigate } from 'react-router-dom'

function RenderRootPage() {
  return (
    <Navigate to="/user/home"/>
  )
}

export default RenderRootPage
