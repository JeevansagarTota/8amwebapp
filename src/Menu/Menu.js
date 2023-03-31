import React,{lazy,Suspense} from 'react'
import './Menu.css'
// import Home from '../Home'
// import About from '../About'
// import Contact from '../Contact'

import {HashRouter,Route,Routes,Navigate} from 'react-router-dom'
const Home=lazy(()=>import('../Home'))
const About=lazy(()=>import('../About'))
const Contact=lazy(()=>import('../Contact'))
const Menu = () => {
    const [myLeft,setMyLeft]=React.useState(-170)
    const [menuItem,setMenuItem]=React.useState('home')
    const [isMobileView, setIsMobileView]=React.useState(document.body.offsetWidth < 600 ? true:false )
    let flag=true
    let timeOutId;
    window.addEventListener('resize',(eve)=>{
        if(flag){
            fnHandleResize()
            flag=false
        }
        clearTimeout(timeOutId)
        timeOutId=setTimeout(()=>{
            fnHandleResize()
        },1000)
    })
    const fnHandleResize=()=>{
        const _width=document.body.offsetWidth
        setIsMobileView(_width > 600 ? false : true)
    }

    const fnClick=(eve)=>{
        eve.stopPropagation()
        const {id,nodeName} =eve.target
        if(nodeName == 'DIV')return;
        setMenuItem(id)
        if(isMobileView){
            setMyLeft(-170)
        }
    }
    const fnMobileMenuBtnClick=()=>{
        setMyLeft(myLeft== 0 ? -170 : 0)
    }
    return <div>
            {isMobileView && <img src='mobile-menu.jpeg' onClick={fnMobileMenuBtnClick} className="mobile-menu-btn"/>}
           <div onClick={fnClick} style={{left:myLeft}} className={isMobileView ? 'mobile-menu' : 'menu'}>
                <a href="#/home" id='home' className={menuItem == 'home' && 'menu-active'} >Home</a>
                <a href="#/about" id='about' className={menuItem == 'about' && 'menu-active'} >About</a>
                <a href="#/contact" id='contact' className={menuItem == 'contact' && 'menu-active'} >Contact</a>
               
            </div>
            <HashRouter>
                <Suspense fallback='Loading...'>
                        <Routes>
                                  <Route path="/home" element={<Home/>}/>
                                  <Route path="/about" element={<About/>}/>  
                                  <Route path="/contact" element={<Contact/>}/>
                                  <Route path="*" element={<Navigate to='/home'/>}/>
                        </Routes>
                </Suspense>
            </HashRouter>
         
         </div>
}

export default Menu
