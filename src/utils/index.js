const showFormattedDate = (date, locale = 'en') => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const resolvedLocale = locale === 'id' ? 'id-ID' : 'en-US';
  return new Date(date).toLocaleDateString(resolvedLocale, options);
};

const stripHtml = (html = '') => html
  .replace(/<[^>]*>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const filterNotesByKeyword = (notes = [], keyword = '') => {
  const normalizedKeyword = keyword.trim().toLowerCase();

  if (!normalizedKeyword) {
    return notes;
  }

  return notes.filter((note) => note.title.toLowerCase().includes(normalizedKeyword));
};

export { showFormattedDate, stripHtml, filterNotesByKeyword };
