export const layoutCategories = ['All', 'Strips', 'Grids', 'Singles', 'Polaroids'];
export function layoutCategory(template) {
  if (template.id === 'polaroid') return 'Polaroids';
  if (template.count === 1) return 'Singles';
  return template.cols === 1 ? 'Strips' : 'Grids';
}
export function filterLayouts(templates, { query = '', category = 'All', count = 'all' } = {}) {
  return templates.filter(
    (item) =>
      item.name.toLowerCase().includes(query.trim().toLowerCase()) &&
      (category === 'All' || layoutCategory(item) === category) &&
      (count === 'all' || (count === '6+' ? item.count >= 6 : item.count === Number(count)))
  );
}
