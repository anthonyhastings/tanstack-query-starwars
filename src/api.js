import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useFilms = () => {
  return useQuery(['films', 'list'], async () => {
    const data = await (await fetch('/films')).json();
    return data;
  });
};

export const useFilm = (filmId) => {
  const queryClient = useQueryClient();

  return useQuery(['films', 'detail', filmId], async () => {
    const data = await (await fetch(`/films/${filmId}`)).json();
    return data;
  }, {
    initialData: () => {
      const dataFromCache = queryClient.getQueryData(['films', 'list'])?.find((film) => film.id === filmId);
      console.log('useFilm::initialData - Data From Cache:', dataFromCache);
      return dataFromCache;
    }
  });
};

export const useUpdateFilmTitle = (filmId) => {
  const queryClient = useQueryClient();
  const record = queryClient.getQueryData(['films', 'detail', filmId]);

  return useMutation(async (titleSuffix) => {
    return await (await fetch(`/films/${filmId}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: `${record.title}${titleSuffix}`
      })
    })).json();
  }, {
    onSuccess: (data) => {
      queryClient.setQueryData(['films', 'detail', filmId], data);
      queryClient.invalidateQueries(['films', 'list']);
    }
  });
};
