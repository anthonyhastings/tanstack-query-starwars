# TanStack Query: Star Wars

## Introduction
TanStack Query helps to separate global state out into **application state** and **server state**, the latter of which is what it targets. It can help with:

- Deduping multiple requests for the same data into a single request.
- Identifying stale data and re-fetching automatically in the background.
- Caching query results.

## Instructions
Simply run the following and watch the console which informs you of the URL for the project:

```shell
  npm install
  npm run dev
```

## Notes
  - To save hitting a real API, we use mock service worker to mock out some sample data.
  - Initial data is set in the cache when fetching individual films. This means that when we click to see that film, it doesn't show a loader. It's got the data already, though it's deemed stale and will fetch in the background.
  - The `<Films />` and `<MovieCounter />` components both utilise the `useFilms` hook upon first render but only one API call is made. TanStack Query is deduping this for us automatically.
  - Upon editing an individual record, we update that records cache entry and also invalidate the list cache. This forces the list query to refetch itself to pick fresh data. The reason for this manual invalidation is done because TanStack Query does not use a normalised cache like Apollo Client does. The records returned from the list query aren't normalised out and cached individually.

## Further Information:
  - [Motivation](https://tanstack.com/query/v4/docs/overview)
  - [Important Defaults](https://tanstack.com/query/v4/docs/guides/important-defaults)
  - [Queries](https://tanstack.com/query/v4/docs/guides/queries)
  - [Query Invaliation](https://tanstack.com/query/v4/docs/guides/query-invalidation)
  - [Invalidation From Mutations](https://tanstack.com/query/v4/docs/guides/invalidations-from-mutations)
  - [Updates From Mutation Responses](https://tanstack.com/query/v4/docs/guides/updates-from-mutation-responses)
