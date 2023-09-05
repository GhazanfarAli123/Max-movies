import slugify from "slugify";
import seamovmodal from "../Modals/seamovmodal.js";
import fs from "fs";
import categorymodal from "../Modals/categorymodal.js";

export const createSeaMov = async (req, res) => {
  try {
    const { name, movie, season, gerneses, dateoflaunch, category, description, tags } = req.fields;

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
      case !gerneses:
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
        // Split the tags string into an array
        const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

        const products = new seamovmodal({ ...req.fields, tags: tagArray, slug: slugify(name) });
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

export const getSeaMovid = async (req,res) =>{
  try{

    
    const getSeaMov = await seamovmodal.findById(req.params.id).select("-photo")

    res.send(getSeaMov)

  }catch(err){
    res.send(err);

  }
}

export const getSeaMovCat = async (req, res) => {
  try {
    const categoryName = req.params.category;

    // Find the corresponding category document based on the name
    const category = await categorymodal.findOne({ name: categoryName });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Use the found category's ObjectId to query the sea movies
    const getSeaMov = await seamovmodal.find({ category: category._id }).select("-photo");

    if (!getSeaMov) {
      return res.status(404).json({ message: 'No sea movies found for this category' });
    }

    res.send(getSeaMov);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const deleteSeaMov = async(req,res) =>{
    try {
        const seaMov = await seamovmodal.findByIdAndDelete(req.params.id).select("-photo");
        res.send(seaMov)
    } catch (err) {
        res.send(err);
        console.log(err)
    }

}

export const updateSeaMov = async (req, res) => {
  try {
    const { name,gerneses, movie, season, dateoflaunch, category, description, tags } = req.fields;
    const { photo } = req.files;

    const errors = [];

    if (!name) {
      errors.push("Name is required");
    }

    if (!description) {
      errors.push("Description is required");
    }

    if (!gerneses) {
      errors.push("Gernese is required");
    }

    if (!dateoflaunch) {
      errors.push("Date of launch is required");
    }

    if (!category) {
      errors.push("Category is required");
    }

    if (photo && photo.size > 10000000) {
      errors.push("Photo is required and it should not be greater than 1000");
    }

    if (errors.length > 0) {
      return res.send(errors.join(", "));
    }

    const product = await seamovmodal.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (!product) {
      console.log(`Could not find product with ID ${req.params.id}`);
      return res.send(`Could not find product with ID ${req.params.id}`);
    }

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.contentType = photo.type;
    }

    await product.save();

    res.send(product);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
