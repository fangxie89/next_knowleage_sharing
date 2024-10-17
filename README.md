# Create a MD/MDX knowleage sharing platform to record knowledge and tips during learning front-end framework.

The side is based on the basic logic of nodejs.org

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Structure
```

├── README.md
├── navigation.json     // structure of navbar and sidebar
├── next-env.d.ts
├── next.config.mjs
├── next.constats.mjs
├── next.dynamic.mjs        // record page folder structure as the file structure
├── next.heplers.mjs        // read MDX file
├── next.json.mjs
├── next.mdx.compiler.mjs
├── next.mdx.mjs
├── package-lock.json
├── package.json
├── pages               // acticle content structure
│   ├── react
│   │   └── hooks
│   │       ├── context.md
│   │       ├── effect.md
│   │       ├── performance.md
│   │       ├── random.md
│   │       ├── react19.md
│   │       ├── ref.md
│   │       ├── stateManagement.md
│   │       └── transition.md
│   └── vue
│       └── essentials
│           └── watcher.md
├── postcss.config.mjs
├── public
│   ├── logo.png
│   ├── next.svg
│   └── vercel.svg
├── src
│   ├── app
│   │   ├── [[...path]]           
│   │   │   └── page.tsx        // handle main page
│   │   ├── globals.css
│   │   └── layout.tsx          // main layout
│   ├── components
│   │   ├── Common
│   │   │   ├── ActiveLink
│   │   │   │   └── index.tsx
│   │   │   └── ThemeToggle
│   │   │       └── index.tsx
│   │   ├── Container
│   │   │   ├── NavBar
│   │   │   │   ├── NavItem
│   │   │   │   │   ├── index.module.css
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── index.module.css
│   │   │   │   └── index.tsx
│   │   │   └── Sidebar
│   │   │       ├── SidebarGroup
│   │   │       │   ├── index.module.css
│   │   │       │   └── index.tsx
│   │   │       ├── SidebarItem
│   │   │       │   ├── index.module.css
│   │   │       │   └── index.tsx
│   │   │       ├── index.module.css
│   │   │       └── index.tsx
│   │   ├── mdxRenderer.tsx
│   │   └── withLayout.tsx          
│   ├── hooks            
│   │   └── useSiteNavigation.ts    //handle navigation logic
│   ├── layouts
│   │   ├── Base.tsx
│   │   ├── Home.tsx
│   │   ├── Page.tsx
│   │   └── layouts.module.css
│   └── providers               //context provider
│       └── themeProvider.tsx
├── tailwind.config.ts
├── tsconfig.json
└── types                   //type file
    ├── layouts.ts
    └── navigation.ts

```

# to do:

- Search
- blog
- support lang
- auth?
- notificationProvider
