# Typewriter

## CSS implementation

Original thoughts: implement the typing effect purely with CSS animations in `components/Hero/Hero.module.css`:

```css
.typewriterText {
  display: inline-block;
}

.typewriterContainer {
  padding-top: 1rem;
  font-size: 3.75rem;
  font-weight: 600;
  color: var(--color-nice-purple0);
  white-space: nowrap;
  border-right: 5px solid var(--color-nice-purple0);
  width: 100%;
  overflow: hidden;
  animation: typing 2s steps(12), cursor 0.4s step-end infinite alternate;
}

@keyframes cursor {
  50% {
    border-color: transparent;
  }
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
```

And use it in `Hero.tsx`:

```tsx
import styles from "./Hero.module.css";
```

```tsx
<div className={styles.typewriterContainer}>
  <p className={styles.typewriterText}>Some text.</p>
</div>
```

### CSS Issues

The CSS implementation is simple and kinda works, but the cursor blinking timing is slightly off. Would rather create a Typewriter component which allows more flexibility if I have to spend time fixing the CSS.

## Typescript implementation

## Usage

```tsx
// components/Hero/Hero.tsx
import { Typewriter } from "../Animation/Typewriter/Typewriter";

// Default usage: render the children
<Typewriter className="styles...">Some text. i.e. the children</Typewriter>;

// Can also pass the string as a prop:
<Typewriter text="Some text." className="styles..." />;
```

## How it works

### `useEffect`

This hook is triggered whenever `currentIndex, textToType, speed` changes. A checking is performed to stop the effect if the full string is already typed out.

It contains:

- a timer (`setTimeout`) that updates the state to append the next character for display and increments the `currentIndex`.
- a cleanup function `clearTimeout` to reset the timer to avoid overlapping timeouts.
