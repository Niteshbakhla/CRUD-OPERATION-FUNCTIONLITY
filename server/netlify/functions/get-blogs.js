// functions/get-blogs.js
const mongoose = require('mongoose');
const BlogPost = require('../../models/BlogPost');
const { connectDB } = require('../../connection');

exports.handler = async () => {
            await connectDB();

            try {
                        const blogs = await BlogPost.find();
                        return {
                                    statusCode: 200,
                                    body: JSON.stringify({ blogs })
                        };
            } catch (error) {
                        return {
                                    statusCode: 500,
                                    body: JSON.stringify({ message: 'Failed to get blogs', error })
                        };
            }
};
