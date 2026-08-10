## Motivation

Inspired by Sharlene Yap's awesome [website](https://www.sharyap.com/). I also wanted a website built from elements that I can fully control and customize. So I built this website from scratch using React and Next.js.

This was my second time working on a React/Next.js project. My first experience was a group project in Uni, where I mainly focused on the user authentication and didn't have much control over the project structure or design. So this project was still kind of overwhelming for me at first.

## Design

![Homepage of the website](/images/projects/portfolio-website-home.webp)

The BEST part of the project. I love pastel palette so using it as the main colour scheme was decided from the start. I couldn't find many good websites that use such a colour scheme for references, but this gave me more freedom to design without being influenced by other websites. My biggest wish is to create a website that won't resemble too many other websites.

I used Figma to keep track of all my ideas and create the design. Hero section was determined first, other sections were improved or redesigned alongside the development process.

### Accessibility, dark mode, responsive design and sound effects

To make the website accessible, I used an accessible colour generator to find the right font colour and a contrast checker to keep the design accessible. I also added dark mode and sound effects for fun. Mobile first design was considered so ensuring the website looks good on all screen sizes was a priority. Most pages contain two versions of the design, one for large screen (`xl` or `2xl`) and one for smaller screen (`sm` or `md`).

### My Thoughts on TailwindCSS

Many people say Tailwind makes the code messy but I usually store `classNames` as string in constants and use `cn` function to merge them, so it hasn't really been a problem for me. I think it works well for simple designs that don't require lots of custom styles. However, since I am doing pastel gradient designs, I often end up using traditional CSS or inline styling. Probably TailwindCSS isn't necessary for my case.

Update on (24/08/2025): After refactoring and centralising colors in `globals.css`, I find Tailwind is still useful for organising layout in my opinion. Probably opposite to what most people(?) think. But I agree it is not necessary.

### SVG issues

In my project, I use both React Icons and local SVG files for displaying icons. React Icons are great and very easy to style, but some icons are missing such as C language.

#### Handling Local SVGs and Dark Mode

My initial implementation of FetchImage returns `<Image>` component from Next.js, which works well for raster images (PNG, JPG) but it doesn't support SVG styling so I had to change it to accommodate dark mode.

By default, loading SVGs as images (using `<img>` or Next.js `<Image>`) does **not** allow CSS styling for color or dark mode, because the SVG is rendered as an external resource.

Solution: I implemented a custom `FetchImage` component that fetches the SVG file, injects its content directly into the DOM using `dangerouslySetInnerHTML`, and applies CSS classes and inline styles.

My method works but probably not the most efficient/overcomplicated. Will make a cleaner version if I have time. (~~i.e. never~~)

## Yapping time

I named the website Koi (恋), which means "love" in Japanese, and it is also named after one of my favourite characters, Koito (小糸) ꒰( ˶ ᷇ 𖥦 ᷆ ˵ )꒰　♡.