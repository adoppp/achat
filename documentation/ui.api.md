# UI Components API

1. [Button](#button)

## Button
This button has 2 variants, 3 sizes. It handles loading and disabled states. Supports left/right SVG icons. Extends native <button> props.

Button props:
```ts
variant?: 'primary' | 'secondary'; // different stylisation
size?: 's' | 'm' | 'l'; // chages padding, font and content
customClassName?: string; // can not override basic classes (yet). But it applies another props as for ex: 'max-width'

isLoading?: boolean; // activates loader, hides content and activate disabled and styles for it
isDisabled?: boolean; // activate disabled and styles for it

// just a simple svg's (ReactNode) at left or right sides of the button
leftIcon?: ReactNode; 
rightIcon?: ReactNode;
```

## Input
Controlled input component with label, error state, and icon support.
Focus: predictable behavior, minimal API, no internal validation.

Key Characteristics:
- Controlled (value + onChange)
- Accessible (label + htmlFor, aria-invalid)
- Size-driven typography and spacing
- Supports icons inside input container
- No built-in validation logic

Input props:
```ts
id?: string;

label?: string;
placeholder?: string;

value: string;
onChange: (value: string) => void;

size?: 's' | 'm' | 'l';
type?: InputHTMLAttributes<HTMLInputElement>['type'];

error?: string | null;
disabled?: boolean;

leftIcon?: ReactNode;
rightIcon?: ReactNode;

autoComplete?: InputHTMLAttributes<HTMLInputElement>['autoComplete'];

customClass?: {
  container?: string;
  label?: string;
  input?: string;
  error?: string;
};
```