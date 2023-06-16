import slugify from "slugify";
import seamovmodal from "../Modals/seamovmodal.js";
import fs from "fs";

export const createSeaMov = async (req, res) => {
  try {
    const { name, movie, season, dateoflaunch, category, description, tags } = req.fields;

    // Check if 'req.files' exists and if 'photo' is present
    if (!req.files || !req.files.photo) {
      res.send("photo is required");
      return;
    }

    const { photo } = req.files;

    switch (true) {
      case !name:
        res.send("name is required");
        break;
      case !description:
        res.send("description is required");
        break;
      case !category:
        res.send("category is required");
        break;
      case !photo:
        res.send("photo is required");
        break;
      case photo && photo.size > 10000000:
        res.send("photo should not be greater than 1000");
        break;
      default:
        const products = new seamovmodal({ ...req.fields , slug: slugify(name) });
        if (photo) {
          products.photo.data = fs.readFileSync(photo.path);
          products.contentType = photo.type;
        }
        await products.save();
        res.send(products);
        break;
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

export const getSeaMovPhoto = async (req, res) => {
  try {
      const seamovPhoto = await seamovmodal.findById(req.params.id).select("photo");
      if (seamovPhoto.photo.data) {
          res.set("Content-Type", seamovPhoto.photo.contentType);

          res.send(seamovPhoto.photo.data);
      }
  } catch (err) {
      res.send(err);
  }
}

export const getSeaMov = async (req,res) =>{
  try{
    const getSeaMov = await seamovmodal.find({})
    res.send(getSeaMov)


  }catch(err){
    res.send(err);

  }
}

export const getSeaMovSlug = async (req,res) =>{
  try{
    const getSeaMov = await seamovmodal.findOne({slug:req.params.slug}).select("-photo")

    res.send(getSeaMov)

  }catch(err){
    res.send(err);

  }
}

export const deleteSeaMov = async(req,res) =>{
    try {
        const seaMov = await seamovmodal.findByIdAndDelete(req.params.id).select("-photo");
        res.send(seaMov)
    } catch (err) {
        res.send(err);
        console.log(err)
    }

}