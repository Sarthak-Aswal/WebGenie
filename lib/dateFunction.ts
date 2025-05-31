// In /lib/dateFunction.ts (or wherever you keep utilities)
export function parsePostgresTimestamp(timestamp: string): Date | null {
  if (!timestamp) return null;
  // Convert "2025-05-31 16:50:48.807325+00" to "2025-05-31T16:50:48.807325+00:00"
  let isoString = timestamp.replace(" ", "T");
  // Append ":00" if timezone offset lacks colon
  if (!isoString.match(/([+-]\d{2}):\d{2}$/)) {
    isoString += ":00";
  }
  const date = new Date(isoString);
  return isNaN(date.getTime()) ? null : date;
}
