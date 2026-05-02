import { ZodError } from "zod";
import { REGISTERED_COOKIE_NAME } from "@/lib/access";
import { completeRegistration } from "@/lib/registrations";
import { fieldErrorsFromZod, registrationSchema } from "@/lib/validation";
import { jsonError, jsonOk } from "@/lib/http";

function isGdprError(error: ZodError) {
  return error.issues.some((issue) =>
    issue.path.includes("gdprDataProcessingConfirmed")
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = registrationSchema.parse(body);
    const result = await completeRegistration(input);
    const response = jsonOk(result, result.status === "completed" ? 201 : 200);

    response.cookies.set({
      name: REGISTERED_COOKIE_NAME,
      value: "true",
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365
    });

    return response;
  } catch (error) {
    if (error instanceof ZodError) {
      const gdprError = isGdprError(error);
      return jsonError(
        {
          code: gdprError
            ? "gdpr_confirmation_required"
            : "invalid_registration",
          message: gdprError
            ? "GDPR data-processing confirmation is required."
            : "Check the highlighted registration fields and try again.",
          fieldErrors: fieldErrorsFromZod(error)
        },
        gdprError ? 422 : 400
      );
    }

    return jsonError(
      {
        code: "registration_failed",
        message: "We could not complete registration. Try again."
      },
      500
    );
  }
}
