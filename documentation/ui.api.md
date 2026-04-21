# UI Components API

1. [Button](#button)

## Button
This button has 2 variants, 3 sizes. It can handle loading and disable states, you need just to give it as a boolean props. It accept left and right icons (svg!) and handle styles itself. Also it extends default button props.

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