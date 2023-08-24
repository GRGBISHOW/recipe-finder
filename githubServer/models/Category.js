import mongoose from "mongoose"

const categorySchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            max: 50,
        },
        description:{
            type: String,
            required: true,
            max: 500,
        },
        otherDetails:{
            type: Array,
            default: [],
        },
    }
);

const Category = mongoose.model( "category", categorySchema);

export default Category;