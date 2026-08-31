declare module '*.woff' {
  const path: string;
  export default path;
}

declare module '*.ttf' {
  const path: string;
  export default path;
}

declare module '*.otf' {
  const path: string;
  export default path;
}

declare module '*.mjs' {
  export const components: { name: string; title: string; description: string }[];
}
