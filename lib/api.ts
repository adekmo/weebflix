

// export async function AnimeApi(path: string) {
//   const res = await fetch(`https://hianime.p.rapidapi.com/${path}`, 
//     {
//       headers: {
//         "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
//         "x-rapidapi-host": "hianime.p.rapidapi.com",
//       },
//       cache: "no-store",
//     }
//   );

//    if (!res.ok) {
//     throw new Error(`Hianime API error: ${res.status}`);
//   }

//   return res.json();
// }

export async function AnimeApi(path: string, revalidateSeconds: number = 3600) {
  const fetchOptions: RequestInit & { next?: { revalidate?: number } } = process.env.NODE_ENV === "development" ? { cache: "no-store" }
  : { next: { revalidate: revalidateSeconds } };

  const res = await fetch(`https://hianime.p.rapidapi.com/${path}`, 
    { headers: { 
      "x-rapidapi-key": process.env.RAPIDAPI_KEY!, 
      "x-rapidapi-host": "hianime.p.rapidapi.com", }, 
      // cache: "no-store", 
      // next: { revalidate: revalidateSeconds }, 
      ...fetchOptions, } ); 
      
      if (!res.ok) { throw new Error(`Hianime API error: ${res.status}`); } 
  return res.json(); 
}