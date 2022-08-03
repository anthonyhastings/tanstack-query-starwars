import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useFilms = () => {
  return useQuery(['films', 'list'], async () => {
    const data = await (await fetch('https://swapi.dev/api/films/')).json();

    return data.results.map((film) => {
      const urlParts = film.url
        .split('/')
        .filter(Boolean);

      return {
        ...film,
        id: urlParts[urlParts.length - 1]
      }
    });
  });
};

export const useFilm = (filmId) => {
  const queryClient = useQueryClient();

  return useQuery(["films", 'detail', filmId], async () => {
    const data = await (await fetch(`https://swapi.dev/api/films/${filmId}`)).json();
    return data;
  }, {
    initialData: () => {
      const dataFromCache = queryClient.getQueryData(['films'])?.find((film) => film.id === filmId)
      console.log('Initial Data From Cache:', dataFromCache);
      return dataFromCache;
    }
  });
};