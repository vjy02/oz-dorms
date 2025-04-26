import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();

  const url = new URL(request.url);
  const company = decodeURIComponent(url.searchParams.get("company") || "");

  if (!company) {
    return NextResponse.json({ error: "Company query parameter is required" }, { status: 400 });
  }

  let query;

  const allInMatch = company.match(/^All in (\w{2,3})$/); 
  if (allInMatch) {
    const stateCode = allInMatch[1]; 
    query = supabase
      .from("locations")
      .select("*")
      .eq("state", stateCode);
  } else {
    query = supabase
      .from("locations")
      .select("*")
      .eq("company", company);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
