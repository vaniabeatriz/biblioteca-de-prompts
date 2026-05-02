import { jsonOk } from "@/lib/http";
import { listUseCases, toPublicUseCaseSummary } from "@/lib/use-cases";

export async function GET() {
  return jsonOk({
    useCases: listUseCases().map(toPublicUseCaseSummary)
  });
}
