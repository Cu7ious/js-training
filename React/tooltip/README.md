# React Tooltip

Given a mobile sized view ~(193 x 400) create a react component that renders text with buttons and a tooltip component that appears when the button is hovered, and dynamically positions itself on the view.

By default, it should be shown to the right of the button, like so:
```
[ BUTTON ] |<--5px| Tooltip here
```

On cases when it intersects with the border of the screen, it should be shown from the opposite side,
e.g., if it's in the borrtom right corner of the screen, it must be shown above the button on the right side of it.
