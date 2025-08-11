"use client";

import React from 'react';

const TechSkills = () => {
  const scrollToSection = (id: string) => {
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-20">
      {/* FRONTEND */}
      <div className="flex md:flex-row flex-col gap-8 items-start" id="frontend">
        {/* Label */}
        <div className="w-full md:w-1/5 text-gray-400 text-lg font-bold sticky top-18">
          <div 
            className="category-label cursor-pointer hover:text-white transition"
            onClick={() => scrollToSection('frontend')}
          >
            FRONTEND
          </div>
        </div>

        {/* Tech Grid */}
        <div className="w-full md:w-4/5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 reveal-section">
          <div className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className="w-6 h-6" alt="JavaScript" />
            <span className="text-lg">Javascript</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-6 h-6" alt="React" />
            <span className="text-lg">React</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" className="w-6 h-6" alt="Tailwind CSS" />
            <span className="text-lg">Tailwind CSS</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" className="w-6 h-6" alt="HTML" />
            <span className="text-lg">HTML</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" className="w-6 h-6" alt="CSS" />
            <span className="text-lg">CSS</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-wave-square"></i>
            <span className="text-lg">GSAP</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="./assets/framer-logo.png" className="w-6 h-6" id="framer" alt="Framer Motion" />
            <span className="text-lg">Framer Motion</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" className="w-6 h-6" alt="C" />
            <span className="text-lg">C</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" className="w-6 h-6" alt="C++" />
            <span className="text-lg">C++</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" className="w-6 h-6" alt="Bootstrap" />
            <span className="text-lg">Bootstrap</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className="w-6 h-6" alt="Python" />
            <span className="text-lg">Python</span>
          </div>
        </div>
      </div>

      {/* BACKEND */}
      <div className="flex md:flex-row flex-col gap-8 items-start" id="backend">
        <div className="w-full md:w-1/5 text-gray-400 text-lg font-bold sticky top-18">
          <div 
            className="category-label cursor-pointer hover:text-white transition"
            onClick={() => scrollToSection('backend')}
          >
            BACKEND
          </div>
        </div>
        <div className="w-full md:w-4/5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 reveal-section">
          <div className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" className="w-6 h-6" alt="Node.js" />
            <span className="text-lg">Node.js</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" className="w-6 h-6 bg-white rounded-full p-0.5" alt="Next.js" />
            <span className="text-lg">Next.js</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" className="w-6 h-6 bg-white rounded p-0.5" alt="Express.js" />
            <span className="text-lg">Express.js</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactrouter/reactrouter-original.svg" className="w-6 h-6" alt="React Router" />
            <span className="text-lg">React Router</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodemon/nodemon-original.svg" className="w-6 h-6" alt="Nodemon" />
            <span className="text-lg">Nodemon</span>
          </div>
        </div>
      </div>

      {/* DATABASE */}
      <div className="flex md:flex-row flex-col gap-8 items-start" id="database">
        <div className="w-full md:w-1/5 text-gray-400 text-lg font-bold sticky top-18">
          <div 
            className="category-label cursor-pointer hover:text-white transition"
            onClick={() => scrollToSection('database')}
          >
            DATABASE
          </div>
        </div>
        <div className="w-full md:w-4/5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 reveal-section">
          <div className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg" className="w-6 h-6" alt="Mongoose" />
            <span className="text-lg">Mongoose</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" className="w-6 h-6" alt="MongoDB" />
            <span className="text-lg">MongoDB</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" className="w-6 h-6" alt="Oracle" />
            <span className="text-lg">Oracle</span>
          </div>
        </div>
      </div>

      {/* TOOLS */}
      <div className="flex md:flex-row flex-col gap-8 items-start" id="tools">
        <div className="w-full md:w-1/5 text-gray-400 text-lg font-bold sticky top-18">
          <div 
            className="category-label cursor-pointer hover:text-white transition"
            onClick={() => scrollToSection('tools')}
          >
            TOOLS
          </div>
        </div>
        <div className="w-full md:w-4/5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 reveal-section">
          <div className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" className="w-6 h-6" alt="Git" />
            <span className="text-lg">Git</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" className="w-6 h-6" alt="Docker" />
            <span className="text-lg">Docker</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="./assets/github-logo.png" className="w-6 h-6" alt="GitHub" />
            <span className="text-lg">GitHub</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" className="w-6 h-6" alt="Google Cloud" />
            <span className="text-lg">Google Cloud</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" className="w-6 h-6" alt="AWS" />
            <span className="text-lg">AWS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechSkills;