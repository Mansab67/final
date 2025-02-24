import PropTypes from "prop-types";
import React from "react";

const SidebarBullet = ({ text, color }) => {
    const bgColor = `w-[8px] h-[8px] rounded-full ${color}`;

    return (
        <li
            className={`flex items-center justify-between mx-3 pl-3 py-[10px] rounded-md ${text === "Mobile App" && "font-semibold bg-purple-200 bg-opacity-30"
                } hover:cursor-pointer transition relative`}
        >
            <div className="flex items-center justify-center">
                <div className={bgColor}></div>
                <span className="text-base ml-3">{text}</span>
            </div>
            <div
                className={`flex justify-center items-center absolute top-1/2 right-2 mr-4 transform -translate-y-1/2 ${text === "Mobile App" ? "visible" : "invisible"
                    }`}
            >
                <div className="w-[3px] h-[3px] rounded-full bg-black"></div>
                <div className="w-[3px] h-[3px] rounded-full bg-black mx-1"></div>
                <div className="w-[3px] h-[3px] rounded-full bg-black"></div>
            </div>
        </li>
    );
};

SidebarBullet.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
};

export default SidebarBullet;