import React from "react";

const SidebarSection = () => {
    return (
      <div className="hidden sm:block w-[206px] h-[200px] rounded-2xl mx-auto mt-[85px] p-4 bg-gray-100 relative">
        <div className="w-[66px] h-[66px] rounded-full bg-gray-100 absolute top-[-33px] left-[66px] ">
          <div className="top-[-16.5px] left-[-16.5px] absolute">
            <svg
              width="101"
              height="101"
              viewBox="0 0 101 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_f_0_1)">
                <circle
                  cx="50.5"
                  cy="50.5"
                  r="16.5"
                  fill="#fbc912"
                  fillOpacity="0.7"
                />
              </g>
              <path
                d="M58.21 45.36C57.17 43.26 55.16 41.71 52.83 41.2C50.39 40.66 47.89 41.24 45.98 42.78C44.06 44.31 42.97 46.6 42.97 49.05C42.97 51.64 44.52 54.35 46.86 55.92V56.75C46.85 57.03 46.84 57.46 47.18 57.81C47.53 58.17 48.05 58.21 48.46 58.21H53.59C54.13 58.21 54.54 58.06 54.82 57.78C55.2 57.39 55.19 56.89 55.18 56.62V55.92C58.28 53.83 60.23 49.42 58.21 45.36Z"
                fill="#FBCB18"
              />
              <path
                d="M54.26 61C54.2 61 54.13 60.99 54.07 60.97C52.06 60.4 49.95 60.4 47.94 60.97C47.57 61.07 47.18 60.86 47.08 60.49C46.97 60.12 47.19 59.73 47.56 59.63C49.82 58.99 52.2 58.99 54.46 59.63C54.83 59.74 55.05 60.12 54.94 60.49C54.84 60.8 54.56 61 54.26 61Z"
                fill="#FBCB18"
              />
              <defs>
                <filter
                  id="filter0_f_0_1"
                  x="0"
                  y="0"
                  width="101"
                  height="101"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="17"
                    result="effect1_foregroundBlur_0_1"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-5">
          <span className="text-sm text-center font-medium text-black">
            Thoughts Time
          </span>
          <p className="text-xs text-center font-normal text-gray-500 w-[166px] mt-3">
            We don’t have any notice for you, till then you can share your
            thoughts with your peers.
          </p>
          <input
            type="text"
            placeholder="Write a message"
            className="w-[166px] h-[40px] rounded outline-none bg-white p-3 mt-3 placeholder:text-center placeholder-black placeholder:text-sm placeholder:font-medium"
          />
        </div>
      </div>
    );
  };
  
  export default SidebarSection;
  