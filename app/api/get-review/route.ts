import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get("location_id");

    let query = supabase.from("reviews").select("*").order("created_at", { ascending: false });

    if (locationId) {
        query = query.eq("location_uuid", locationId);
    }

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ reviewsData: data }, { status: 200 });
}
