import { useFilms } from './api';

const MovieCounter = () => {
  const { data, isLoading } = useFilms();

  if (isLoading) return <p>Loading Counter...</p>;

  return (
    <>
      <span>Total Movies: {data?.length || 0}</span>
    </>
  );
};

export default MovieCounter;
