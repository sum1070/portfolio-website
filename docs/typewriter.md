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

## Typescript implementation

CSS implementation is simple but the cursor blinking timing is slightly off. Would rather create a Typewriter component if I have to spend time fixing the CSS.

Relevant code located in `components/Animation/Typewriter/`: `Typewriter.tsx` and `Cursor.tsx`.

## Usage

```tsx
import Typewriter from "./Typewriter";
```

By default, it will render the content inside the component (children):

```tsx
<Typewriter className="styles...">
  Some text.
</Typewriter>;
```

or pass the string as a prop:

```tsx
<Typewriter text="Some text." className="styles..."/>;
```
