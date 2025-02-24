import React from 'react'
import SidebarBullet from "../SidebarBullet";
import Todo from './Todo.jsx'

const Contents = () => {
  return (
    <div>
      <div className='w-2xs flex py-5 text-lg invite'>
        <SidebarBullet color="bg-indigo-800" />To Do
      </div>
      <hr class="w-48 h-1 mx-auto bg-violet-600 border-0 rounded-sm dark:bg-gray-700"/>
      <Todo/>
    </div>
  )
}

export default Contents
