const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const connectDB = require("./connection");
const BlogPost = require("./models/BlogPost");

connectDB();

// Middleware

app.use(express.json());
app.use(cors());

// Routes

app.post("/post-blogs", async (req, res) => {
  const blog = new BlogPost({
    title: req.body.title,
    description: req.body.description,
  });

  await blog.save();
  res.json({ message: `Blog post saved successfully`, blog });
});

app.get("/get-blogs", async (req, res) => {
  const blog = await BlogPost.find();
  if (!blog) res.status(404).json({ message: `No blogs found` });
  res.json({ blog });
});

app.delete("/delete-blog/:id", async (req, res) => {
  const blog = await BlogPost.findByIdAndDelete(req.params.id);

  if (!blog) res.status(404).json({ message: `No blog found` });
  res.status(200).json({ message: `Message deleted successfull!` });
});

app.put(`/update-blog/:id`, async (req, res) => {
  const blog = await BlogPost.findByIdAndUpdate(req.params.id);
  if (!blog) res.status(404).json({ message: `No Blog found` });

  const { title, description } = req.body;



  if (!title && !description)
    res.json({ message: `Please enter title or description` });
  if (!title) blog.description = description;
  if (!description) blog.title = title;
  else {
    blog.title = title;
    blog.description = description;
  }

  await blog.save();
  res.status(200).json({ message: `Blog updated successfully` });
});

// listen

app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Server failed to start:", err);
  });
