# Bank account client

## Table of Contents

- [Technologies](#technologies) 
- [Environment variables](#environment-variables) 
- [Installation](#installation) 
- [Storybook](#storybook) 
- [Test](#test)

## Technologies

- Javascript
- React 18
- Tailwind
- Storybook
- Vite
- Vitest
- Mock service worker
- JSDoc

## Environment variables

In case you need to set the url for the backend, you must create and **.env** 
following the [**.env.example**](/fronted/.env.example) configuration.

## Installation

> ❗ You need node 18 installed before continuing.

As a first step, you need to install the dependencies with the following command:
```bash
    npm install 
```

> ❗ You need an account already registered or create one, and the backend 
> running to see all functionality, or you can see an example in 
> the [stories](#storybook)

After that, you can run the following command to see it in the browser:
```bash
    npm run dev
```

## Storybook

To see the stories, you need to run the following command:
```bash
    npm run storybook 
```

In the stories, you can see all components with their possible states, and
styles, and all pages with interaction tests to see the correct behavior.

Also, you can check if the components are accessible from the accessibility tab. 

> ❗ Sometimes the interaction tests don't work if that happen, reload the page

> ❗ To change the component theme and language, 
> you must do it from the account page

## Test

To run the tests, run the following command:
```bash
    npm run test 
```