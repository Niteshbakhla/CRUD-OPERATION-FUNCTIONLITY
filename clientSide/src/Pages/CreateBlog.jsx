import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { usePost } from "../Context";

const CreateBlog = () => {
  const navigate = useNavigate();
  const { post } = usePost();
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { title, description } = formData;



    if (!title && !description) {
      return toast.error(`Enter both fields`);
    }
    if (!title) {
      return toast.error("Title is required");
    }
    if (!description) {
      return toast.error("Description is required");
    }
    if (post.length === 0) {
      toast.success(`Congrats for your first blog`, {
        icon: "👍"
      })
    }

    if (title && description) {
      try {
        const response = await axios.post(
          "http://localhost:5000/post-blogs",
          formData
        );

        if (response.status === 200) {
          toast.success(`Blog posted successfully`);
          setFormData({ title: "", description: "" });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (error) {
        toast.error("An error occurred while posting the blog");
        console.error("Error posting blog:", error);
      }
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <div className="w-[90vw] lg:w-[60vw] m-auto mt-10 ">
        <h1 className="text-xl font-bold text-center">Create Blog</h1>
        <form className="flex flex-col gap-2" onSubmit={postData}>
          <label htmlFor="title" className="font-semibold">
            Title:
          </label>
          <input
            className="px-3 py-3 border-2 font-semibold rounded-lg border-gray-300 outline-none"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter the blog title"
          />
          <label htmlFor="description" className="font-semibold">
            Description:
          </label>
          <textarea
            className="px-3 py-3 border-2 font-semibold rounded-lg border-gray-300 outline-none"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            cols="30"
            rows="10"
            placeholder="Enter the blog description"
          ></textarea>

          <button className="bg-violet-600 rounded-md py-2 text-white font-semibold active:bg-violet-800">
            Post
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
