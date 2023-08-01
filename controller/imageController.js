const asyncWrapper = require("../middleware/asyncWrapper")
const Image = require("../models/image")
const path = require("path");


const getImage = async(req, res)=>{
  try {
      const response = await Image.find();
      res.json(response);
  } catch (error) {
      console.log(error.message);
  }
}

const getImageById = async(req, res)=>{
  try {
      const response = await Image.findOne({
          where:{
              id : req.params.id
          }
      });
      res.json(response);
  } catch (error) {
      console.log(error.message);
  }
}


const download = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const item = await Image.findById(id);
  if (!item) {
    return next(new Error("No item found"));
  }
  const files = item.file;
  const filePath = path.join(__dirname, `../public/images/${files}`);
  res.download(filePath);
});

const singleUploadFile = asyncWrapper(async (req, res, next) => {
    const { title } = req.body;
    const file = req.file.filename;
    const url = `http://localhost:8080/images/${req.file.filename}`
    const { type } = req.body;
    const item = await Image.create({ title, file, url, type});
    res.status(201).json({ item });
    });

const imageSearch = async (req, res) => {
        const search = req.query.search;
        if (typeof search === "string" && search !== "") {
          const image = await Image.find({
            title: { $regex: search, $options: "i" },
          }).limit(10);
          const result = { image };
          res.status(200).send(result);
        } else {
          res.status(200).send({});
        }
      };
      

module.exports = {
  download,
  singleUploadFile,
  getImage,
  getImageById,
  imageSearch,
};