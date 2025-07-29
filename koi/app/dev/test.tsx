'use client';

import { TextHoverEffect } from "@/components/ui/dev/text-hover-effect";
import Dummy from "./dummy";
import Scroll from "@/components/Scroll";
import Hero from "@/components/sections/Hero";

// Define styles that can be reused
const navStyles = {
  fontSize: '1.0416666667vw',
  fontFamily: 'YakuHanJP, Roboto, Zen Kaku Gothic New, sans-serif',
  fontWeight: 500,
  lineHeight: 1,
  color: '#fff',
};

export function Test() {
    return (
        <>
            <div 
                className="kv__left is-PC w-[13.8020833333vw] flex-none"
                style={{
                    backgroundAttachment: 'fixed',
                    backgroundImage: 'url(../images/bg_kv_nav-3ryOvaYu.jpg)',
                    backgroundSize: '13.8020833333vw auto',
                    color: '#fff',
                    fontFamily: 'YakuHanJP, Roboto, Zen Kaku Gothic New, sans-serif',
                    fontWeight: 500,
                    lineHeight: 1,
                    fontSize: '1.0416666667vw',
                }}
            >
                <ul className="navi">
                    <li className="navi-news">
                        <a href="/news/" className="block">
                            <p className="navi-text__news" style={{ 
                                color: 'var(--color-text-base, #4d4d4d)',
                                transition: 'color 0.3s ease'
                            }}>News</p>
                            <div className="arrow flex">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.78 48.19" className="nuxt-icon--fill" preserveAspectRatio="xMidYMid meet">
                                    <path d="m7.76 48.19-7.59-7.6 16.41-16.41L0 7.6 7.6 0l24.18 24.18z"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.78 48.19" className="nuxt-icon--fill" preserveAspectRatio="xMidYMid meet">
                                    <path d="m7.76 48.19-7.59-7.6 16.41-16.41L0 7.6 7.6 0l24.18 24.18z"></path>
                                </svg>
                            </div>
                        </a>
                    </li>
                    <li className="navi-about">
                        <a href="/about/" className="block">
                            <p className="navi-text__about" style={{ 
                                color: 'var(--color-text-base, #4d4d4d)',
                                transition: 'color 0.3s ease'
                            }}>About</p>
                            <div className="arrow flex">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.78 48.19" className="nuxt-icon--fill" preserveAspectRatio="xMidYMid meet">
                                    <path d="m7.76 48.19-7.59-7.6 16.41-16.41L0 7.6 7.6 0l24.18 24.18z"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.78 48.19" className="nuxt-icon--fill" preserveAspectRatio="xMidYMid meet">
                                    <path d="m7.76 48.19-7.59-7.6 16.41-16.41L0 7.6 7.6 0l24.18 24.18z"></path>
                                </svg>
                            </div>
                        </a>
                    </li>
                    <li className="navi-webstore">
                        <a href="https://webstore.cygames.com/umamusume/" rel="noopener noreferrer" target="_blank" className="block">
                            <p className="navi-text__webstore" style={{ 
                                color: 'var(--color-text-base, #4d4d4d)',
                                transition: 'color 0.3s ease'
                            }}>WebStore</p>
                        </a>
                    </li>
                </ul>
            </div>
            {/* <TextHoverEffect text={"nihao"}/>   */}
            {/* <Hero />
            
            <Dummy />
            <Dummy /> */}
        </>
    );
}
