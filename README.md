# Documents of Kai's Implementations

## Table

- [Installation and Quick Start](#installation-and-quick-start)

- [Implement Concept](#implement-concept)

  - [Configurable UI Constants](#configurable-ui-constants)

  - [State Management](#state-management)

  - [React Hooks](#react-hooks)

- [DOM Hierarchy proposal](#dom-hierarchy-proposal)

  - [Scroll Container](#scroll-container)

  - [Playhead Visibility](#playhead-visibility)

- [Git Logs](#git-logs)

## Installation and Quick Start

1. Use node v18, or if [.nvmrc](https://github.com/nvm-sh/nvm?tab=readme-ov-file#nvmrc) is installed, directly open the terminal.

1. Install yarn classic by `npm install --global yarn`

1. Run `yarn` to install packages.

1. Run `yarn run start` and open http://localhost:3000 to view the demo.

1. In `src/Timeline/constants.ts` there're some constants that can be easily modified. Try modify them and see the UI changes.

1. Run `yarn run test` to run the jest test.

## Implement Concept

### Configurable UI Constants

- In `src/Timeline/constants.ts`, multiple constants are built for easy modification and extensibility. Documents are inside the codebase.

  In `src/Timeline/utils.ts`, functions are built for bridging the above constants to components.

- For example, if PM wishes, we can quickly change the max duration of the timeline, or base time unit of each operation (currently 10ms).

- Or, we can add feature that can scale the ruler and keyframe by dynamic updating `screenPixelRatio`.

### State Management

- Did not choose to create multiple `useState` in the root component. Since it creates props drilling and cause unnecessary re-renders.

  Therefore, need to choose a global state management solution.

- Did not choose to import **React Redux** libraries. Since such a complete functionalities is not suitable this tiny project.

- Did not choose to use **React Context**. Since it require writing boilerplate codes, or building wheels by my own.

- **Zustand** is chosen. The concept is building simple `get, set` on a global store. It does not rely on React Context, nor is a Flux pattern. And it only triggers re-renders on the selected state changed.

### React Hooks

- Two React hooks I built before are imported: `useDraggable, useScalable`.

  They can hide the implements of something like `mousedown, mouseup, ResizeObserver` and expose only the APIs for business logics.

  Documents are inside the codebase.

- `useTimelineStore` owns the zustand things.

- `useGlobalScroll` synchronizes components' `scrollLeft` and `scrollTop` into zustand store.

## DOM Hierarchy proposal

If I can build the project from zero, some DOM hierarchy changes might be proposed.

I didn't change the current hierarchy, because it might break the behavior of automated assessment mentioned in this document.

### Scroll Container

We can put `Ruler, KeyframeList, Playhead` into a same ancestor, so that we can reduce codes for syncing horizontal scrolling. Just let the browser do for us.

### Playhead Visibility

We can put `Playhead` under `Ruler`, so that we can reduce code for calculating `hidden`. Just let the css do for us.

## Git Logs

- Most of commits are done within 30 minutes, it's because I used to rearrange every commits before pushing and submitting PR.

- Personally I have above commit prefix, but it depends on team convention and team rules.

  - `impl`: Implement features. Implement non-features functions. Implement testing.

  - `fix`: Fix bugs

  - `refator`: Improve the readiblity, maintainbility or extensibility. Behaviors should not be changed.

  - `chore`: Things that is not so important.

  - `doc`: Updating documents.

  - `debug, tmp`: Add some things for debug. Normally it should not be pushed, but I made mistake this time and I don't want to force push the `main` branch to fix it.

## TODO

- write test

- revert bg color debug

# Phase Timeline Challenge

# Phase Timeline Challenge

## Overview

Implement interactive features for a Timeline component. We will provide a basic Timeline component scaffold, and your task is to implement the functionality that meets the user behavior requirements outlined below.

![component-overview](./readme-assets/component-overview.jpg)

## Glossary

- **Timeline**: The main component that visually represents the duration of a sequence of events or changes over time.
- **Playhead**: The visual indicator that shows the current time position on the Timeline.
- **Current Time**: The specific time point indicated by the Playhead's position.
- **Duration**: The total length of time represented by the Timeline.
- **Ruler**: The component showing time measurements and increments along the Timeline.
- **Track**: A horizontal lane on the Timeline that can contain multiple Keyframes, often used to group related events or changes.
- **Track List**: The component that displays and manages multiple Tracks.
- **Keyframe**: A marked point on the Timeline representing a significant event, change, or state.
- **Keyframe List**: The component that shows the Keyframes across all Tracks, synchronized with the Ruler.
- **Segment**: The visual representation of the Timeline's duration in the Keyframe List.

## User Behavior Requirements

### 1. Number Input Field

#### Interface

| Prop       | Type               | Description                                      |
| ---------- | ------------------ | ------------------------------------------------ |
| `value`    | `number`           | The current value of the input field             |
| `onChange` | `(number) => void` | The callback to be called when the value changes |

#### Behavior

https://github.com/user-attachments/assets/8dd5ef2b-6b57-43dc-91b3-0d322d148781

- [x] The displayed value updates immediately while typing, but `onChange` is not triggered until input is confirmed
- [x] Clicking outside the input field removes focus and changes the value
- [x] Clicking on the native step buttons immediately changes the value
- [x] Pressing up arrow or down arrow keys immediately changes the value
- [x] Entire text is selected when the input field gains focus
- [x] Entire text is selected after using the native step buttons
- [x] Entire text is selected after using the up arrow or down arrow keys
- [x] Pressing Enter confirms the new value and removes focus
- [x] Pressing Escape reverts to the original value and removes focus
- [x] Leading zeros are automatically removed
- [x] Negative values are automatically adjusted to the minimum allowed value
- [x] Decimal values are automatically rounded to the nearest integer
- [x] Invalid inputs (non-numeric) revert to the previous valid value

### 2. Play Controls Behavior

https://github.com/user-attachments/assets/9a669854-e0c5-4950-8364-10fe0b40d16b

- [x] Current Time is always between `0ms` and the Duration
- [x] Current Time adjusts if it exceeds the newly set Duration
- [x] Duration is always between `100ms` and `6000ms`
- [x] Current Time and Duration are always multiples of `10ms`
- [x] Current Time and Duration are always positive integers
- [x] Playhead position updates only after specific actions on Current Time input (losing focus, pressing Enter, using arrow keys, or clicking up/down buttons)

### 3. Ruler Behavior

https://github.com/user-attachments/assets/42190ade-f708-45a1-8168-2be779c66390

- [x] Clicking or dragging on the Ruler updates the Current Time and Playhead position
- [x] Horizontal scrolling of the Ruler is synchronized with the Keyframe List
- [x] Ruler length visually represents the total Duration (`1ms = 1px`)
- [x] Ruler length updates only after specific actions on Duration input (losing focus, pressing Enter, using arrow keys, or clicking up/down buttons)

### 4. Track List Behavior

https://github.com/user-attachments/assets/94b5e2c8-ef32-488e-97e4-d53036bbf2f7

- [x] Vertical scrolling of the Track List is synchronized with the Keyframe List

### 5. Keyframe List Behavior

https://github.com/user-attachments/assets/99826161-f821-4e4d-b9a8-b59c16d9894e

- [x] Vertical scrolling is synchronized with the Track List
- [x] Horizontal scrolling is synchronized with the Ruler
- [x] Segment length visually represents the total Duration (`1ms = 1px`)
- [x] Segment length updates only after specific actions on Duration input (losing focus, pressing Enter, using arrow keys, or clicking up/down buttons)

### 6. Playhead Behavior

https://github.com/user-attachments/assets/3940cd0d-dd9d-4331-9172-592462ad65d3

- [x] Playhead moves in sync with the Ruler and Keyframe List during horizontal scrolling
- [x] Playhead maintains its relative position during horizontal scrolling
- [x] Playhead is visible only when within the Timeline's visible area, using the `hidden` attribute when completely out of view

## Implementation Guidelines

- Implement the required behaviors in the appropriate child components of the provided Timeline
- Write comprehensive tests to ensure that the implementation meets the user behavior requirements, including edge cases
- Consider performance implications, such as minimizing unnecessary re-renders
- Pay attention to user experience and interface design
- Write clean, well-documented, and maintainable code

## Important Notes

⚠️ **Warning**: Do not change any `data-testid` attribute names in the provided components. These are used for automated assessment of your assignment. Modifying these names may result in failing the assessment criteria.

## Submission

- Share your code repository (GitHub or GitLab) containing the implemented solution
- Ensure the repository includes all necessary code, tests, and documentation
- Provide any additional setup or running instructions in the repository's README file
- Be prepared to answer follow-up questions about your implementation if requested

Good luck with the Phase Timeline Challenge!
