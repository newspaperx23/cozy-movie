import React, { useState } from 'react'
import logo from './../assets/images/COZY.png'
import { HiHome, HiMagnifyingGlass , HiStar, HiPlayCircle, HiTv } from 'react-icons/hi2'
import { HiPlus, HiDotsVertical } from 'react-icons/hi'
import HeaderItem from './HeaderItem'
import { Link } from 'react-router-dom'

const Header = () => {
    const [toggle, setToggle] = useState(false);

    const menu = [
        { name: 'HOME', icon: HiHome , path: '/' },
        { name: 'SEARCH', icon: HiMagnifyingGlass },
        { name: 'WATCH LIST', icon: HiPlus },
        { name: 'ORIGINALS', icon: HiStar },
        { name: 'MOVIES', icon: HiPlayCircle },
        { name: 'SERIES', icon: HiTv },
    ];

    return (
        <div className='fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur px-5 rounded-lg m-4'>
            <div className='flex items-center justify-between w-full gap-2 md:gap-8'>
                {/* โลโก้ */}
                <img src={logo} className='w-[80px] md:w-[80px] object-cover'/>
                
                {/* เมนูสำหรับหน้าจอขนาดกลางขึ้นไป */}
                <div className='hidden md:flex gap-8'>
                    {menu.map((item, index) => (
                        <Link to={item.path} key={index}>
                            <HeaderItem key={index} name={item.name} Icon={item.icon}/>
                        </Link>
                    ))}
                </div>

                {/* เมนูสำหรับหน้าจอเล็ก */}
                <div className='flex gap-10 md:hidden'>
                    {menu.map((item, index) => index < 3 && (
                        <Link to={item.path} key={index}>
                            <HeaderItem key={index} name={''} Icon={item.icon}/>
                        </Link>
                    ))}

                    {/* เมนูตัวเลือกเพิ่มเติม */}
                    <div onClick={() => setToggle(!toggle)}>
                        <HeaderItem name={''} Icon={HiDotsVertical}/>
                        {toggle && (
                            <div className='absolute mt-3 bg-[#121212] border p-3 px-5 py-4'>
                                {menu.map((item, index) => index > 2 && (
                                    <HeaderItem key={index} name={item.name} Icon={item.icon}/>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* โปรไฟล์ */}
                <img src="https://avatars.githubusercontent.com/u/187186211?v=4" className='w-[40px] h-[40px] rounded-full'/>
            </div>
        </div>
    )
}

export default Header;
