import React, { useState } from 'react';
import { useFilms, useFilm, useUpdateFilmTitle } from './api';

const Films = () => {
  const { data, isLoading } = useFilms();
  const [selectedFilmId, setSelectedFilmId] = useState();

  if (isLoading) return <h1>Loading Films...</h1>;

  return (
    <>
      {data?.map((film) => (
        <button
          onClick={() => setSelectedFilmId(film.id)}
          key={film.id}
          style={{ ...(film.id === selectedFilmId && { border: '2px solid black' })}}
        >
          {film.title}
        </button>
      ))}
      <hr />
      {selectedFilmId && <Film id={selectedFilmId} />}
    </>
  );
};

const Film = ({ id }) => {
  const { data, isLoading, isRefetching } = useFilm(id);
  const mutation = useUpdateFilmTitle(id);

  console.log('Film', { isLoading, isRefetching });

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <h1>{data?.title}</h1>
      <p>{data?.opening_crawl}</p>
      <button onClick={() => { mutation.mutate('!'); }}>
        Make title more exciting!
      </button>
    </>
  );
};

export default Films;
