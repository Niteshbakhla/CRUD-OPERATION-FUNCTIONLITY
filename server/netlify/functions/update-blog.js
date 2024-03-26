// functions/update-blog.js
const mongoose = require('mongoose');
const BlogPost = require('../../models/BlogPost');
const { connectDB } = require('../../connection');

exports.handler = async (event) => {
            await connectDB();

            const { id } = event.queryStringParameters;
            const { title, description } = JSON.parse(event.body);

            try {
                        const blog = await BlogPost.findById(id);
                        if (!blog) {
                                    return {
                                                statusCode: 404,
                                                body: JSON.stringify({ message: 'No blog found' })
                                    };
                        }

                        blog.title = title || blog.title;
                        blog.description = description || blog.description;
                        await blog.save();

                        return {
                                    statusCode: 200,
                                    body: JSON.stringify({ message: 'Blog updated successfully', blog })
                        };
            } catch (error) {
                        return {
                                    statusCode: 500,
                                    body: JSON.stringify({ message: 'Failed to update blog', error })
                        };
            }
};
