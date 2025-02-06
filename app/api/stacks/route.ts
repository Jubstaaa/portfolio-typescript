import { StackService } from "@/lib/services/stack.service";
import { ApiResponse } from "@/lib/api-response";
import { createHandler } from "@/lib/api-handler";
import { Stack } from "@/types/Stack";

const stackService = new StackService();

export const GET = createHandler(async () => {
  const stacks = await stackService.findMany({
    orderBy: { name: "asc" },
  });
  return ApiResponse.success(stacks);
});

export const POST = createHandler(async (req) => {
  try {
    const data = await req.json();
    const stack = await stackService.create(data);
    return ApiResponse.success<Stack>(stack, 201);
  } catch (error) {
    console.error("Stack Creation Error:", error);
    return ApiResponse.error("Failed to create stack");
  }
});
