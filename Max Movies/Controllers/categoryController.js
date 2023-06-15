import categorymodal from "../Modals/categorymodal.js"
import slugify from "slugify"

export const createCategory = async(req,res) =>{
    try{
        const { name } = req.body;
        if(!name){
            return res.status(400).json({ message: "gernse name is required" });
        }
        const categoryExist = await categorymodal.findOne({name})

        if(categoryExist){
            console.log("category already exists")
        return res.status(400).json({ message: "category already exists" });
        }

        const categorySave = await new categorymodal({name,slug:slugify(name)}).save()
        res.send(categorySave)

    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Error occurred while adding category." });
    }

}

export const updateCategory = async(req,res)=>{
    try{
        const {name} = req.body
        const {id} = req.params

        const category = await categorymodal.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.send(category)

    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Error occurred while updating category." });
    }
}

export const showCategory = async(req,res) =>{
    try{
        const getCatgories = await categorymodal.find({})
        res.send(getCatgories)

    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Error occurred while getting category." });
    }
}

export const deleteCategory = async(req,res) => {
    try{
        const {id} = req.params
        const deleteCategory = await categorymodal.findByIdAndDelete(id)
        res.send(deleteCategory)

    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Error occurred while deleting category." });
    }
}