/**
 * Replaces `**bold**` in the input string with HTML `<strong>` tags for bold text.
 *
 * @param {string} text - The input text containing `**bold**` markers.
 * @returns {string} - The input text with `**bold**` replaced by `<strong>bold</strong>`.
 */
export const formatText = (text) => {
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
};
