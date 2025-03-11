import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = "67cdd751001443fa7ae6";
const COLLECTION_ID = "67cdd77d000ed8832e33";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67cc97c90000c9fab4cb");

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      console.log("Increasing count");
      const existingmovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingmovie.$id,
        { count: (existingmovie.count || 0) + 1 }
      );
    } else {
      console.log("Adding new entry");
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie?.id,
        count: 1,
        title:movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
      });
    }

    console.log(result);
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

export const getTrendingMovies=async():Promise<TrendingMovie[] | undefined>=>{
   try {
        const result=await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
            Query.limit(5),
            Query.orderDesc('count')
        ])

        return result.documents as unknown as TrendingMovie[]
   } catch (error) {
      console.log(error)
      return undefined
   }
}