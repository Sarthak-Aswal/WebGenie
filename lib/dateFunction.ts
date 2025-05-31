export function parsePostgresTimestamp(timestamp: string): Date | null {
  if (!timestamp) return null;

  // Step 1: Replace space between date and time with 'T' to make it ISO-like
  let isoString = timestamp.replace(" ", "T");

  // Step 2: Fix timezone offset — add ":00" if only hours are present (e.g., +00 -> +00:00)
  isoString = isoString.replace(/([+-]\d{2})(\d{2})?$/, (match, p1, p2) => {
    return p2 ? match : p1 + ":00";
  });

  // Step 3: Trim microseconds (more than 3 digits) to milliseconds (3 digits)
  isoString = isoString.replace(/(\.\d{3})\d+/, "$1");

  // Step 4: Parse to Date
  const date = new Date(isoString);

  // Step 5: Return date or null if invalid
  return isNaN(date.getTime()) ? null : date;
}
