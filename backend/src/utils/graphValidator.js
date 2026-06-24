function isValidEdgeFormat(edge) {
  if (typeof edge !== 'string') return false;
  const trimmed = edge.trim();
  return /^[A-Z]->[A-Z]$/.test(trimmed);
}

module.exports = { isValidEdgeFormat };
