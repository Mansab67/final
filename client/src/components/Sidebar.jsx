import React from 'react'
import SidebarIcon from './SidebarIcon'
import logo from "../assets/colorfilter.png"
import AddIcon from '../assets/add-square.png'
import Arrow from "../assets/arrow.png"
import HomeIcon from "../assets/category.png"
import MessageIcon from "../assets/message.png";
import TaskIcon from "../assets/task-square.png";
import GroupIcon from "../assets/profile-2user.png";
import SettingIcon from "../assets/setting-2.png";
import SidebarSection from './SidebarSection'
import SidebarContent from './SidebarContent'
import '../App.css'

const Sidebar = () => {
  return (
    <div className="flex-1 border-r sticky top-0 left-0 border-gray-300 min-h-screen bg-white w-[50px] sm:min-w-[250px] xl:min-w-[280px]">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet"></link>
      <header className="h-20 flex justify-between items-center px-[13px] sm:px-[22px]">
        <span className="flex text-xl sm:text-lg font-semibold text-black gap-[9px]">
          <img src={logo} alt="logo" />
          <p className="opacity-0 md:opacity-100 logo-span">Project M.</p>
        </span>
        <img src={Arrow} alt="arrow" className="mr-3 hidden sm:block" />
      </header>

      <hr className="border-t border-gray-300" />

      <ul className="my-0 mx-[13px] py-[30px] px-0 flex flex-col gap-[25px] border-b border-b-grey-light-1">
        <SidebarIcon icon={HomeIcon} text="Home" />
        <SidebarIcon icon={MessageIcon} text="Messages" />
        <SidebarIcon icon={TaskIcon} text="Tasks" />
        <SidebarIcon icon={GroupIcon} text="Members" />
        <SidebarIcon icon={SettingIcon} text="Settings" />
      </ul>

      <header className="hidden sm:flex justify-between border-gray-400 items-center mt-[30px] mb-5 mx-[22px]">
        <span className="text-xs text-[#787486] font-bold">MY PROJECTS</span>
        <img src={AddIcon} alt="add" />
      </header>
      <SidebarContent />
      <SidebarSection />
    </div>

  );
};

export default Sidebar;