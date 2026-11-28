import shared from '@sirloinbh/prettier-config' with { type: 'json' };

// The apps format with prettier-plugin-tailwindcss (templates/app/prettier.config.mjs.tmpl in project-standards), and the
// kit is delivered into them, so it is formatted the same way here: otherwise the app's `prettier --check` fails on the
// delivered files (v1.0.0, workout-memo#523). The stylesheet only supplies the theme the class order is read from.
// tailwindPreserveWhitespace keeps the spaces around classes in template strings (#246 in project-standards).
export default {
  ...shared,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './showcase/theme.css',
  tailwindPreserveWhitespace: true,
};
