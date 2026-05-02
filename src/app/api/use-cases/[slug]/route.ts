import { jsonError, jsonOk } from "@/lib/http";
import { getUseCaseDetail, toPublicUseCaseDetail } from "@/lib/prompts";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const detail = getUseCaseDetail(slug);

  if (!detail) {
    return jsonError(
      {
        code: "use_case_not_found",
        message: "Choose a supported use-case path."
      },
      404
    );
  }

  return jsonOk(toPublicUseCaseDetail(detail));
}
