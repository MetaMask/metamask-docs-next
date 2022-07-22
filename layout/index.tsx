import React from "react";
import Navbar from './navbar'
import Footer from './footer'
import SideBar from './sidebar'

type PropTypes = {
  children: React.ReactNode,
  pages: string[],
}

const Layout = ({ children, pages }: PropTypes) => {
  return (
    <>
      <Navbar />
      <SideBar pages={pages} />
      <aside>Ballsagnia</aside>
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout;
