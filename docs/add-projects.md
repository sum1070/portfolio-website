# Project system

A guide for adding a new project to the [Projects](https://sum1070.vercel.app/projects) page, and some remarks on the code structure.

## Editable folders

Only need to edit these two folders:

- `koi/data/projects/`: configs + write-ups
- `koi/public/images/projects/`: thumbnails + write-up images

## Add a new project

1. `koi/data/projects/`: create `<slug>.ts` (config) and `<slug>.md` (write-up).
2. `index.ts`: import + add to the `allProjects` array.

## `<slug>.ts` template

```ts
import { TProject } from "@/lib/types";

const myProject: TProject = {
  slug: "my-project",
  visible: true,
  title: "My Project",
  shortDescription: "One line shown on the card and project page.",
  tags: ["WebDev"],
  technologies: ["Next.js", "TypeScript"],
  images: ["/images/projects/my-project-1.webp"],
  github: "https://github.com/sum1070/my-project",
  demo: undefined,
  lastUpdate: undefined,
  writeup: { source: "file" },
};

export default myProject;
```

## Required fields

- `slug` = project identifier; `<slug>.md` must match the `slug` **field** (lowercase-kebab, unique).
- `visible` = `true` shows the project on the Projects page
- `visible`: `false` hides the project everywhere, including its URL.
- `tags`: Fields/types of the project
- `technologies`: Main tech skills used
- `images`: Preview image; `[]` if none (default pic used).
  Images **on the project page** go in the markdown instead (see below).

## Optional fields

- `github`: GitHub repo URL
- `demo`: Live demo URL
- `shortDescription`: Projects page short intro. Accept a string or a source object, e.g. `{ source: "github-description" }` to reuse the repo description.
- `lastUpdate`: manual `"YYYY-MM"`; leave undefined with a repo URL to
  auto-fill from the last push; undefined without a repo hides the label.
- `writeup`: where to get the project write-up (see below).

  ```ts
  writeup: { source: "file" }                            // <slug>.md (default)
  writeup: { source: "file", file: "<writeup>.md" }     // different local file
  writeup: { source: "github-file" }                     // repo README
  writeup: { source: "github-file", file: "docs/<writeup>.md" } // other repo file
  writeup: { source: "manual", content: "..." }          // inline string
  ```

---

## Write-up markdown

Normal markdown works: headings, lists, tables, fenced/inline code, links,
images, quotes. Images: put the file in `koi/public/images/projects/` and use

```md
![example screenshot](/images/projects/example.webp)
```

### Rich text

| Feature   | Syntax                                                                      |
| --------- | --------------------------------------------------------------------------- |
| Highlight | `==highlighted text==`                                                      |
| Colour    | `{#ff8fea:text}` or `{pink:text}`: names: `pink`, `purple`, `blue`, `phlox` |
| Spoiler   | `\|\|hidden text\|\|`                                                       |

---

## Remove a project

- Temporarily: set `visible: false`.
- Permanently: remove its import + array entry in `index.ts`, then delete
  `<slug>.ts` and `<slug>.md`.

## System files

Project system code which should **not** be edited in normal project addition:

```powershell
koi/app/projects/              # list, card, page template
koi/lib/project-content.ts     # content fetching
koi/components/ui/markdown.tsx # markdown renderer
```

## If it doesn't show up

- Not on the list page → forgot the `index.ts` import, or `visible: false`.
- Write-up empty → `.md` name doesn't match the slug.
- Page 404s → slug typo in the URL, duplicate slug, or `visible: false`.
- Broken image → file missing from `koi/public/images/projects/`.
