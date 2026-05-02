import { ZodError } from "zod";
import { createOrContinueLeadCapture } from "@/lib/lead-captures";
import { fieldErrorsFromZod, leadCaptureSchema } from "@/lib/validation";
import { jsonError, jsonOk } from "@/lib/http";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = leadCaptureSchema.parse(body);
    const result = await createOrContinueLeadCapture(input);
    return jsonOk(result, result.status === "email_captured" ? 201 : 200);
  } catch (error) {
    if (error instanceof ZodError) {
      return jsonError(
        {
          code: "invalid_lead_capture",
          message: "Enter a valid email address to continue.",
          fieldErrors: fieldErrorsFromZod(error)
        },
        400
      );
    }

    return jsonError(
      {
        code: "lead_capture_failed",
        message: "We could not save that email. Try again."
      },
      500
    );
  }
}
