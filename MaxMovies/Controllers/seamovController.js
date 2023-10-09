import slugify from "slugify";
import seamovmodal from "../Modals/seamovmodal.js";
import fs from "fs";
import categorymodal from "../Modals/categorymodal.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'; 



export const createSeaMov = async (req, res) => {
  try {
    const { name, movie, season, gerneses, dateoflaunch, imdb, category, description, tags, countries } = req.fields;

    if (!req.files || !req.files.photo) {
      return res.status(400).send("photo is required");
    }

    const { photo } = req.files;

    if (!name || !description || !gerneses || !category || !imdb || !countries) {
      return res.status(400).send("Please fill in all required fields.");
    }

    if (photo.size > 10000000) {
      return res.status(400).send("photo should not be greater than 1000");
    }

    const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    const gernesesarr = gerneses.split(',').map(gerneses => gerneses.trim()).filter(gerneses => gerneses !== '');
    const seasonsArray = season.split(',').map(season => season.trim()).filter(season => season !== '');

    // Check if 'seasonsArray' is empty and set it to null if it is
    const seasonValue = seasonsArray.length > 0 ? seasonsArray : null;

    // Generate a unique filename
    const uniqueFilename = Date.now() + '-' + name;

    // Get the directory path of the current module
    const currentFileURL = import.meta.url;
    const currentFilePath = fileURLToPath(currentFileURL);
    const uploadDir = path.join(path.dirname(currentFilePath), '../uploads'); // Use path.join with dirnames

    // Create the 'uploads' directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const imagePath = path.join(uploadDir, uniqueFilename); // Define the path to save the image

    // Move the uploaded file to the specified path
    await fs.promises.rename(photo.path, imagePath);

    // Create a new seamovmodal instance with the image path
    const seamov = new seamovmodal({
      name,
      movie,
      season: seasonValue,
      gerneses: gernesesarr,
      dateoflaunch,
      imdb,
      category,
      description,
      tags: tagArray,
      countries,
      slug: slugify(name),
      imagePath: uniqueFilename,
    });

    await seamov.save();
    res.status(201).send(seamov);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const getSeaMovPhoto = async (req, res) => {
  try {
    const seamov = await seamovmodal.findById(req.params.id);

    if (!seamov) {
      return res.status(404).json({ message: 'Sea movie not found' });
    }

    // Use import.meta.url to get the current module's URL
    const currentFileURL = import.meta.url;

    // Convert the module's URL to a file path
    const currentFilePath = fileURLToPath(currentFileURL);

    // Derive the directory name from the file path
    const directoryName = dirname(currentFilePath);

    console.log('Directory Name:', directoryName); // Log the directory name for debugging

    const imagePath = path.join(directoryName, '../uploads', seamov.imagePath);
    const contentType = 'image/jpeg';


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


export const deleteSeaMov = async (req, res) => {
  try {
    // Find the sea movie by its ID and delete it
    const deletedSeaMov = await seamovmodal.findByIdAndDelete(req.params.id);

    if (!deletedSeaMov) {
      return res.status(404).json({ message: 'Sea movie not found' });
    }

    // Check if the sea movie had an associated image (defined by `imagePath`)
    if (deletedSeaMov.imagePath) {
      // Use import.meta.url to get the current module's URL
      const currentFileURL = import.meta.url;

      // Convert the module's URL to a file path
      const currentFilePath = fileURLToPath(currentFileURL);

      // Derive the directory name from the file path
      const directoryName = dirname(currentFilePath);

      const imagePath = path.join(directoryName, '../uploads', deletedSeaMov.imagePath);

      // Check if the image file exists before attempting to delete it
      if (fs.existsSync(imagePath)) {
        // Delete the associated image file
        await fs.promises.unlink(imagePath);
      }
    }

    res.send(deletedSeaMov);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};



export const updateSeaMov = async (req, res) => {
  try {
    const { name, gerneses, movie, season, dateoflaunch, category, description, tags } = req.fields;
    const { photo } = req.files;

    // Check if 'req.files' exists and if 'photo' is present
    if (photo && photo.size > 10000000) {
      return res.send("Photo should not be greater than 1000");
    }

    // Find the existing sea movie by ID
    const existingSeaMov = await seamovmodal.findById(req.params.id);

    if (!existingSeaMov) {
      return res.status(404).json({ message: 'Sea movie not found' });
    }

    // Update the sea movie fields with the new values
    existingSeaMov.name = name || existingSeaMov.name;
    existingSeaMov.gerneses = gerneses || existingSeaMov.gerneses;
    existingSeaMov.movie = movie || existingSeaMov.movie;
    existingSeaMov.season = season || existingSeaMov.season;
    existingSeaMov.dateoflaunch = dateoflaunch || existingSeaMov.dateoflaunch;
    existingSeaMov.category = category || existingSeaMov.category;
    existingSeaMov.description = description || existingSeaMov.description;
    existingSeaMov.tags = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : existingSeaMov.tags;
    existingSeaMov.gerneses = gerneses ? gerneses.split(',').map(gerneses => gerneses.trim()).filter(gerneses => gerneses !== '') : existingSeaMov.gerneses;
    existingSeaMov.season = season ? season.split(',').map(season => season.trim()).filter(season => season !== '') : existingSeaMov.season;

    // If a new photo is uploaded, update the imagePath
    if (photo) {
      const uniqueFilename = Date.now() + '-' + photo.originalname;
      const currentFileURL = import.meta.url;
      const currentFilePath = fileURLToPath(currentFileURL);
      const uploadDir = path.join(dirname(currentFilePath), '../uploads');
      const imagePath = path.join(uploadDir, uniqueFilename);

      // Move the uploaded file to the specified path
      await fs.promises.rename(photo.path, imagePath);

      existingSeaMov.imagePath = uniqueFilename;
    }

    // Save the updated sea movie
    await existingSeaMov.save();

    res.send(existingSeaMov);
  } catch (err) {
    res.send(err);
  }
};

export const seamovCount = async(req , res) =>{
try{
  const total = await seamovmodal.find({}).estimatedDocumentCount()
  res.status(200).send({
    total
  })
}catch(err){
  console.log(err)
}
}

export const searchSeamov = async(req , res) =>{
  try{
    const {keyword , category} = req.params
    const result = await seamovmodal.find({
      $and:[
        {
          $or:[
            {name : {$regex:keyword,$options:"i"}},
            {description : {$regex:keyword,$options:"i"}}
          ]
        },
        {category:category}
      ]
    })
    .select("-imagePath")
    console.log(result)
    res.send(result)

  }catch(err){
    console.log(err)
  }
}
