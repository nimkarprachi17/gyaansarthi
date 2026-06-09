async function fetchYouTubeTranscript(youtubeId) {
  const key = process.env.SUPADATA_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(
      `https://api.supadata.ai/v1/youtube/transcript?videoId=${encodeURIComponent(youtubeId)}&text=true`,
      { headers: { "x-api-key": key } }
    );
    if (!res.ok) {
      console.error("Supadata transcript error", res.status, await res.text());
      return null;
    }
    const data = await res.json();
    const text = typeof data?.content === "string" ? data.content : Array.isArray(data?.content) ? data.content.map((c) => c.text || "").join(" ") : "";
    if (!text || text.length < 50) return null;
    return { text, title: data?.title };
  } catch (e) {
    console.error("Transcript fetch failed", e);
    return null;
  }
}
async function fetchYouTubeTitle(youtubeId) {
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${youtubeId}&format=json`);
    if (!res.ok) return null;
    const data = await res.json();
    return data?.title ?? null;
  } catch {
    return null;
  }
}
export {
  fetchYouTubeTitle,
  fetchYouTubeTranscript
};
