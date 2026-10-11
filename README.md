# Student Upload

A simple, single-page student registration app built with plain HTML, CSS, and JavaScript. Add, view, and manage students in a beautiful, responsive interface with light and dark theme support.

## Features

- **Add Students**: Collect full name, matric number, level, and department with real-time validation
- **Matric Validation**: Format check (23/024145123) and duplicate detection
- **Student Cards**: Display each student in a responsive grid with initials badge and metadata
- **Newest Highlight**: The most recently added card is highlighted in mint green
- **Remove Last**: Delete the most recent student with one click (disabled when list is empty)
- **Show Names**: Toggle a panel to view all student names as pill-shaped chips
- **Sample Data**: Add 3 pre-filled sample students with one click
- **Empty State**: Helpful message when no students are added yet
- **Responsive Design**: Two-column layout on desktop, stacks on mobile (below 780px)
- **Dark Mode**: Automatic light/dark theme based on system preference
- **Accessible**: Semantic HTML, ARIA live regions, visible focus states, and reduced-motion support

## How to Run

1. Open `index.html` in a web browser
2. No build step or dependencies required
3. Works offline and in any modern browser

## File Structure

```
student-upload-wisteria/
├── index.html      # HTML form and register layout
├── style.css       # Light/dark theme styles
├── script.js       # Form validation and student management
└── README.md       # This file
```

## Matric Number Format

Students must enter matric numbers in the format `23/024145123`:
- Two digits
- A forward slash
- Nine digits

Example: `23/024145123`

## Design & Colors

The app uses a palette of light purple, green, and white:

**Light Theme:**
- Background: `#f3f0fb` (pale wisteria)
- Panels: `#ffffff` (white)
- Primary: `#6a47c2` (purple) for titles and buttons
- Accent: `#1a7a53` (green) for Remove and success states
- Newest card: `#ddf3e7` (mint) background with green border

**Dark Theme:**
- Background: `#15122a` (dark navy)
- Panels: `#201c38` (dark purple)
- Primary: `#b8a3f5` (lighter purple)
- Accent: `#7fd6a8` (lighter green)

The app uses **Nunito** (400, 600, 700, 800 weights) from Google Fonts, with system sans-serif fallback for fast loading and broad compatibility.

All colors adapt automatically based on the user's OS theme preference via `prefers-color-scheme`.
