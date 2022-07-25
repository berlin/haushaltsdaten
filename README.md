![](https://img.shields.io/badge/Built%20with%20%E2%9D%A4%EF%B8%8F-at%20Technologiestiftung%20Berlin-blue)

# _Berliner Haushaltsdaten - Dataviz_

![Data visualization of Berlin's expenditures](/public/images/readme.png)

This data visualization communicates Berlin's public expenditures. It describes in which fields data is spent (or earned) and which district or area is responsible for the expenditure.

The means of visualization is a so-called [treemap](https://en.wikipedia.org/wiki/Treemapping) which allows comparing different expense areas and zooming into the hierarchies of expenses.

The treemap visualization is embedabble by using the _Einbetten_ option.

In addition, a list below the visualization renders the items which belong to the currently selected expense field (ordered by amount in €).

A homepage and FAQ page provide contextual information.

> **Attention: This is a prototype, not a finished software.**

## The data

The data used is available as Open Data in Berlin's official [Open Data portal](https://daten.berlin.de/datensaetze). It is usually published bi-annually and includes the data for the next 2 years.

The data comes as Excel files (`.xlsx`), which is converted to CSV and then loaded into a PostgreSQL database.

We currently use a PostgreSQL database provided by [Supabase](https://supabase.com/). Find information for this setup in the [haushaltsdaten-supabase repo](https://github.com/berlin/haushaltsdaten-supabase).

> **A note on our usage of Supabase**: We are using Supabase because it provides a convenient data access layer. There are certainly alternatives for accessing the data which could be explored in the future.

## Tech stack

This website is a NextJS app configured with:

- [Typescript](https://www.typescriptlang.org/)
- Linting with [ESLint](https://eslint.org/)
- Formatting with [Prettier](https://prettier.io/)
- Linting, typechecking and formatting on by default using [`husky`](https://github.com/typicode/husky) for commit hooks
- Testing with [Jest](https://jestjs.io/) and [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro)

## Project structure

Basic Next.js app

### Pages

- `pages/index.tsx` is the homepage.
- `pages/visualisierung.tsx` is the main route for the visualization. It renders the most important components for the visualization.
- `pages/share.tsx` is almost identical to `pages/visualisierung.tsx`. It is used for sharing an SVG-only version of the currently rendered treemap.
- `pages/faq.tsx` provides some questions and answers.

### Components

The most important component is probably the treemap component which can be found in `src/components/TreeMap/index.tsx`. The component expects hierarchical data (`hierarchy` prop) to be passed to it (as specified in its type declaration). It then utilizes [D3](https://d3js.org/) to render a treemap SVG which can be zoomed into and out.

The treemap can be controlled with the filters defined in `src/components/TreeMapControls/index.tsx`.

### Texts

The texts are currently hard-coded into the pages/components. In the future a more beginner-friendly structure could be applied (such as extracting all text content into a single content provider file).

## Getting started

### Requirements

#### Node.js

This project is a Next.js app which requires you to have [Node.js](https://nodejs.org/en/) installed.

#### Supabase

As explained in the data section earlier, a Supabase instance is used for storing the data.

If you simply want to continue working on this repository, you can use the already existing Supabase instance.

If you are planning to re-deploy this project, you will need to obtain a Supabase instance yourself, either by using their cloud offering or by self-hosting Supabase.

### Installation

Clone the repository to your local machine:

```bash
git clone git@github.com:berlin/haushaltsdaten.git
```

Move into the repository folder:

```bash
cd haushaltsdaten
```

Make sure you use the Node.js version specified in `.nvmrc`. Find out which Node version you're currently on with:

```bash
node --version
```

If this version differs from the one specified in `.nvmrc`, please install the required version, either manually, or using a tool such as [nvm](https://github.com/nvm-sh/nvm), which allows switching to the correct version via:

```bash
nvm use
```

With the correct Node version, install the dependencies:

```bash
npm install
```

Because the data is stored in a Supabase database, you will need to provide connection details in your environment. In this repository you can find a file `.env.example`. Duplicate this file and name it `.env`.

In `.env` you must enter the connection details to the Supabase instance as suggested in `.env.example`. If you do not know how to obtain the necessary details, please ask a repository maintainer for access.

You are now ready to start a local development server on http://localhost:3000 via:

```bash
npm run dev
```

## Workflow

New features, fixes, etc. should always be developed on a separate branch:

- In your local repository, checkout the `main` branch.
- Run `git checkout -b <name-of-your-branch>` to create a new branch (ideally following [Conventional Commits guidelines](https://www.conventionalcommits.org)).
- Make your changes
- Push your changes to the remote: `git push -U origin HEAD`
- Open a pull request.

You can commit using the `npm run cm` command to ensure your commits follow our conventions.

## Deployment

_Berliner Haushaltsdaten - Dataviz_ is deployed to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/Lisa-Stubert"><img src="https://avatars.githubusercontent.com/u/61182572?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Lisa Stubert</b></sub></a><br /><a href="#projectManagement-Lisa-Stubert" title="Project Management">📆</a> <a href="#ideas-Lisa-Stubert" title="Ideas, Planning, & Feedback">🤔</a> <a href="#mentoring-Lisa-Stubert" title="Mentoring">🧑‍🏫</a> <a href="#eventOrganizing-Lisa-Stubert" title="Event Organizing">📋</a> <a href="#data-Lisa-Stubert" title="Data">🔣</a></td>
    <td align="center"><a href="https://github.com/m-b-e"><img src="https://avatars.githubusercontent.com/u/36029603?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Max B. Eckert</b></sub></a><br /><a href="#ideas-m-b-e" title="Ideas, Planning, & Feedback">🤔</a> <a href="#eventOrganizing-m-b-e" title="Event Organizing">📋</a></td>
    <td align="center"><a href="https://github.com/dnsos"><img src="https://avatars.githubusercontent.com/u/15640196?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Dennis Ostendorf</b></sub></a><br /><a href="#design-dnsos" title="Design">🎨</a> <a href="https://github.com/berlin/haushaltsdaten/commits?author=dnsos" title="Code">💻</a> <a href="https://github.com/berlin/haushaltsdaten/commits?author=dnsos" title="Documentation">📖</a></td>
    <td align="center"><a href="https://vogelino.com/"><img src="https://avatars.githubusercontent.com/u/2759340?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Lucas Vogel</b></sub></a><br /><a href="#design-vogelino" title="Design">🎨</a> <a href="https://github.com/berlin/haushaltsdaten/commits?author=vogelino" title="Code">💻</a> <a href="https://github.com/berlin/haushaltsdaten/commits?author=vogelino" title="Documentation">📖</a></td>
    <td align="center"><a href="https://fabianmoronzirfas.me/"><img src="https://avatars.githubusercontent.com/u/315106?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Fabian Morón Zirfas</b></sub></a><br /><a href="https://github.com/berlin/haushaltsdaten/commits?author=ff6347" title="Code">💻</a> <a href="https://github.com/berlin/haushaltsdaten/commits?author=ff6347" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!


## Content Licencing

Texts and content available as [CC BY](https://creativecommons.org/licenses/by/3.0/de/). 

## Credits

<table>
  <tr>
    <td>
      <a src="https://odis-berlin.de">
        <br />
        <br />
        <img width="200" src="https://logos.citylab-berlin.org/logo-odis-berlin.svg" />
      </a>
    </td>
    <td>
      Together with: <a src="https://citylab-berlin.org/en/start/">
        <br />
        <br />
        <img width="200" src="https://logos.citylab-berlin.org/logo-citylab-berlin.svg" />
      </a>
    </td>
    <td>
      A project by: <a src="https://www.technologiestiftung-berlin.de/en/">
        <br />
        <br />
        <img width="150" src="https://logos.citylab-berlin.org/logo-technologiestiftung-berlin-en.svg" />
      </a>
    </td>
    <td>
      Supported by: <a src="https://www.berlin.de/rbmskzl/en/">
        <br />
        <br />
        <img width="80" src="https://logos.citylab-berlin.org/logo-berlin-senweb-en.svg" />
      </a>
    </td>
  </tr>
</table>
