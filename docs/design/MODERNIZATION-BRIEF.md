# Task: Redesign and Improve the Pixbooth UI/UX

You are a senior frontend engineer, UI/UX designer, and product engineer.

I want you to redesign and improve my existing **Pixbooth** web application to make it feel like a polished, modern, minimal, and professional browser-based photo booth.

**IMPORTANT: Implement the changes directly in my existing codebase. Do not just provide recommendations, mockups, or pseudocode.**

The current application has three main steps:

1. Choose Template
2. Capture Photos
3. Edit & Download

The application already has working functionality, including photo templates, webcam capture, face-tracking stickers, photo settings, customizable frames, backgrounds, filters, and downloads.

Your goal is to significantly improve the user experience and visual design **without breaking or removing existing functionality**.

---

## 1. First: Analyze the Existing Codebase

Before modifying anything:

- Inspect the current project structure.
- Identify the frontend framework, styling system, components, routes, and state management.
- Understand how templates, webcam capture, face tracking, photo editing, and downloading work.
- Identify reusable components.
- Check how selected layouts and captured photos persist between steps.
- Identify existing responsive behavior and UI issues.

Reuse the existing technologies and architecture whenever practical.

Do not rewrite the entire application unnecessarily.

Preserve the existing functionality and asset library.

## 2. Overall Design Direction

Create a modern, minimalist, monochrome photo-booth experience.

The design should feel:

- Clean and intentional
- Playful but professional
- Modern and polished
- Visually balanced
- Easy for first-time users
- Responsive across desktop, tablet, and mobile
- Focused on the photo-taking experience

### Color palette

- Primary black: `#111111`
- White: `#FFFFFF`
- Background: `#FAFAFA`
- Secondary surface: `#F5F5F5`
- Borders: `#E5E5E5`
- Secondary text: `#737373`

Avoid unnecessary gradients, excessive shadows, and colorful decorations.

### Design rules

- Use consistent spacing based on an 8px system.
- Use subtle rounded corners (8–12px).
- Maintain consistent button heights and input styles.
- Improve typography hierarchy.
- Use generous whitespace.
- Use consistent icons from the project's existing icon library.
- Make interactive elements clearly distinguishable.
- Use subtle hover, focus, selection, and transition effects.
- Maintain accessible color contrast.
- Make primary actions easy to identify.

Do not create an overly complicated dashboard-style interface.

**Core design principle: One primary decision per screen.**

---

## 3. Redesign Step 1: Choose Template

### Current problems

The template selection screen displays many small cards, a large filter area, and a separate preview sidebar.

The result feels crowded and makes it harder to browse layouts.

### Required improvements

Create a visual-first template selection experience.

Suggested layout:

```text
┌─────────────────────────────────────────────────────────────┐
│ 📸 PIXBOOTH                               Home             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ① Choose Layout ━━━━━ ② Capture ───── ③ Customize       │
│                                                             │
│   Pick your photo layout.                                  │
│   Choose how you want to capture your memories.             │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │ 🔍 Search layouts...                                │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   [ All ] [ Strips ] [ Grids ] [ Singles ] [ Polaroids ]    │
│                                                             │
│   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│   │              │ │              │ │              │        │
│   │    ┌────┐    │ │    ┌──┐      │ │    ┌──┐  ✓   │        │
│   │    │    │    │ │    ├──┤      │ │    ├──┤      │        │
│   │    └────┘    │ │    └──┘      │ │    ├──┤      │        │
│   │              │ │              │ │    └──┘      │        │
│   │   Single     │ │  Duo Strip   │ │ Classic Strip│        │
│   │   1 photo    │ │  2 photos    │ │  4 photos    │        │
│   └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                             │
│   Additional layouts shown in a responsive grid...         │
│                                                             │
│   Selected: Classic Strip                                   │
│   ┌─────────────────────────────────────────────────────┐   │
│   │           Continue to Camera →                      │   │
│   └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Functional requirements

1. Retain all 21 existing layouts or however many are available in the codebase.
2. Display larger, accurate previews of layouts.
3. Group layouts into meaningful categories.
4. Retain functional search and filtering.
5. Clearly indicate the selected template using a stronger border and checkmark.
6. Display each template's name and required photo count.
7. Reduce redundant information.
8. Remove or simplify the large preview sidebar when the cards provide sufficient previews.
9. Make the Continue button visually prominent.
10. Ensure the selection persists throughout capturing, editing, and downloading.

On mobile, use a two-column or single-column layout depending on screen width.

---

## 4. Redesign Step 2: Capture Photos

### Current problems

- The camera competes visually with the stickers panel.
- The captured-photos panel takes up too much space.
- The camera shutter action is not prominent enough.
- Important settings are spread around the screen.

### New design

Make the camera the hero of the page.

```text
┌─────────────────────────────────────────────────────────────┐
│ 📸 PIXBOOTH                                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ① Choose Layout ━━━━━ ② Capture ━━━━━ ③ Customize         │
│                                                             │
│  Strike a pose!                                             │
│  Photo 2 of 4 · Classic Strip                               │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │                                                 │  │  │
│  │  │                                                 │  │  │
│  │  │              LIVE CAMERA PREVIEW                │  │  │
│  │  │                                                 │  │  │
│  │  │                                                 │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  │       [ Stickers ]      ◎      [ Timer ]             │  │
│  │                       SHUTTER                         │  │
│  │                                                       │  │
│  │         [ ✓ 1 ] [ 2 ] [ 3 ] [ 4 ]                    │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│             [ Continue to Customize → ]                     │
└─────────────────────────────────────────────────────────────┘
```

### Required improvements

**Camera preview**
- Make the camera preview the central focus.
- Maintain the correct camera aspect ratio.
- Avoid stretching, squishing, or cropping unexpectedly.
- Clearly communicate camera status.
- Handle permission denied, unavailable camera, and loading states gracefully.
- Ensure turning the camera on and off works properly.

**Capture controls**
- Introduce a prominent circular shutter button.
- Provide clear feedback when a photo is captured.
- Show the current photo number and total photos required.
- Support the existing timer/countdown behavior.
- Prevent duplicate or accidental captures during countdown and processing.

**Captured photos**
- Replace the oversized sidebar with a compact horizontal thumbnail strip.
- Allow users to review and retake individual photos.
- Keep photo order consistent with the selected layout.
- Allow continuing only when the required number of photos is captured.

**Stickers**
- Preserve ALL existing face stickers and face tracking.
- Move stickers into a collapsible sidebar, popover, or bottom sheet.
- Preserve sticker searching, categories, selection, and clearing.
- Do not interrupt the camera when opening sticker controls.
- Ensure tracking overlays align with the actual captured output.

**Settings**
- Consolidate secondary controls into an accessible settings panel.
- Preserve existing countdown, capture, and camera options.
- Do not remove existing features for the sake of visual simplicity.

On mobile, prioritize the camera and place secondary tools in accessible drawers.

---

## 5. Redesign Step 3: Edit & Download

### Current problems

- The customization sidebar contains too many controls at once.
- Long scrolling areas make frames difficult to browse.
- The editing experience feels more like a settings panel than a creative tool.
- The final photo preview should receive greater visual emphasis.

### New design

Create a simple photo-editing workspace.

```text
┌─────────────────────────────────────────────────────────────┐
│ 📸 PIXBOOTH                                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ① Choose Layout ━━━━━ ② Capture ━━━━━ ③ Customize         │
│                                                             │
│  Make it yours.                                             │
│  Give your photos the perfect finishing touch.              │
│                                                             │
│  ┌──────────────────────────────┬────────────────────────┐  │
│  │                              │                        │  │
│  │                              │  CUSTOMIZE             │  │
│  │        PHOTO PREVIEW         │                        │  │
│  │                              │ [Frames] [Filters]     │  │
│  │       ┌────────────┐         │ [Colors] [Text]        │  │
│  │       │  PHOTO 1   │         │                        │  │
│  │       ├────────────┤         │ Choose a frame         │  │
│  │       │  PHOTO 2   │         │                        │  │
│  │       ├────────────┤         │ [Original] [Film]      │  │
│  │       │  PHOTO 3   │         │ [Vintage]  [Dreamy]    │  │
│  │       ├────────────┤         │                        │  │
│  │       │  PHOTO 4   │         │                        │  │
│  │       └────────────┘         │                        │  │
│  │                              │                        │  │
│  │      [Undo]     [Redo]       │                        │  │
│  │                              │ ┌────────────────────┐ │  │
│  │                              │ │ Download Photo     │ │  │
│  │                              │ └────────────────────┘ │  │
│  └──────────────────────────────┴────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Required improvements

**Preview**
- Make the finished photo the main visual focus.
- Maintain accurate layout proportions.
- Fit previews within the available area without distortion.
- Update the preview immediately when the user changes an edit.

**Editing controls**
Organize tools into clear categories:

- Frames
- Backgrounds / Colors
- Filters
- Text / Decorations, if already supported
- Any additional existing editing features

Use compact tabs or segmented controls.

Do not expose every customization option simultaneously.

**Frames**
- Retain all existing frame designs.
- Use accurate thumbnails.
- Show frame names clearly.
- Use a visible selected state.

**Filters and colors**
- Keep existing filter and background functionality.
- Ensure controls produce immediate visual updates.
- Ensure exported photos match the preview.

**Undo / Redo**
- Add undo and redo for reversible editing actions where practical.
- Preserve the current editing state when navigating between tool categories.

**Download**
- Make the Download button the most prominent action.
- Preserve the existing export format and image quality.
- Show the format and image dimensions when available.
- Provide clear success or error feedback.
- Ensure downloaded images match the edited preview.

**Start over**
- Make Start Over a secondary action.
- Add a confirmation dialog before discarding photos and edits.

On mobile, position the photo preview above the editing controls, with the primary download action easily accessible.

---

## 6. Improve Navigation and State Management

Implement a consistent three-step progress indicator.

Example:

`① Choose Layout → ② Capture → ③ Customize`

Requirements:

- Clearly highlight the current step.
- Show completed steps where appropriate.
- Support navigating backward without unnecessarily losing progress.
- Preserve the selected template.
- Preserve captured photos when returning to earlier steps unless the user explicitly resets or makes an incompatible change.
- Preserve applied edits where appropriate.
- Prevent invalid transitions.
- Ensure the app accurately reflects the selected layout at every step.

Fix any bugs where one screen displays a different layout or photo count from the user's selection.

---

## 7. Responsive Design

Optimize for:

- Desktop: 1440px and wider
- Laptop: 1024px
- Tablet: 768px
- Mobile: 375–430px

Requirements:

- No horizontal overflow.
- No clipped buttons or content.
- Avoid nested scrolling panels when possible.
- Use responsive template grids.
- Keep the camera usable on smaller screens.
- Use accessible drawers or sheets for secondary controls on mobile.
- Provide large enough touch targets.
- Avoid covering important previews with sticky elements.
- Maintain clear navigation and primary actions.

---

## 8. Improve Microinteractions and UX Feedback

Add subtle, functional interactions where appropriate:

- Hover effects on template cards
- Smooth selected-state transitions
- Shutter feedback when taking photos
- Camera countdown feedback
- Clear loading indicators
- Disabled button states
- Helpful empty states
- Friendly error messages
- Confirmation when resetting the session
- Download success or error feedback
- Keyboard focus indicators
- Accessible labels for icon-only buttons

Keep motion subtle, approximately 150–250ms where appropriate.

Respect `prefers-reduced-motion`.

Avoid unnecessary animations that reduce performance.

---

## 9. Accessibility

Follow WCAG 2.2 AA best practices where feasible.

- Use semantic HTML.
- Provide proper labels for form controls.
- Ensure buttons are keyboard-accessible.
- Provide visible keyboard focus styles.
- Make selection states perceivable without relying only on color.
- Use appropriate contrast.
- Provide clear error messages.
- Ensure dialogs and mobile drawers manage keyboard focus.
- Announce important camera and capture status changes accessibly.
- Avoid unnecessary autofocus or disruptive UI changes.

---

## 10. Code Quality Requirements

- Reuse existing components and design patterns where possible.
- Refactor large components when it improves maintainability.
- Avoid unnecessary dependencies.
- Avoid duplicated styling.
- Use consistent design tokens.
- Preserve existing functionality.
- Maintain type safety if TypeScript is used.
- Avoid introducing memory leaks in camera streams, timers, and face-tracking loops.
- Clean up resources appropriately when components unmount.
- Avoid unnecessary rerenders of the camera preview.
- Ensure editing and export performance remain acceptable.

Do not replace functioning image-processing or face-tracking logic unless necessary to fix a demonstrated problem.

---

## 11. Testing and Verification

After implementation:

1. Run the available linting and type-checking commands.
2. Run the project build.
3. Run existing tests.
4. Add focused tests for important changes where the test infrastructure supports them.
5. Check template selection and filtering.
6. Verify selected-layout persistence between steps.
7. Verify camera startup, shutdown, countdown, capture, and retake behavior.
8. Verify face stickers and tracking remain functional.
9. Verify editing controls and live preview updates.
10. Verify downloads reflect the chosen layout and applied edits.
11. Verify backward navigation and reset behavior.
12. Check responsive layouts at desktop, tablet, and mobile widths.

If browser-based testing is available, use it to inspect the actual rendered UI.

If a feature requires a real camera or browser permission and cannot be tested automatically, explicitly report that limitation rather than claiming it was verified.

---

## 12. Implementation Instructions

Proceed in this order:

**Phase 1: Codebase inspection**
- Understand existing components, functionality, styles, and state.
- Identify integration risks.

**Phase 2: Shared UI foundation**
- Establish consistent design tokens.
- Improve common navigation, buttons, cards, and responsive layout primitives.

**Phase 3: Template screen**
- Implement the visual-first layout browser.
- Preserve template selection and filtering.

**Phase 4: Capture screen**
- Prioritize the camera.
- Improve shutter controls, thumbnails, and secondary tools.
- Preserve face tracking and camera behavior.

**Phase 5: Editor screen**
- Implement the clearer editing workspace.
- Group editing controls.
- Preserve frame, background, filter, and export capabilities.

**Phase 6: Polish**
- Add microinteractions, accessibility improvements, and responsive refinements.

**Phase 7: Validation**
- Run available checks.
- Fix regressions.
- Review the final result.

### Important constraints

- Do not create an entirely new application.
- Do not remove working features.
- Do not replace the logo or unnecessarily change the Pixbooth brand.
- Do not change backend APIs or data formats unless absolutely necessary.
- Do not introduce mock data into production flows.
- Do not simplify the camera or editing logic at the expense of existing capabilities.
- Do not stop after generating a design proposal.
- Implement the actual redesign.
- Prioritize correctness and usability over decorative effects.

## Expected deliverables

When complete, provide:

1. A concise summary of the UI/UX improvements implemented.
2. The main files and components modified.
3. Any bugs discovered and fixed.
4. Verification results, including tests and build status.
5. Any known limitations or features requiring manual testing.

## Final Goal

Transform Pixbooth from a functional but visually dense photo-booth application into a **clean, intuitive, modern photo-taking experience**.

The user journey should feel effortless:

**Pick → Pose → Customize → Keep**

Keep Pixbooth's original monochrome personality while delivering a significantly better interface, responsive experience, and overall usability.

**Begin by inspecting the repository, then implement the improvements directly.**