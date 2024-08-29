import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovie(req,res) {
    try{
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
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
        console.log("asdfgh")
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

export async function getMovieDetails(req,res){
    const { id } = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.status(200).json({success:true, content: data});
    }
    catch(error){
        console.log("Error from getMovieDetails", error.message);
        if(error.message.includes("404")){
            return res.status(404).send(error.message)
        }
        res.status(500).json({ success: false , message : "Internal Server Error"})

    }
}

export async function getSimilarMovie(req,res){
    const { id } = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.status(200).json({success:true, similar: data.results});
    }
    catch(error){
        console.log("Error from getSimilarMovie", error.message);
        res.status(500).json({ success: false , message : "Internal Server Error"})
    }
}

export async function getMovieByCategory(req,res){
    const { category } = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        res.status(200).json({success:true, content: data.results});
    }
    catch(error){
        console.log("Error from getSimilarMovie", error.message);
        res.status(500).json({ success: false , message : "Internal Server Error"})
    }
}

