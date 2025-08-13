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
  - Front-end, runs in the browser
  - e.g. Event listeners, states, use effects, APIs
  - Files outside `app/` or starting with _client directives_: `'use client';`
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
  - recommended to use `<link>`

### useEffect

- Example usage in typewriter: [typewiter.md](./typewriter.md)

## Deployment errors

I encountered deployment errors on Vercel even though `npm run build` worked locally.

![Deployment Errors](./../assets/deploy-error-resolve.png)

(And i ignored the error and kept pushing other changes lmao)
![Deployment Errors](./../assets/deploy-errors.png)

**Cause**: Git cache didn't track changes to the case of file names, so parts of the remote repos were outdated.

**Solution**: Based on [this post](https://stackoverflow.com/questions/62378045/how-to-fix-next-js-vercel-deployment-module-not-found-error), I fixed it by running:

```powershell
git rm -r --cached .
git add --all .
git commit -a -m "Versioning untracked files"
git push origin master
```

