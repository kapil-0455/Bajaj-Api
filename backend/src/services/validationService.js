function validateEdges(data) {
  const validRaw = [];
  const invalid = [];

  data.forEach(entry => {
    if (typeof entry !== 'string') {
      invalid.push(String(entry));
      return;
    }

    const trimmed = entry.trim();
    if (/^[A-Z]->[A-Z]$/.test(trimmed)) {
      const [parent, child] = trimmed.split('->');
      if (parent === child) {
        invalid.push(entry);
      } else {
        validRaw.push({ parent, child, original: entry });
      }
    } else {
      invalid.push(entry);
    }
  });

  return { validRaw, invalid };
}

module.exports = { validateEdges };
