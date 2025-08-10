# Website Dev Notes

## Framework and Libraries

- Framework: Next.js (App Router)
- Libraries: React, TailwindCSS

### Installation

See Next.js [docs](https://nextjs.org/docs/app/getting-started/installation).

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

- **Client**-side rendering (CSR)
  - Front-end
  - e.g. Event listeners, states, use effects, APIs
  - Files outside `app/` or starting with _client directives_: `'use client';`
- **Server**-side rendering (SSR)
  - Back-end
  - e.g. Data fetching, static components like side bar

### Useful shortcuts

- React Arrow Function Component Export: `rafce`
- `rfc`: export default function
- `rafcp`: export default function with props

### Next.js redirect

- `redirect`: Server-side redirect, e.g.:
  - login redirect if no error
  - external URLs
- `useRouter` hook: Client
  - event handlers
  - recommended to use `<link>`

### useEffect

- Example usage in typewriter: [typewiter.md](./typewriter.md)