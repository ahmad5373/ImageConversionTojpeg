const express = require("express");
const app = express();
const jimp = require("jimp");
const PORT = 3000;
const multer = require("multer");
const path = require("path");


const storage = multer.memoryStorage()
const upload = multer({ storage: storage }); //upload file using multer
app.post("/convert", upload.single('image'), async (req, res) => {
    // console.log("file " ,req.file);
    try {
        if (!req.file) {
            res.status(400).send("File Not Found please check again");
            return;
        }
        console.log("body file " , req.file)
        const buffer = req.file.buffer;
        const image = await jimp.read(buffer)
        // console.log("images", image)
        const outputPath = path.join(__dirname, "output", 'output.jpeg')
        await image.writeAsync(outputPath) // Convert image to  jpg and save it
        res.sendFile(outputPath)

    } catch (error) {
        console.log("error", error)
        res.status(500).send("internal Server Error")
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})