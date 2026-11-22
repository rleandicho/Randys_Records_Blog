// Contact details for the "Contact me" page.
// Fill in what you want to share. Anything left empty is hidden.
export const contact = {
  intro:
    "Want to talk about a project, a post, or something you're building? Drop me a line. I read everything, even if it takes me a bit to reply.",
  links: [
    { label: 'Email', value: '', href: (v) => `mailto:${v}` },
    { label: 'GitHub', value: 'rleandicho', href: (v) => `https://github.com/${v}` },
    { label: 'LinkedIn', value: '', href: (v) => `https://www.linkedin.com/in/${v}` },
    { label: 'Discord', value: '', href: null },
  ],
};
