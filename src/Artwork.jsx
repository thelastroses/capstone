import { supabase } from "./supabase";

export const ARTWORK_LOAD_TIMEOUT_MS = 10_000;

export class ArtworkLoadError extends Error {
  constructor(kind, message) {
    super(message);
    this.name = "ArtworkLoadError";
    this.kind = kind;
  }
}

export function getArtworkLoadErrorMessage(error) {
  if (error instanceof ArtworkLoadError) {
    return error.message;
  }

  return "Could not retrieve artwork. Please try again.";
}

function isRateLimited(error, status) {
  return status === 429
    || error?.status === 429
    || error?.code === "429"
    || /rate.?limit|too many requests/i.test(error?.message ?? "");
}

function isSchemaMismatch(error) {
  return ["42703", "PGRST200", "PGRST204"].includes(error?.code)
    || /column .* does not exist|could not find .* in the schema cache/i.test(error?.message ?? "");
}

function validateArtworkRows(data) {
  if (!Array.isArray(data)) {
    throw new ArtworkLoadError(
      "invalid-response",
      "The artwork service returned data in an unexpected format.",
    );
  }

  const isValidArtwork = artwork =>
    artwork !== null
    && typeof artwork === "object"
    && typeof artwork.id === "string"
    && typeof artwork.png_name === "string"
    && typeof artwork.png_path === "string"
    && ["2D", "3D", "both"].includes(artwork.gallery_type)
    && (
      artwork.procreate_data == null
      || (
        typeof artwork.procreate_data === "object"
        && !Array.isArray(artwork.procreate_data)
      )
    );

  if (!data.every(isValidArtwork)) {
    throw new ArtworkLoadError(
      "invalid-response",
      "The artwork service returned data in an unexpected format.",
    );
  }

  return data;
}

function getDevelopmentFailureMode() {
  if (!import.meta.env.DEV || typeof window === "undefined") {
    return null;
  }

  const mode = new URLSearchParams(window.location.search).get("artworkFailure");
  return ["timeout", "rate-limited", "changed-response"].includes(mode) ? mode : null;
}

function getSimulatedResponse(mode, signal) {
  if (mode === "timeout") {
    return new Promise(resolve => {
      const onAbort = () => resolve({ data: null, error: { name: "AbortError" }, status: 0 });
      if (signal.aborted) {
        onAbort();
      } else {
        signal.addEventListener("abort", onAbort, { once: true });
      }
    });
  }

  if (mode === "rate-limited") {
    return Promise.resolve({
      data: null,
      error: { message: "Too many requests" },
      status: 429,
    });
  }

  return Promise.resolve({
    data: [{
      id: "simulated-artwork",
      png_name: "changed-response.png",
      gallery_type: "both",
      procreate_data: null,
    }],
    error: null,
    status: 200,
  });
}

export async function getImages({
  client = supabase,
  timeoutMs = ARTWORK_LOAD_TIMEOUT_MS,
} = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const failureMode = getDevelopmentFailureMode();
    const response = failureMode
      ? await getSimulatedResponse(failureMode, controller.signal)
      : await client
        .from("artwork")
        .select(`id, png_name, png_path, gallery_type,
          procreate_data (
          artwork_name, width, height, dpi, stroke_count, tracked_time
          )`)
        .abortSignal(controller.signal);

    if (controller.signal.aborted) {
      throw new ArtworkLoadError(
        "timeout",
        "The artwork request timed out. Please try again.",
      );
    }

    if (response?.status === 429 || isRateLimited(response?.error, response?.status)) {
      throw new ArtworkLoadError(
        "rate-limited",
        "The artwork service is rate-limited. Please try again shortly.",
      );
    }

    if (isSchemaMismatch(response?.error)) {
      throw new ArtworkLoadError(
        "invalid-response",
        "The artwork data format has changed. Showing a sample instead.",
      );
    }

    if (response?.error) {
      throw new ArtworkLoadError(
        "unavailable",
        "Could not connect to the artwork database. Please try again.",
      );
    }

    if (!response || !("data" in response)) {
      throw new ArtworkLoadError(
        "invalid-response",
        "The artwork service returned data in an unexpected format.",
      );
    }

    return validateArtworkRows(response.data);
  } catch (error) {
    if (error instanceof ArtworkLoadError) {
      throw error;
    }

    if (controller.signal.aborted || error?.name === "AbortError") {
      throw new ArtworkLoadError(
        "timeout",
        "The artwork request timed out. Please try again.",
      );
    }

    if (isRateLimited(error, error?.status)) {
      throw new ArtworkLoadError(
        "rate-limited",
        "The artwork service is rate-limited. Please try again shortly.",
      );
    }

    throw new ArtworkLoadError(
      "unavailable",
      "Could not connect to the artwork database. Please try again.",
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
