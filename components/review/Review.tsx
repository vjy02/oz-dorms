"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { useSearchParams } from "next/navigation";

type LocationRaw = {
  id: string;
  name: string;
  location: string;
  created_at: string;
  company: string;
  state: string;
  summary: string;
  maps_url: string;
  images: string[];
};

type University = {
  name: string;
  dorms: { id: string; name: string }[];
};

type Step = "choose" | "rating" | "comment" | "confirmation";

export default function Review() {
  const searchParams = useSearchParams();
  const [id, setId] = useState(searchParams.get("id") ?? "");
  const [universities, setUniversities] = useState<University[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedDorm, setSelectedDorm] = useState("");
  const [step, setStep] = useState<Step>(id ? "rating" : "choose");

  // ratings & comment states
  const [roomRating, setRoomRating] = useState(0);
  const [buildingRating, setBuildingRating] = useState(0);
  const [bathroomRating, setBathroomRating] = useState(0);
  const [locationRating, setLocationRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  // 1️⃣ Fetch & group on first step
  useEffect(() => {
    if (step !== "choose") return;

    fetch("/api/get-all-locations") // your endpoint that returns { data: LocationRaw[] }
      .then((res) => res.json())
      .then(({ data }: { data: LocationRaw[] }) => {
        // group by company
        const byCompany = data.reduce(
          (acc: Record<string, LocationRaw[]>, loc) => {
            acc[loc.company] = acc[loc.company] || [];
            acc[loc.company].push(loc);
            return acc;
          },
          {}
        );

        // map into University[]
        const uniList: University[] = Object.entries(byCompany).map(
          ([company, locs]) => ({
            name: company,
            dorms: locs.map((l) => ({ id: l.id, name: l.name })),
          })
        );

        setUniversities(uniList);
      })
      .catch(() => {
        setError("Failed to load universities. Please try again later.");
      });
  }, [step]);

  const handleNextFromChoose = () => {
    if (!selectedUniversity || !selectedDorm) {
      setError("Please select a university and dorm.");
      return;
    }
    setError(null);
    if (id === "") {
      setId(selectedDorm);
    }
    setStep("rating");
  };

  const handleNextFromRating = () => {
    if (!roomRating || !buildingRating || !bathroomRating || !locationRating) {
      setError("Please rate all categories.");
      return;
    }
    setError(null);
    setStep("comment");
  };
  const handleNextFromComment = async () => {
    if (comment.trim().length < 75) {
      setError("Comment must be at least 75 characters.");
      return;
    }
    setError(null);
    await fetch("/api/submit-review", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        content: comment,
        buildingRating,
        roomRating,
        bathroomRating,
        locationRating,
      }),
    });
    setStep("confirmation");
  };

  // ◀️ Handlers to go back
  const handleBackFromRating = () => setStep("choose");
  const handleBackFromComment = () => setStep("rating");

  // progress indicator
  const progress = { choose: 1, rating: 2, comment: 3, confirmation: 4 }[step];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 flex flex-col items-center py-8 px-4">
        <div className="w-full max-w-xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Write a Dorm Review</h1>
            <span className="text-xs text-muted-foreground">
              Step {progress} of 4
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-blue-900 h-2 rounded-full transition-all"
              style={{ width: `${(progress / 4) * 100}%` }}
            />
          </div>

          {step === "choose" && (
            <section className="animate-fade-in flex flex-col gap-6">
              <div>
                <Label>Select University</Label>
                <select
                  className="mt-1 w-full border rounded p-2 text-sm"
                  value={selectedUniversity}
                  onChange={(e) => {
                    setSelectedUniversity(e.target.value);
                    setSelectedDorm("");
                  }}
                >
                  <option value="">Choose...</option>
                  {universities.map((u) => (
                    <option key={u.name} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedUniversity && (
                <div>
                  <Label>Select Dorm</Label>
                  <select
                    className="mt-1 w-full border rounded p-2 text-sm"
                    value={selectedDorm}
                    onChange={(e) => setSelectedDorm(e.target.value)}
                  >
                    <option value="">Choose...</option>
                    {universities
                      .find((u) => u.name === selectedUniversity)
                      ?.dorms.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {error && <span className="text-red-500">{error}</span>}

              <div className="flex justify-end">
                <Button
                  type="button"
                  className="bg-blue-900 px-8"
                  disabled={!selectedUniversity || !selectedDorm}
                  onClick={handleNextFromChoose}
                >
                  Next
                </Button>
              </div>
            </section>
          )}

          {step === "rating" && (
            <section className="animate-fade-in flex flex-col gap-6">
              {/* Room */}
              <div>
                <Label>
                  Rate the room{" "}
                  <span className="text-xs text-muted-foreground ml-1">
                    (vibe and looks)
                  </span>
                </Label>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Star
                      key={v}
                      size={28}
                      className={
                        v <= roomRating
                          ? "text-yellow-400 fill-yellow-400 cursor-pointer"
                          : "text-gray-300 cursor-pointer"
                      }
                      onClick={() => setRoomRating(v)}
                    />
                  ))}
                </div>
              </div>

              {/* Building */}
              <div>
                <Label>
                  Rate the building{" "}
                  <span className="text-xs text-muted-foreground ml-1">
                    (amenities, age and staff)
                  </span>
                </Label>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Star
                      key={v}
                      size={28}
                      className={
                        v <= buildingRating
                          ? "text-yellow-400 fill-yellow-400 cursor-pointer"
                          : "text-gray-300 cursor-pointer"
                      }
                      onClick={() => setBuildingRating(v)}
                    />
                  ))}
                </div>
              </div>

              {/* Bathroom */}
              <div>
                <Label>
                  Rate the bathroom{" "}
                  <span className="text-xs text-muted-foreground ml-1">
                    (cleanliness and modernness)
                  </span>
                </Label>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Star
                      key={v}
                      size={28}
                      className={
                        v <= bathroomRating
                          ? "text-yellow-400 fill-yellow-400 cursor-pointer"
                          : "text-gray-300 cursor-pointer"
                      }
                      onClick={() => setBathroomRating(v)}
                    />
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <Label>
                  Rate the location{" "}
                  <span className="text-xs text-muted-foreground ml-1">
                    (convenience and safety)
                  </span>
                </Label>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Star
                      key={v}
                      size={28}
                      className={
                        v <= locationRating
                          ? "text-yellow-400 fill-yellow-400 cursor-pointer"
                          : "text-gray-300 cursor-pointer"
                      }
                      onClick={() => setLocationRating(v)}
                    />
                  ))}
                </div>
              </div>

              {error && <span className="text-red-500">{error}</span>}

              <div className="flex justify-between mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBackFromRating}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  className="bg-blue-900 px-8"
                  onClick={handleNextFromRating}
                >
                  Next
                </Button>
              </div>
            </section>
          )}

          {step === "comment" && (
            <section className="animate-fade-in flex flex-col gap-6">
              <div>
                <Label htmlFor="comment">Write a comment</Label>
                <Textarea
                  id="comment"
                  required
                  className="min-h-[120px] mt-2"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={`Share the pros, cons and what to expect when living at ${
                    universities
                      .find((u) => u.name === selectedUniversity)
                      ?.dorms.find((d) => d.id === selectedDorm)?.name ||
                    "this dorm"
                  }. Write a helpful comment at least 75 characters.`}
                  minLength={75}
                />
                <div className="text-xs mt-1 text-muted-foreground">
                  {comment.length < 75
                    ? `${75 - comment.length} more characters needed`
                    : "Minimum met"}
                </div>
              </div>
              {error && <span className="text-red-500">{error}</span>}
              <div className="flex justify-between mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBackFromComment}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  className="bg-blue-900 px-8"
                  onClick={handleNextFromComment}
                >
                  Submit Review
                </Button>
              </div>
            </section>
          )}

          {step === "confirmation" && (
            <section className="animate-fade-in flex flex-col items-center gap-4 py-20">
              <div className="text-3xl">🎉</div>
              <h2 className="text-xl font-semibold text-blue-900">
                Thank you for your review!
              </h2>
              <p className="text-center max-w-md">
                Your feedback helps future students make informed choices.
                You&apos;ll be redirected to the homepage.
              </p>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
