import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get("id");

    if (!locationId) {
        return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
    }


    const { data: locationData, error: locationError } = await supabase
        .from("locations")
        .select("*")
        .eq("id", locationId)
        .single(); 

    if (locationError) {
        return NextResponse.json({ error: locationError.message }, { status: 500 });
    }

    if (!locationData) {
        return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }


    const { data: reviews, error: reviewError } = await supabase
        .from("reviews")
        .select("overall_rating, bathroom_rating, building_rating, room_rating, location_rating")
        .eq("location_uuid", locationId);

    if (reviewError) {
        return NextResponse.json({ error: reviewError.message }, { status: 500 });
    }

    let averageRatings = {
        overall_rating: null,
        bathroom_rating: null,
        building_rating: null,
        room_rating: null,
        location_rating: null,
        reviews_count: 0,
    };

    if (reviews && reviews.length > 0) {
        const total = {
            overall_rating: 0,
            bathroom_rating: 0,
            building_rating: 0,
            room_rating: 0,
            location_rating: 0,
        };

        reviews.forEach((review) => {
            total.overall_rating += review.overall_rating ?? 0;
            total.bathroom_rating += review.bathroom_rating ?? 0;
            total.building_rating += review.building_rating ?? 0;
            total.room_rating += review.room_rating ?? 0;
            total.location_rating += review.location_rating ?? 0;
        });

        const count = reviews.length;

        averageRatings = {
            overall_rating: +(total.overall_rating / count).toFixed(1),
            bathroom_rating: +(total.bathroom_rating / count).toFixed(1),
            building_rating: +(total.building_rating / count).toFixed(1),
            room_rating: +(total.room_rating / count).toFixed(1),
            location_rating: +(total.location_rating / count).toFixed(1),
            reviews_count: count,
        };
    }

    const result = {
        ...locationData,
        ratings: averageRatings,
    };

    return NextResponse.json({ data: result }, { status: 200 });
}
