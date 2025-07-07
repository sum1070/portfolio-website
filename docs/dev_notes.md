# Website Dev Notes

## Framework and Libraries

* Framework: Next.js (App Router)
* Libraries: React, TailwindCSS

### Installation

[Next.js docs](https://nextjs.org/docs/app/getting-started/installation).

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

## Development

<!-- ### File Structure -->

<!-- TODO -->

### Rendering

* Client-side rendering (CSR)
  * Files not in `app/` or starting with *client directives*: `'use client';`
  * e.g. Event listeners, states, use effects
* Server-side rendering (SSR)
  * e.g. Data fetching, static components like side bar

### Useful shortcuts

* React Arrow Function Component Export: `rafce`
