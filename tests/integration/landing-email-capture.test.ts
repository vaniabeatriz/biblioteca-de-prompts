import { describe, expect, it } from "vitest";
import { leadCaptureSchema } from "@/lib/validation";
import { encodeRegisterPath } from "@/lib/routing";

describe("landing email capture flow", () => {
  it("normalizes a valid email and builds the registration path", () => {
    const parsed = leadCaptureSchema.parse({ email: " Visitor@Example.COM " });
    expect(parsed.email).toBe("visitor@example.com");
    expect(encodeRegisterPath(parsed.email)).toBe(
      "/register?email=visitor%40example.com"
    );
  });

  it("rejects blank or malformed email addresses", () => {
    expect(() => leadCaptureSchema.parse({ email: "" })).toThrow();
    expect(() => leadCaptureSchema.parse({ email: "nope" })).toThrow();
  });
});
