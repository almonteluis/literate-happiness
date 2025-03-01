# Take-home Exercise: Sortable Table

👋 Hello! Thanks so much for taking part in our interview process! We know that it takes time and effort away from other things, and we appreciate it.

We set this exercise up for a couple of reasons that we hope resonate with you:

1. We think that a 1-hour window into coding a single problem is only going to provide us with a narrow view of your skills; and we get it – the extra pressure of trying to solve some puzzle doesn't do anyone justice, either
2. We want to mimic an experience as close as possible to what you'd be doing on a day-to-day basis as a Frontend Engineer here at Gusto – reading through requirements, debating different approaches, and putting up a PR for review 🙌

This question is scoped down to what we think can be tackled in 4 hours or less, but otherwise, the requirements listed below, the designs provided alongside those, and the process are very similar to what you could expect from working at Gusto.

## Expectations and Instructions

Think of this project as a [spike](<https://en.wikipedia.org/wiki/Spike_(software_development)>) or a prototype — a small task to reduce uncertainty or demonstrate the viability of a larger task. We **don’t expect** you to submit complete and production-ready code in under 4 hours. Like a small, timeboxed problem you might take on at work, we’re looking for a reasonably complete implementation that you would be proud to bring to your team as a first pass.

What we **do expect** to see is how you prioritize within time constraints, what your PRs might look like, how you think about iterative development, and how you might bring open questions and next steps to your team. We want this to be a rough likeness of what it would be like to work together. Pretend that this is work you would put up to talk through a problem with the engineers on your team.

_Hint:_ Think about and discuss design/product requirements, performance, browser support, accessibility, code readability, and what steps you would have to take to make this production-ready.

- Timebox this to between three and four hours. Doing more work is not better. Tradeoffs related to how you spend a finite amount of time are an important part of engineering.
- Any changes should be placed in a new branch within this repository and have a corresponding pull request. You may submit as many pull requests as you need.
- Please use only the provided libraries and frameworks. While other tools could solve these problems, we want to focus on your code-writing approach without additional dependencies
- **When you're done, please email your recruiter that you have finished**

## Project

### Stack

- [TypeScript](https://www.typescriptlang.org)
- [React](https://reactjs.org)
- [Jest](https://jestjs.io)
- [Tailwind](https://tailwindcss.com/docs/installation)
- [Vite](https://vitejs.dev/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

### Available Scripts

In the project directory, you can run:

#### `npm run dev`

Runs the app in the development mode.
Open [http://localhost:5173/](http://localhost:5173/) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm run test`

Runs a small suite of [Jest](https://jestjs.io) tests.

#### `npm run lint`

Runs [ESLint](https://eslint.org/). There is also an auto-fix command if you run `npm run lint:fix`.

#### `npm run format`

Runs [Prettier](https://prettier.io/)

# Product requirements :books:

## The Problem

Often enough, Gusto users need to deal with large sets of data – in this exercise, that would be a list of the cities of the world.
We are looking to offer a delightful user experience when it comes to searching, sorting, and navigating through such datasets.

In this exercise, we'll be focusing on these elements of your implementation:

- The reusability/flexibility of the `<SortableTable>` component (or set of components) you'll be coding up
- The user interface and user experience of your app:
  - Visual design
  - Navigation
  - Performance

### Mockups

<details>
  <summary>
  Large screen mockup
  </summary>
<img src="./mock-up.png" width="800px" />
</details>

<details>
  <summary>
  Small screen mockup
  </summary>
  <img src="./mock-up-responsive.png" width="400px" />
</details>

## User-focused Requirements

_Note:_ These requirements use the "Priority Level Scale" where a P0 is the highest priority, and a P4 is the lowest. Use this as a guideline to help you prioritize your time. We **don’t expect** you to complete every task.

### Search

- [x] **P0**: As a user, I want to search for cities by city name
- [x] **P0**: As a user, I want to search for cities by country name
- [ ] **P0**: As a user, I should know when a search does not match any city
- [ ] **P0**: As a user, I should know when a search fails (**Note: if you search for 'error', we mimic an error for you :raised_hands:**)
- [ ] **P1:** [Performance] As a user, I want the search to only kick in after 150ms since my last change to the search term. Do not use utility libraries (e.g., Lodash). We want to see your work!

### Sorting

- [x] **P0**: As a user, I want to be able to toggle sorting (ascending) the search results by a single column
- [ ] **P1**: As a user, I want to be able to toggle between ascending, descending, or no sorting of the search results by a single column
- [ ] **P2**: As a user, I want to be able to toggle between ascending, descending, or no sorting of the search results by multiple columns

### Pagination

- [x] **P0**: As a user, I want to be able to paginate through search results using a fixed page size (10)
- [x] **P0**: As a user, I want to be able to navigate between result pages
- [ ] **P2**: As a user, I want to be able to paginate through search results using a dynamic page size
- [ ] **P3**: As a user, I want to be able to go all the way to the first and last pages of the search results

### Design

_For reference, you can use the screenshot in the problem statement above. We've also uploaded some icons you might want to use for your implementation – you can find these under src/assets/.._ :pray:

- [ ] **P0**: As a Gusto engineer, when I use `<SortableTable>`, its design matches the [mockups provided in the problem statement](#mockups)

## Product questions

- How many columns do we want to support?
- How can users change the column's order?
- What effort is required to hide or show columns?
