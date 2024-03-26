import React, { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi2";
import toast, { Toaster } from "react-hot-toast";
import axios, { Axios } from "axios";
import { usePost } from "../Context";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { post, setPost } = usePost();
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [selected, setSelected] = useState(false);


  useEffect(() => {
    return () => {
      setUpdate(true);
    };
  });

  useEffect(() => {
    getPost();
  }, [post]);

  const getPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/get-blogs`);
      const data = await response.data;
      setPost(data.blog);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/delete-blog/${id}`
      );

      if (response.status === 200) toast.success(`Deleted Blog Successfully!`);
      if (post.length === 1) {
        toast.success("All blogs are deleted", {
          icon: "😒"
        })

        setTimeout(() => {

          navigate("/createBlog")
        }, 1000)

      }
    } catch (error) {
      console.log(`Error  deleting blog ${id}:`, error);
      toast.error(`Failed to Delete`);
    }
  };

  const updatePost = (id) => { };

  const updateBlog = async (id) => {
    console.log(id, "update")
    try {
      const response = await axios.put(
        `http://localhost:5000/update-blog/${id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full h-screen">
        <div className="mt-10" >
          {post.map((post) => (
            <div
              key={post._id}
              className=" text transition-all w-[45vw] bg-slate-100 mb-4 border border-black/15 rounded-lg  m-auto p-3 shadow-lg "
            >
              <div className="flex justify-end my-2 gap-2 text-black/60 text-2xl">
                <AiFillDelete
                  className="cursor-pointer"
                  onClick={() => deleteBlog(post._id)}
                />
                <HiOutlinePencil
                  className="cursor-pointer"
                  onClick={() => {
                    setUpdate(!update);
                    setSelected(post._id);
                  }}
                />
              </div>

              <h2
                className="font-bold text-lg mb-2"
                contentEditable={`${selected === post._id ? "true" : "false"}`}
              >
                {post.title}
              </h2>
              <p contentEditable={`${""}`}>{post.description}</p>

              <button
                className={` ${selected === post._id && update ? "block" : "hidden"
                  } transition-all bg-violet-500 px-2 
            py-1 rounded-md text-white  `}
                onClick={() => updatePost(post._id)}
              >
                Save
              </button>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default Home;
