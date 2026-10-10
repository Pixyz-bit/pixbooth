# Landing artwork

The landing page uses the project-local `public/landing-contact-sheet.webp`, generated with the built-in Image Generation tool. It is an illustrative sample of fictional adults, not a customer testimonial or a real captured session. The page labels it “Illustrative sample captures.” The original generated PNG is retained outside the project; the shipped WebP is an optimized format conversion without compositional changes.

## Generation prompt

Generate a photographic asset for a monochrome browser photo booth landing page. A precise 2 by 2 contact sheet, four equal rectangular photographic frames, absolutely no gaps, no borders, no typography, no text, no numbers, no watermark. Each frame is a different candid photo of the same two fictional Filipino young adults age 22-26, a woman with short wavy dark hair and a man with medium tousled dark hair, casual plain black and white clothing, standing close together in an indoor photo booth against a clean white seamless background. Upper left both laughing naturally looking at camera, upper right woman playful wink man leaning toward camera, lower left both making playful hand peace signs, lower right laughing looking at each other. Framing chest upwards and generous headroom so faces stay inside each frame. Authentic photorealistic camera flash photography, detailed natural skin, bright clean whites, rich blacks, strictly grayscale black and white, joyful editorial photo booth keepsakes, no illustration, no UI mockup. Whole asset square, perfectly aligned 2x2 tiles.

## Implementation

`src/Landing.jsx` and `src/styles.css` display the four contact-sheet quadrants in photo-print frames using CSS background positioning. The layout, captions, navigation and controls remain real HTML and React components. The supplied Pixbooth logo remains unchanged. The artwork does not request camera access or become part of a user's captured media.
