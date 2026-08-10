# Development notes

Last updated: August 2026

---

## Major changes from v1 to v2

- Split about section to a separate page
- More informative description
- Remove design elements that don't fit the pastel theme
- Part of dev notes moved to README or project writeup
  - Only keep the technical notes for future reference

---

### Project installation

```powershell
npx create-next-app@latest
√ What is your project named? ... koi
√ Would you like to use TypeScript? ... Yes
√ Would you like to use ESLint? ... No
√ Would you like to use Tailwind CSS? ... Yes
√ Would you like your code inside a `src/` directory? ... No
√ Would you like to use App Router? (recommended) ... Yes
√ Would you like to use Turbopack for `next dev`? ... Yes
√ Would you like to customize the import alias (`@/*` by default)? ... No
```

See Next.js [docs](https://nextjs.org/docs/app/getting-started/installation) for details.

---

## npm commands

- `npm i`: install dependencies
- `npm run dev`: start development server
- `npm run lint`: check for linting errors
- `npm run build`: build for production
  - `npm start`: start production server

### Updating npm packages

- `-g`: global
- `--save`: update package.json

#### Use `npm-check-updates` (breaking changes)

```powershell
npm i -g npm-check-updates && ncu -u && npm i
```

This include major version updates so might have breaking changes.

#### Safer approach

```powershell
npm outdated
```

```powershell
npm update --save
```

---

### Rendering

- **Client**-side rendering (CSR)
  - Front-end, runs in the browser
  - e.g. Event listeners, states, use effects, APIs
  - Files outside `app/` or those marked with the `use client` directive
- **Server**-side rendering (SSR)
  - Back-end
  - e.g. Data fetching, static components like side bar

### Useful shortcuts

- React Arrow Function Component Export: `rafce`
- `rfc`: export default function
- `rafcp`: export default function with props

### Screen size

Use `xl` for large screen

### Next.js redirect

- `redirect`: Server-side redirect, e.g.:
  - login redirect if no error
  - external URLs
- `useRouter` hook: Client
  - event handlers
  - recommended to use `<Link>`

---

<!-- ## Reflections

This is my second time working on a React/Next.js project. My first experience was a group project for school, where I mainly focused on the user authentication and didn’t have much control over the project structure or design. So building this web app from scratch was still kind of overwhelming for me at first.

### Design on Figma

I definitely spent too much time on the design... probably procrastinating on the coding part. I wasted a lot of time I could’ve spent coding or starting other projects earlier, and only learned the basics of Figma 🔪

![Design on Figma](../assets/design-figma.png)

### My Thoughts on TailwindCSS

Many people say Tailwind makes the code messy but I usually store `classNames` as string in constants and use `cn` function to merge them, so it hasn't really been a problem for me. I think it works well for simple designs that don't require lots of custom styles. However, since I am doing pastel gradient designs, I often end up using traditional CSS or inline styling. Probably TailwindCSS isn't necessary for my case.

Update on (24/08/2025): After refactoring and centralising colors in `globals.css`, I find Tailwind is still useful for organising layout in my opinion. Probably opposite to what most people think. But I doubt if it is really necessary.

#### Dark mode

My styling approach mixed with Tailwind, inline css and traditional css in `globals.css` file. Before refactoring, I has a lot of locally declared color code scattered across many files, which made maintenance difficult. By centralising all colors in `globals.css`, nearly all dark mode are handled automatically by Tailwind's `dark:` variant.

- Using global css variables in non-Tailwind css by passing `var(--color-name)`.

Besides centralising colors, the only main issue that give me a headache was the coloring in local svg. See [svg issues](#svg-issues).

### SVG issues

In my project, I use both React Icons and local SVG files for displaying icons. React Icons are great and very easy to style, but some icons are missing such as C language.

#### Handling Local SVGs and Dark Mode

My initial implementation of FetchImage returns `<Image>` component from Next.js, which works well for raster images (PNG, JPG) but it doesn't support SVG styling so I had to change it to accommodate dark mode.

By default, loading SVGs as images (using `<img>` or Next.js `<Image>`) does **not** allow CSS styling for color or dark mode, because the SVG is rendered as an external resource.

Solution: I implemented a custom [FetchImage](../koi/utils/fetch-images.tsx) component that fetches the SVG file, injects its content directly into the DOM using `dangerouslySetInnerHTML`, and applies CSS classes and inline styles.

My method works but probably not the most efficient/overcomplicated. Will make a cleaner version if I have time. (~~i.e. never~~) -->

<!-- ### Lighthouse performance

I had very poor performance on mobile for LCP (Largest Contentful Paint) at the beginning. Two main reasons:

- Opacity set to 0 led to Lighthouse error
  - fixed by setting opacity to 0.01 instead of 0
- Motion animations delay the rendering of main content
  - fixed by reducing the delay and duration of animations, especially for main text
  - (faster animations actually looks better)
- Too many elements loading at once
  - fixed by progressively loading elements -->

- [README](../README.md)
