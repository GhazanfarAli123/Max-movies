import episodesmodal from "../Modals/episodesmodal.js"
import slugify from "slugify"

export const addEpisode = async(req,res) =>{
    try{
        const {name,episode} = req.body
        if(!name){
            console.log("name is required")
            return res.status(400).json({ message: "name is required" });
        }
        if(!episode){
            console.log("episode is required")
            return res.status(400).json({ message: "episode name is required" });
        }

        const episodeExist = await episodesmodal.findOne({ name })
        if(episodeExist){
            return res.status(400).json({ message: "episode is already exists" });
        }
        
        const episodeSave = await new episodesmodal({name,episode,slug:slugify(name)}).save()
        res.send(episodeSave)
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Error occurred while adding episode." });        

    }
}

export const getEpisodes = async(req,res) =>{
    try{
        const getEpisodes = await episodesmodal.find({})
        res.send(getEpisodes)

    }catch(err){
        console.error(err);
        res.status(500).json({ message: "internal Server Error." });        

    }
}

export const updateEpisodes = async(req,res) =>{
    try{
        const {name,episode} =req.body
        const {id} = req.params

        const episodes = await episodesmodal.findByIdAndUpdate(id,{name,episode,slug:slugify(name)},{new:true})
        res.send(episodes)

    }catch(err){
        console.log(err)
        console.error(err);
        res.status(500).json({ message: "Error occurred while updating episode." });        
    }
}

export const deleteEpisodes = async(req,res) =>{
    try{
        const {id} = req.params
        const episodes = await episodesmodal.findByIdAndDelete(id)
        res.send(episodes)

    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Error occurred while deleting episode." });        
    }
}