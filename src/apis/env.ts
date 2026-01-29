export const apiUrl = import.meta.env.VITE_API_BASE_URL;

if (!apiUrl) {
  throw new Error("Check 'VITE_API_BASE_URL' in 'env.ts'! apiUrl is missing");
}
