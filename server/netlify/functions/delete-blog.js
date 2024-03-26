// functions/delete-blog.js
const mongoose = require('mongoose');
const BlogPost = require('../../models/BlogPost');
const { connectDB } = require('../../connection');

exports.handler = async (event) => {
            await connectDB();

            const { id } = event.queryStringParameters;

            try {
                        const blog = await BlogPost.findByIdAndDelete(id);
                        if (!blog) {
                                    return {
                                                statusCode: 404,
                                                body: JSON.stringify({ message: 'No blog found' })
                                    };
                        }
                        return {
                                    statusCode: 200,
                                    body: JSON.stringify({ message: 'Blog deleted successfully' })
                        };
            } catch (error) {
                        return {
                                    statusCode: 500,
                                    body: JSON.stringify({ message: 'Failed to delete blog', error })
                        };
            }
};
