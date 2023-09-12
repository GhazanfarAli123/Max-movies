import slugify from "slugify";
import seamovmodal from "../Modals/seamovmodal.js";
import fs from "fs";
import categorymodal from "../Modals/categorymodal.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'; // Import the path module


export const createSeaMov = async (req, res) => {
  try {
    const { name, movie, season, gerneses, dateoflaunch, imdb , category, description, tags } = req.fields;

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
        res.send("gerneses is required");
        break;
      case !category:
        res.send("category is required");
        break;
      case !imdb:
        res.send("imdb rating is required");
        break;
      case !photo:
        res.send("photo is required");
        break;
      case photo && photo.size > 10000000:
        res.send("photo should not be greater than 1000");
        break;
        default:
          const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
          const gernesesarr = gerneses.split(',').map(gerneses => gerneses.trim()).filter(gerneses => gerneses !== '');
  
          // Generate a unique filename
          const uniqueFilename = Date.now() + '-' + photo.originalname;
  
          // Get the directory path of the current module
          const currentFileURL = import.meta.url;
          const currentFilePath = fileURLToPath(currentFileURL);
          const uploadDir = path.join(dirname(currentFilePath), '../uploads'); // Use path.join with dirname
  
          // Create the 'uploads' directory if it doesn't exist
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
          }
  
          const imagePath = path.join(uploadDir, uniqueFilename); // Define the path to save the image
  
          // Move the uploaded file to the specified path
          await fs.promises.rename(photo.path, imagePath);
  
          // Create a new seamovmodal instance with the image path
          const products = new seamovmodal({ ...req.fields, tags: tagArray, gerneses: gernesesarr, slug: slugify(name), imagePath: uniqueFilename });
  
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
    const seamov = await seamovmodal.findById(req.params.id);

    if (!seamov) {
      return res.status(404).json({ message: 'Sea movie not found' });
    }

    const imagePath = path.join(__dirname, '../uploads', seamov.imagePath);
    
    // Set the appropriate Content-Type header for the image
    const contentType = 'image/jpeg'; // Set the content type based on your image format

    // Send the image as a response
    res.setHeader('Content-Type', contentType);
    res.sendFile(imagePath);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


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
