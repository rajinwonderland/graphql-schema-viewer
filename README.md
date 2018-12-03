# GraphQL Schema Viewer

A cool typescript based React component for viewing graphql schemas. Still a WIP!

**Demo [Here](https://n4pp5npvom.codesandbox.io/) on [CodeSandbox](https://codesandbox.io/s/n4pp5npvom)!**

## Background

I was initially adding this component for [Prisma's](https://prisma.io) graphql-playground project and
found it to be quite helpful for viewing a schema.

Currently this project is a WIP. There's still a lot of boilerplate code directly copied from the graphql-playground
project that still needs some cleanup.

Feedback and suggestions are welcome!

## Getting Started

Clone the repo

```
    git clone https://github.com/rajinwonderland/graphql-schema-viewer.git
```

Install Dependencies

```
    cd graphql-schema-viewer
    # then install!
    yarn
    # or
    npm install
```

Start Hacking

```
    yarn start
```

## Roadmap

- [x] Publish on Github
- [x] Codesandbox Demo
- [ ] Publish npm module
- [ ] Setup Inputs for different graphql endpoints
- [ ] Setup demos with popular graphql endpoints
- [ ] Refactor and filter out all the graphql-playground utilities

## Built With

- [CodeSandbox](http://www.codesandbox.io) - An amazing online IDE tool
- [React](https://reactjs.org) - React is a JavaScript library for building user interfaces
- [NPM](https://npmjs.com) - Node Package Management
- [TypeScript](<[https://www.typescriptlang.org/](https://www.typescriptlang.org/)>) -TypeScript brings you optional static type-checking along with the latest ECMAScript features
- [GraphQL-Playground](<[https://github.com/prisma/graphql-playground](https://github.com/prisma/graphql-playground)>) - Initially contributed this component for Prisma's graphql-playground IDE

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Most of the utilities came directly from GraphQL Playground and their DocsExplorer component
