import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingTv(req,res) {
    try{
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        const randomTv = data.results[Math.floor(Math.random()*data.results?.length)];

        res.json({success:true, content:randomTv})
    }
    catch(error){
        console.log("Error in getTrendingTv controller", error.message);
        res.status(500).json({ success: false , message : "Internal Server Error"})
    }
}

export async function getTvTrailers(req,res){
    const { id } = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.json({success:true, trailers: data.results});
    }
    catch(error){
        console.log("Error from getTvTrailers", error.message);
        if(error.message.includes("404")){
            return res.status(404).send(error.message)
        }
        res.status(500).json({ success: false , message : "Internal Server Error"})

    }

}

export async function getTvDetails(req,res){
    const { id } = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(200).json({success:true, contents: data});
    }
    catch(error){
        console.log("Error from getTvDetails", error.message);
        if(error.message.includes("404")){
            return res.status(404).send(error.message)
        }
        res.status(500).json({ success: false , message : "Internal Server Error"})

    }
}

export async function getSimilarTv(req,res){
    const { id } = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.status(200).json({success:true, similar: data.results});
    }
    catch(error){
        console.log("Error from getSimilarTv", error.message);
        res.status(500).json({ success: false , message : "Internal Server Error"})
    }
}

export async function getTvByCategory(req,res){
    const { category } = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.status(200).json({success:true, content: data.results});
    }
    catch(error){
        console.log("Error from getTvByCategory", error.message);
        res.status(500).json({ success: false , message : "Internal Server Error"})
    }
}

