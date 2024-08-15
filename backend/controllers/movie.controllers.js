import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovie(req,res) {
    try{
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        console.log("asdfghjk")
        const randomMovie = data.results[Math.floor(Math.random()*data.results?.length)];

        res.json({success:true, content:randomMovie})
    }
    catch(error){
        console.log("Error in getTrendingMovie controller", error.message);
        res.status(500).json({ success: false , message : "Internal Server Error"})
    }
}

export async function getMovieTrailers(req,res){
    const { id } = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        res.json({success:true, trailers: data.results});
    }
    catch(error){
        console.log("Error from getMovieTrailers", error.message);
        if(error.message.includes("404")){
            return res.status(404).send(error.message)
        }
        res.status(500).json({ success: false , message : "Internal Server Error"})

    }
}