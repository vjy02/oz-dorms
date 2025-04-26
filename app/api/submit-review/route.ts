import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function PUT(request: Request) {
    const supabase = await createClient();

    const body = await request.json();
    const { id, content, locationRating, buildingRating, bathroomRating, roomRating } = body;

    if (!id || !content || locationRating == null || buildingRating == null || bathroomRating == null || roomRating == null) {
        return NextResponse.json(
            { error: "Missing required fields: id, content, locationRating, buildingRating, bathroomRating, roomRating" },
            { status: 400 }
        );
    }

    const overallRating = Number(
        (
            (locationRating + buildingRating + bathroomRating + roomRating) / 4
        ).toFixed(1) 
    );

    const { data, error } = await supabase
        .from("reviews")
        .insert({
            location_uuid: id,
            content: content,
            location_rating: locationRating,
            building_rating: buildingRating,
            bathroom_rating: bathroomRating,
            room_rating: roomRating,
            overall_rating: overallRating
        });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
}
