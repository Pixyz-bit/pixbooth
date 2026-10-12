export function layoutPhotoCounts(templates) {
  return [...new Set(templates.map((item) => item.count))].sort((a, b) => a - b);
}
export function filterLayouts(templates, { query = '', count = 'all' } = {}) {
  return templates.filter(
    (item) =>
      item.name.toLowerCase().includes(query.trim().toLowerCase()) &&
      (count === 'all' || item.count === Number(count))
  );
}
