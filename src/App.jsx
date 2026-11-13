import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import BlogAdmin from "./pages/BlogAdmin";
import "./blog-cms.css";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    AOS.init({ duration: 750, easing: "ease-out-cubic", once: true, offset: 55, disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches });
  }, []);
  useEffect(() => {
    const blog = pathname.startsWith("/blog");
    document.title = blog ? "Journaling & Personal Growth Blog | Prnni’s Diary" : "Prnni’s Diary | 90-Day Guided Journal & Daily Planner";
    const description = blog ? "Explore journaling, daily planning, gratitude, time management and personal growth ideas from Prnni’s Diary." : "Discover Prnni’s Diary, a 90-day guided journal and daily planner for goal setting, time management, gratitude, reflection and better habits.";
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", document.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", description);
    const timer = setTimeout(() => AOS.refreshHard(), 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.history.scrollRestoration = "manual";
      if (hash && hash !== "#home") {
        const element = document.getElementById(hash.slice(1));
        element?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        window.scrollTo(0, 0);
      }
    }, 80);

    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

function SiteRoutes(){
 const {pathname}=useLocation(); const admin=pathname.startsWith('/admin-panel');
 useEffect(()=>{if(!admin)return;const m=document.createElement('meta');m.name='robots';m.content='noindex,nofollow';document.head.append(m);return()=>m.remove();},[admin]);
 return <><ScrollManager />{!admin&&<Header/>}<Routes><Route path="/" element={<main><Home/></main>}/><Route path="/blog" element={<main><Blog/></main>}/><Route path="/blog/:slug" element={<main><BlogDetail/></main>}/><Route path="/admin-panel" element={<BlogAdmin/>}/><Route path="*" element={<main><Home/></main>}/></Routes>{!admin&&<Footer/>}</>;
}
export default function App(){return <BrowserRouter><SiteRoutes/></BrowserRouter>}