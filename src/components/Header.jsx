import React, { useState, useEffect } from "react";
import logo from "./../assets/images/COZY.png";
import { HiHome, HiMagnifyingGlass, HiStar, HiPlayCircle, HiTv } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { HiPlus, HiDotsVertical } from "react-icons/hi";
import HeaderItem from "./HeaderItem";
import { Link } from "react-router-dom";
import { auth, provider } from "../Services/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [user] = useAuthState(auth); // ดึงสถานะผู้ใช้
  const [profilePhoto, setProfilePhoto] = useState(null); // เก็บ URL รูปโปรไฟล์
  const [userName, setUserName] = useState(null); // เก็บชื่อผู้ใช้

  // อัปเดตข้อมูลโปรไฟล์ผู้ใช้เมื่อสถานะเปลี่ยน
  useEffect(() => {
    if (user) {
      setProfilePhoto(user.photoURL); // อัปเดต URL รูปโปรไฟล์
      setUserName(user.displayName); // อัปเดตชื่อผู้ใช้
    } else {
      setProfilePhoto(null);
      setUserName(null);
    }
  }, [user]); // ทำงานเมื่อสถานะผู้ใช้เปลี่ยน

  // ฟังก์ชันสำหรับ Login
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // ฟังก์ชันสำหรับ Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const menu = [
    { name: "HOME", icon: HiHome, path: "/" },
    // { name: "SEARCH", icon: HiMagnifyingGlass },
    { name: "WATCHLIST", icon: HiPlus, path: "/watchlist" },
    // { name: "ORIGINALS", icon: HiStar },
    { name: "MOVIES", icon: HiPlayCircle },
    { name: "SERIES", icon: HiTv },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur px-5 rounded-lg m-4">
      <div className="flex items-center justify-between w-full gap-2 md:gap-8">
        {/* โลโก้ */}
        <Link to="/">
          <img src={logo} className="w-[80px] md:w-[80px] object-cover" alt="Cozy Logo" />
        </Link>

        {/* เมนูสำหรับหน้าจอขนาดกลางขึ้นไป */}
        <div className="hidden md:flex gap-8">
          {menu.map((item, index) => (
            <Link to={item.path || "#"} key={index}>
              <HeaderItem key={index} name={item.name} Icon={item.icon} />
            </Link>
          ))}
        </div>

        {/* เมนูสำหรับหน้าจอเล็ก */}
        <div className="flex gap-10 md:hidden">
          {menu.map((item, index) => index < 3 && (
            <Link to={item.path || "#"} key={index}>
              <HeaderItem key={index} name={""} Icon={item.icon} />
            </Link>
          ))}

          {/* เมนูตัวเลือกเพิ่มเติม */}
          <div className="hidden md:flex" onClick={() => setToggle(!toggle)}>
            <HeaderItem name={""} Icon={HiDotsVertical} />
            {toggle && (
              <div className="absolute mt-3 bg-[#121212] border p-3 px-5 py-4">
                {menu.map((item, index) => index > 2 && (
                  <HeaderItem key={index} name={item.name} Icon={item.icon} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* โปรไฟล์ */}
        <div className="flex items-center gap-2 mx-1">
          {user ? (
            <>
              <img
                src={profilePhoto}
                alt={`${userName}'s Profile`}
                className="w-8 h-8 mt-5 mb-5 rounded-full"
              />
              <h2 className="hidden lg:block text-lg font-semibold mt-5 mb-5">
                {userName}
              </h2>
              <button
                onClick={handleLogout}
                className="mt-5 mb-5 px-2 md:bg-red-500 text-white rounded-md"
              >
                <IoLogOutOutline className="text-2xl" />
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-all"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
