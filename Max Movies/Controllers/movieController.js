import moviesmodal from "../Modals/moviesmodal.js"
import slugify from "slugify"

export const createMovie = async(req,res) =>{
    try{
        const {name , movie} = req.body
        if(!name){
            console.log("name is required")
            return res.status(400).json({ message: "name is required" });
        }
        if(!movie){
            console.log("movie is required")
            return res.status(400).json({ message: "movie is required" });
        }
        const episodeExist = await moviesmodal.findOne({ name })
        if(episodeExist){
            return res.status(400).json({ message: "movie is already exists" });
        }
            
        const movieSave = await new moviesmodal({name,movie,slug:slugify(name)}).save()
        res.send(movieSave)
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Error occurred while adding episode." });        

    }
}
export const getMovie = async(req,res) =>{
    try{    
        const getMovies = await moviesmodal.find({})
        res.send(getMovies)
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Error occurred while adding episode." });        

    }
}

export const updateMovie = async(req,res) =>{
    try{    
        const{name} = req.body
        const{id} = req.params
        const updateMovie = await moviesmodal.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.send(updateMovie)
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Error occurred while adding episode." });        

    }
}

export const deleteMovie = async(req,res) =>{
    try{    
        const{id} = req.params
        const deleteMovie = await moviesmodal.findByIdAndDelete(id)
        res.send(deleteMovie)
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Error occurred while adding episode." });        

    }
}