import axios from 'axios';

const API_BASE = 'https://api.mangadex.org';

export const getLatestManga = async (language = 'id') => {
  const response = await axios.get(`${API_BASE}/manga`, {
    params: {
      limit: 20,
      includedTagsMode: 'AND',
      excludedTagsMode: 'OR',
      contentRating: ['safe', 'suggestive'],
      order: { latestUploadedChapter: 'desc' },
      availableTranslatedLanguage: [language],
      includes: ['cover_art']
    }
  });
  return response.data.data;
};

export const searchManga = async (query, language = 'id') => {
  const response = await axios.get(`${API_BASE}/manga`, {
    params: {
      title: query,
      limit: 20,
      availableTranslatedLanguage: [language],
      includes: ['cover_art'],
      order: { relevance: 'desc' }
    }
  });
  return response.data.data;
};

export const getMangaDetails = async (id) => {
  const response = await axios.get(`${API_BASE}/manga/${id}`, {
    params: {
      includes: ['cover_art', 'author', 'artist']
    }
  });
  return response.data.data;
};

export const getMangaChapters = async (mangaId, language = 'id') => {
  const response = await axios.get(`${API_BASE}/manga/${mangaId}/feed`, {
    params: {
      translatedLanguage: [language],
      order: { chapter: 'asc' },
      limit: 500
    }
  });
  return response.data.data;
};

export const getChapterImages = async (chapterId) => {
  // First get the image URLs from MangaDex
  const response = await axios.get(`${API_BASE}/at-home/server/${chapterId}`);
  const { baseUrl, chapter } = response.data;
  
  // Construct full image URLs
  return chapter.data.map(image => `${baseUrl}/data/${chapter.hash}/${image}`);
};
