const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully");

        app.listen(process.env.PORT, () => {
            console.log("Server running on port " + process.env.PORT);
        });
    })
    .catch((error) => {
        console.log("MongoDB Connection Failed:", error);
    });


// CREATE
app.post("/sections", async (req, res) => {
    try {
        const section = await mongoose.connection.db
            .collection("Section")
            .insertOne(req.body);

        res.status(201).json(section);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// READ ALL
app.get("/sections", async (req, res) => {
    try {
        const sections = await mongoose.connection.db
            .collection("Section")
            .find({})
            .toArray();

        console.log("Total documents found:", sections.length);

        res.json(sections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// READ BY ID
app.get("/sections/:id", async (req, res) => {
    try {
        const section = await mongoose.connection.db
            .collection("Section")
            .findOne({ sectionId: Number(req.params.id) });

        if (!section) {
            return res.status(404).json({ message: "Section not found" });
        }

        res.json(section);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// UPDATE
app.put("/sections/:id", async (req, res) => {
    try {
        const result = await mongoose.connection.db
            .collection("Section")
            .updateOne(
                { sectionId: Number(req.params.id) },
                { $set: req.body }
            );

        res.json({
            message: "Section updated successfully",
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// DELETE
app.delete("/sections/:id", async (req, res) => {
    try {
        const result = await mongoose.connection.db
            .collection("Section")
            .deleteOne({ sectionId: Number(req.params.id) });

        res.json({
            message: "Section deleted successfully",
            deletedCount: result.deletedCount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});