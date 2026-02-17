import { createClient } from "@supabase/supabase-js";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

async function fetchTable(query, name) {
  const { data, error } = await query;
  if (error) {
    console.error(`Failed to fetch ${name}:`, error.message);
    process.exit(1);
  }
  return data ?? [];
}

const events = await fetchTable(
  supabase.from("Events").select("*"),
  "Events"
);

const artists = await fetchTable(
  supabase.from("Artists").select("*"),
  "Artists"
);

const categories = await fetchTable(
  supabase.from("Categories").select("id, description"),
  "Categories"
);

const artistEventRows = await fetchTable(
  supabase
    .from("ArtistsEvent")
    .select(
      `
      event_id,
      artist_id,
      timetable,
      Events (
        id,
        name,
        description,
        photos,
        highlighted
      ),
      Artists (
        id,
        name,
        surname,
        photos
      )
    `
    ),
  "ArtistsEvent"
);

const highlightEvents = events
  .filter((eventItem) => eventItem.highlighted)
  .map((eventItem) => ({
    id: eventItem.id,
    name: eventItem.name,
    photos: eventItem.photos,
    promotional_text: eventItem.promotional_text,
  }));

const artistsByEvent = {};
const eventsByArtist = {};

for (const row of artistEventRows) {
  if (row.event_id) {
    if (!artistsByEvent[row.event_id]) {
      artistsByEvent[row.event_id] = [];
    }
    artistsByEvent[row.event_id].push({
      timetable: row.timetable,
      Artists: row.Artists,
    });
  }

  if (row.artist_id) {
    if (!eventsByArtist[row.artist_id]) {
      eventsByArtist[row.artist_id] = [];
    }
    eventsByArtist[row.artist_id].push({
      Events: row.Events,
    });
  }
}

const outputDir = path.resolve("public", "data");
await mkdir(outputDir, { recursive: true });

const writeJson = async (fileName, payload) => {
  const filePath = path.join(outputDir, fileName);
  await writeFile(filePath, JSON.stringify(payload, null, 2), "utf-8");
};

await writeJson("events.json", events);
await writeJson("artists.json", artists);
await writeJson("categories.json", categories);
await writeJson("highlight-events.json", highlightEvents);
await writeJson("artists-by-event.json", artistsByEvent);
await writeJson("events-by-artist.json", eventsByArtist);

console.log("Static data exported to public/data");
