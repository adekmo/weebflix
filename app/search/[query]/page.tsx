import AnimeList from "@/components/AnimeList";

const SearchResultsPage = async ({ params }: { params: { query: string } }) => {
  const { query } = params;

  return (
    <main className="p-6">
      <AnimeList type="search" query={query} />
    </main>
  );
};

export default SearchResultsPage;
