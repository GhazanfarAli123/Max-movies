import slugify from "slugify"
import countriesmodal from "../Modals/countriesmodal.js";

export const createCountry = async(req,res) =>{
    try{
        const {name, episodes} = req.body
        if(!name){
            return res.status(400).json({ message: "country name is required" });
        }
        const seasonExists = await countriesmodal.findOne({ name })
        if(seasonExists){
            return res.status(400).json({ message: "country is already existed" })
        }
        const season = await new countriesmodal({name,episodes,slug:slugify(name)}).save()
        res.send(season)

    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Error occurred while adding country." });  
    }
}
export const updateCountry = async(req,res) =>{
    try{
        const {name} = req.body
        const {id} = req.params
        if(!name){
            return res.status(400).json({ message: "country name is required" });
        }
        const season = await countriesmodal.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.send(season)

    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Error occurred while adding season." });  
    }
}
export const getCountry = async(req,res) =>{
    try{
        const getSeason = await countriesmodal.find({})
        res.send(getSeason)

    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Error occurred while adding season." });  
    }
}
export const deleteCountry = async(req,res) =>{
    try{
        const {id} = req.params
        const deleteSeason = await countriesmodal.findByIdAndDelete(id)
        res.send(deleteSeason)

    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Error occurred while deleting country." });  
    }
}
