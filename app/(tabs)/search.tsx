import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import { useRouter } from 'expo-router'
import { useFetch } from '@/service/useFetch'
import { fetchMovies } from '@/service/api'
import MovieCard from '@/components/MovieCard'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'
import { updateSearchCount } from '@/service/appwrite'

const Search = () => {
   const [searchQuery,setSearchQury]=useState("")

    const { data: movies,
      loading: moviesLoading,
      error: moviesError,
    refetch:loadMovies,
  reset }
      = useFetch(() => fetchMovies({
        query: searchQuery
      }),false)

      useEffect(() => {
        const timeoutId = setTimeout(() => {
          const fetchData = async () => {
            if (searchQuery) {
              await loadMovies();
              // console.log("object")
            
            } else {
              reset();
            }
          };
          fetchData();
        }, 500);
      
        return () => clearTimeout(timeoutId);
      }, [searchQuery]);
      useEffect(()=>{
        if (movies?.length >0) {
           updateSearchCount(searchQuery, movies[0]);
        }
      },[movies])
  return (
    <View className='flex-1 bg-primary'>
     <Image source={images.bg} className='flex-1 absolute w-full z-0'
     resizeMode='cover'/>
          <FlatList
           data={movies}
           renderItem={({item})=><MovieCard {...item}/>}
           keyExtractor={(item)=>item.id.toString()}
           className='px-5'
           numColumns={3}
           columnWrapperStyle={{
            justifyContent:"center",
            gap:16,
            marginVertical:16
           }}
           contentContainerStyle={{
            paddingBottom:100
           }}
           ListHeaderComponent={
            <>
             <View className='w-full flex-row justify-center mt-20'>
              <Image source={icons.logo} className='w-12 h-10'></Image>

             </View>
             <View className='my-5'>
              <SearchBar placeholder="Seach movies" value={searchQuery}
               onChangeText={(text:string)=>setSearchQury(text)}>

              </SearchBar>
             </View>
               {moviesLoading && (
                <ActivityIndicator size="large" color="#0000ff" className='my-3'/>
               )}
               {moviesError &&(
                <Text className='text-red-500 px-5 my-3'>
                  Error:{moviesError.message}
                </Text>
               )}

               {
                 !moviesLoading && !moviesError  && searchQuery.trim() &&movies?.length>0 &&(
                  <Text className='text-white font-bold'>
                      Search results for{" "}
                      <Text className='text-accent'>{searchQuery}</Text>
                  </Text>
                 )
               }
            </>
           }
           ListEmptyComponent={
            !moviesLoading && !moviesError?(
              <View className='mt-10 px-5'>
                     <Text className='text-center text-gray-500'>
                      {searchQuery.trim()?"No movies found":"Search for a movie"}
                     </Text>
              </View>
            ):null}
          />
      </View>
  )
}

export default Search