import seasonModal from "../Modals/seasonmodal.js"
import slugify from "slugify"

export const createSeason = async(req,res) =>{
    try{
        const {name, episodes} = req.body
        if(!name){
            return res.status(400).json({ message: "season name is required" });
        }
        const seasonExists = await seasonModal.findOne({ name })
        if(seasonExists){
            return res.status(400).json({ message: "Season is already existed" })
        }
        const season = await new seasonModal({name,episodes,slug:slugify(name)}).save()
        res.send(season)

    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Error occurred while adding season." });  
    }
}
export const updateSeason = async(req,res) =>{
    try{
        const {name ,episodes} = req.body
        const {id} = req.params
        if(!name){
            return res.status(400).json({ message: "season name is required" });
        }
        const season = await seasonModal.findByIdAndUpdate(id,{name,episodes,slug:slugify(name)},{new:true})
        res.send(season)

    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Error occurred while adding season." });  
    }
}
export const deleteSeason = async(req,res) =>{
    try{
        const {id} = req.params
        const deleteSeason = await seasonModal.findByIdAndDelete(id)
        res.send(deleteSeason)

    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Error occurred while adding season." });  
    }
}
export const getSeason = async(req,res) =>{
    try{
        const getSeason = await seasonModal.find({})
        res.send(getSeason)

    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Error occurred while adding season." });  
    }
}