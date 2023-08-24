import mongoose from "mongoose"

const ingredientsSchema = mongoose.Schema(
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
        imagePath: {
            type: String,
            default: "",
        },
        categoryName:{
            type: String,
            required: true,
        },
        otherDetails:{
            type: Array,
            default: [],
        },
    }
);

const Ingredients = mongoose.model( "ingredients", ingredientsSchema);

export default Ingredients;