// functions/post-blogs.js
const mongoose = require('mongoose');
const BlogPost = require('../../models/BlogPost');
const { connectDB } = require('../../connection');

exports.handler = async (event) => {
            await connectDB();

            const { title, description } = JSON.parse(event.body);
            const blog = new BlogPost({ title, description });

            try {
                        await blog.save();
                        return {
                                    statusCode: 200,
                                    body: JSON.stringify({ message: 'Blog post saved successfully', blog })
                        };
            } catch (error) {
                        return {
                                    statusCode: 500,
                                    body: JSON.stringify({ message: 'Failed to save blog post', error })
                        };
            }
};
