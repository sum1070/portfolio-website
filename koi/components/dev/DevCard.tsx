"use client";
import React from 'react';
import { cn } from '@/utils';

const DevCyberCard = () => {
  return (
    <div className="dev-cyber-card">
      <div className="relative w-[190px] h-[254px] transition-all duration-200 active:w-[180px] active:h-[245px] select-none">
        <div className="cyber-canvas absolute inset-0 z-[200] grid grid-cols-5 grid-rows-5">
          {/* Create 9 tracker divs */}
          {[...Array(9)].map((_, i) => (
            <div key={i} className={`tracker tr-${i + 1} cursor-pointer`} />
          ))}

          <div id="card" className="hover-parent absolute inset-0 z-0 flex justify-center items-center rounded-[20px] transition-all duration-700 
            bg-gradient-to-tr from-[#1a1a1a] to-[#262626] border-2 border-white/10 overflow-hidden
            shadow-[0_0_20px_rgba(0,0,0,0.3),inset_0_0_20px_rgba(0,0,0,0.2)]">

            <div className="card-content relative w-full h-full">
              <div className="card-glare absolute inset-0 opacity-0 transition-opacity duration-300
                bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>

              <div className="cyber-lines">
                <span className="absolute top-[20%] left-0 w-full h-[1px] origin-left scale-x-0 animate-lineGrow
                  bg-gradient-to-r from-transparent via-[rgba(92,103,255,0.2)] to-transparent"></span>
                <span className="absolute top-[40%] right-0 w-full h-[1px] origin-right scale-x-0 animate-lineGrow-delay-1
                  bg-gradient-to-r from-transparent via-[rgba(92,103,255,0.2)] to-transparent"></span>
                <span className="absolute top-[60%] left-0 w-full h-[1px] origin-left scale-x-0 animate-lineGrow-delay-2
                  bg-gradient-to-r from-transparent via-[rgba(92,103,255,0.2)] to-transparent"></span>
                <span className="absolute top-[80%] right-0 w-full h-[1px] origin-right scale-x-0 animate-lineGrow-delay-3
                  bg-gradient-to-r from-transparent via-[rgba(92,103,255,0.2)] to-transparent"></span>
              </div>

              <p id="prompt" className="absolute bottom-[100px] left-1/2 -translate-x-1/2 z-20 text-base font-semibold 
                tracking-wider text-white/70 text-center transition-all duration-300 ease-in-out
                shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                HOVER ME
              </p>

              <div className="title absolute w-full text-center text-[28px] font-extrabold tracking-[4px] pt-5 opacity-0 
                transition-all duration-300 ease-in-out
                bg-gradient-to-r from-[#00ffaa] to-[#00a2ff] bg-clip-text text-transparent
                filter drop-shadow-[0_0_15px_rgba(0,255,170,0.3)]
                shadow-[0_0_10px_rgba(92,103,255,0.5),0_0_20px_rgba(92,103,255,0.3)]">
                CYBER<br />CARD
              </div>

              <div className="glowing-elements absolute inset-0 pointer-events-none">
                <div className="glow-1 absolute top-[-20px] left-[-20px] w-[100px] h-[100px] rounded-full 
                  opacity-0 transition-opacity duration-300 ease-in filter blur-[15px]
                  bg-radial-glow"></div>
                <div className="glow-2 absolute top-1/2 right-[-30px] -translate-y-1/2 w-[100px] h-[100px] rounded-full 
                  opacity-0 transition-opacity duration-300 ease-in filter blur-[15px]
                  bg-radial-glow"></div>
                <div className="glow-3 absolute bottom-[-20px] left-[30%] w-[100px] h-[100px] rounded-full 
                  opacity-0 transition-opacity duration-300 ease-in filter blur-[15px]
                  bg-radial-glow"></div>
              </div>

              <div className="subtitle absolute bottom-[40px] w-full text-center text-xs tracking-wider 
                translate-y-[30px] text-white/60">
                <span>INTERACTIVE</span>
                <span className="highlight ml-[5px] font-bold
                  bg-gradient-to-r from-[#5c67ff] to-[#ad51ff] bg-clip-text text-transparent">3D EFFECT</span>
              </div>

              <div className="card-particles">
                <span className="absolute w-[3px] h-[3px] bg-[#00ffaa] rounded-full opacity-0 transition-opacity duration-300"></span>
                <span className="absolute w-[3px] h-[3px] bg-[#00ffaa] rounded-full opacity-0 transition-opacity duration-300"></span>
                <span className="absolute w-[3px] h-[3px] bg-[#00ffaa] rounded-full opacity-0 transition-opacity duration-300"></span>
                <span className="absolute w-[3px] h-[3px] bg-[#00ffaa] rounded-full opacity-0 transition-opacity duration-300"></span>
                <span className="absolute w-[3px] h-[3px] bg-[#00ffaa] rounded-full opacity-0 transition-opacity duration-300"></span>
                <span className="absolute w-[3px] h-[3px] bg-[#00ffaa] rounded-full opacity-0 transition-opacity duration-300"></span>
              </div>

              <div className="corner-elements">
                <span className="absolute top-[10px] left-[10px] w-[15px] h-[15px] border-t-2 border-l-2 border-[rgba(92,103,255,0.3)]
                  transition-all duration-300"></span>
                <span className="absolute top-[10px] right-[10px] w-[15px] h-[15px] border-t-2 border-r-2 border-[rgba(92,103,255,0.3)]
                  transition-all duration-300"></span>
                <span className="absolute bottom-[10px] left-[10px] w-[15px] h-[15px] border-b-2 border-l-2 border-[rgba(92,103,255,0.3)]
                  transition-all duration-300"></span>
                <span className="absolute bottom-[10px] right-[10px] w-[15px] h-[15px] border-b-2 border-r-2 border-[rgba(92,103,255,0.3)]
                  transition-all duration-300"></span>
              </div>

              <div className="scan-line absolute inset-0 
                bg-gradient-to-b from-transparent via-[rgba(92,103,255,0.1)] to-transparent 
                -translate-y-full animate-scanMove"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DevCyberCard;