import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
    const supabase = await createClient();

    const url = new URL(request.url);
    const company = decodeURIComponent(url.searchParams.get("company") || "");

    if (!company) {
        return NextResponse.json({ error: "Company query parameter is required" }, { status: 400 });
    }
    
    const { data, error } = await supabase
        .from("locations")
        .select("*")
        .eq("company", company);  

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data }, { status: 200 });
}
