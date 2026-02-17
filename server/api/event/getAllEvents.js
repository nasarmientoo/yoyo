import { serverSupabase } from "~/server/utils/supabaseClient.js";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const supabase = serverSupabase(config);

  const { data, error } = await supabase
    .from("Events")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    return {
      success: false,
      data: [],
      error: error.message,
    };
  }

  return {
    success: true,
    data: data ?? [],
    error: null,
  };
});
