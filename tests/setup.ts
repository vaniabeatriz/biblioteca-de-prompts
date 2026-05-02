import "@testing-library/jest-dom/vitest";

process.env.DATABASE_URL ??=
  "postgresql://prompt_library:prompt_library@localhost:5432/prompt_library_test";
