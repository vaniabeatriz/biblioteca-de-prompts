import { isSupportedUseCasePath } from "@/lib/routing";

export const REGISTERED_COOKIE_NAME = "prompt_library_registered";

type CookieStore = {
  get(name: string): { value: string } | undefined;
};

export function hasPromptLibraryAccess(cookieStore: CookieStore) {
  return cookieStore.get(REGISTERED_COOKIE_NAME)?.value === "true";
}

export function registerPathForUseCase(useCasePath: string, email?: string) {
  const params = new URLSearchParams();

  if (email) {
    params.set("email", email.trim().toLowerCase());
  }

  if (isSupportedUseCasePath(useCasePath)) {
    params.set("next", useCasePath);
  }

  const query = params.toString();
  return query ? `/register?${query}` : "/register";
}
