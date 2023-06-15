import gernseModal from "../Modals/gernse.js"
import slugify from "slugify"

export const createGernse = async(req,res) =>{
    try{
    const {name} = req.body
    if(!name){
        return res.status(400).json({ message: "gernse name is required" });
    }
    const gernseExists = await gernseModal.findOne({ name })
    if(gernseExists){
        return res.status(400).json({ message: "Gernse is already existed" })
    }

    const gernseSave = await new gernseModal({name,slug:slugify(name)}).save()
    res.send(gernseSave)
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Error occurred while adding gernse." });        
    }

}

export const updateGernse = async(req,res)=>{
    try{
        const { name } = req.body
        const { id } = req.params

        const gernse = await gernseModal.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.send(gernse)

    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Error occurred while updating gernse." });
    }
}

export const getGernse = async (req, res) => {
    try {
      const getGernse = await gernseModal.find({});
      res.send(getGernse);
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  };
  
export const deleteGernse = async(req,res) =>{
    try{
        const {id} = req.params
        const deleteGernse = await gernseModal.findByIdAndDelete(id)
        res.send(deleteGernse)
    }catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}