import Image from "next/image";
import React from "react";

const Profile = () => {
  return (
    <>
      {/* profile image */}

      <div className="relative min-h-full p-12 flex">
        <div className="container max-w-screen-xl mx-auto flex flex-col justify-center items-center text-center space-y-6">
          <button className="relative bg-[#DC143C] p-[2px] rounded-full">
            <div className="flex items-center justify-center bg-transparent text-sm text-white">
              <div className="">
                <Image
                  layout="fixed"
                  src="https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                  alt="Profile"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </button>
          <div className="text-slate-200">Name: Anuj</div>
        </div>
      </div>
    </>
  );
};

const LeftPanel = () => {
  return (
    <div>
      <Profile />
    </div>
  );
};
export default LeftPanel;
