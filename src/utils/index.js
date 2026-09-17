const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};

const stripHtml = (html = '') => html
  .replace(/<[^>]*>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const filterNotesByKeyword = (notes, keyword = '') => {
  const normalizedKeyword = keyword.trim().toLowerCase();

  if (!normalizedKeyword) {
    return notes;
  }

  return notes.filter((note) => note.title.toLowerCase().includes(normalizedKeyword));
};

export { showFormattedDate, stripHtml, filterNotesByKeyword };
