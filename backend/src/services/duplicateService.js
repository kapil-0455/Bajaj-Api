function filterDuplicates(validRaw) {
  const seen = new Set();
  const unique = [];
  const duplicates = new Set();

  validRaw.forEach(edge => {
    const key = `${edge.parent}->${edge.child}`;
    if (seen.has(key)) {
      duplicates.add(key);
    } else {
      seen.add(key);
      unique.push(edge);
    }
  });

  return { unique, duplicates: Array.from(duplicates) };
}

module.exports = { filterDuplicates };
