import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p11.jpeg",
    likes: ""
  },
  {
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@example.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p11.jpeg"
  },
  {
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@example.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p11.jpeg"
  },
  {
    firstName: "Sarah",
    lastName: "Wilson",
    email: "sarah.wilson@example.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p11.jpeg"
  },
  {
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@example.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p11.jpeg"
  },
  {
    firstName: "Emily",
    lastName: "Anderson",
    email: "emily.anderson@example.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p11.jpeg"
  },
  {
    firstName: "James",
    lastName: "Martinez",
    email: "james.martinez@example.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p11.jpeg"
  },
  {
    firstName: "Olivia",
    lastName: "Garcia",
    email: "olivia.garcia@example.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p11.jpeg"
  },
];



export const ingredients = [
  {
    name: "Tomato",
    description: "Fresh and ripe tomatoes",
    otherDetails: "Variety: Roma",
    categoryName: "Vegetable",
    imagePath: "ingredient1.jpg"
  },
  {
    name: "Chicken Breast",
    description: "Boneless and skinless chicken breast",
    otherDetails: "Weight: 200g",
    categoryName: "Meat",
    imagePath: "ingredient2.jpg"
  },
  {
    name: "Onion",
    description: "White onion",
    otherDetails: "Quantity: 1",
    categoryName: "Vegetable",
    imagePath: "ingredient3.jpg"
  },
  {
    name: "Pasta",
    description: "Italian pasta",
    otherDetails: "Type: Spaghetti",
    categoryName: "Grain",
    imagePath: "ingredient4.jpg"
  },
  {
    name: "Bell Pepper",
    description: "Colorful bell peppers",
    otherDetails: "Variety: Mixed",
    categoryName: "Vegetable",
    imagePath: "ingredient5.jpg"
  },
  {
    name: "Salmon Fillet",
    description: "Fresh salmon fillet",
    otherDetails: "Weight: 150g",
    categoryName: "Seafood",
    imagePath: "ingredient6.jpg"
  },
  {
    name: "Garlic",
    description: "Fresh garlic cloves",
    otherDetails: "Quantity: 5 cloves",
    categoryName: "Vegetable",
    imagePath: "ingredient7.jpg"
  },
  {
    name: "Mushrooms",
    description: "Sliced mushrooms",
    otherDetails: "Type: Cremini",
    categoryName: "Vegetable",
    imagePath: "ingredient8.jpg"
  },
];

export const recipes = [
  {
    recipeName: "Caprese Salad",
    description: "A classic Italian salad with fresh tomatoes, mozzarella, and basil.",
    otherDetails: "Vegetarian",
    preparationSteps: "1. Slice tomatoes and mozzarella.\n2. Arrange on a plate with basil leaves.\n3. Drizzle with olive oil and balsamic glaze.",
    imagePath: "recipe1.jpg",
    cookingTime: 15,
    servings: 2,
    ingredientList: [
        "Tomato",
        "Mozzarella",
        "Basil"
    ]
},
{
    recipeName: "Chicken Alfredo Pasta",
    description: "Creamy chicken Alfredo pasta with a rich white sauce.",
    otherDetails: "Main Course",
    preparationSteps: "1. Cook pasta al dente.\n2. Saute chicken until cooked.\n3. Prepare Alfredo sauce and combine with cooked chicken and pasta.",
    imagePath: "recipe2.jpg",
    cookingTime: 30,
    servings: 4,
    ingredientList: [
        "Chicken Breast",
        "Pasta",
        "Garlic",
        "Cream"
    ]
},
{
    recipeName: "Stuffed Bell Peppers",
    description: "Bell peppers stuffed with a flavorful mix of ground meat and rice.",
    otherDetails: "Main Course",
    preparationSteps: "1. Cook rice and mix with browned meat and spices.\n2. Stuff bell peppers with the mixture and bake.",
    imagePath: "recipe3.jpg",
    cookingTime: 45,
    servings: 4,
    ingredientList: [
        "Bell Pepper",
        "Ground Beef",
        "Rice"
    ]
},
{
    recipeName: "Salmon with Lemon Butter",
    description: "Pan-seared salmon with a delicious lemon butter sauce.",
    otherDetails: "Seafood",
    preparationSteps: "1. Season salmon with salt and pepper.\n2. Pan-sear in butter until crispy.\n3. Prepare lemon butter sauce and drizzle over salmon.",
    imagePath: "recipe4.jpg",
    cookingTime: 20,
    servings: 2,
    ingredientList: [
        "Salmon Fillet",
        "Butter",
        "Lemon"
    ]
},
{
    recipeName: "Mushroom Risotto",
    description: "Creamy mushroom risotto with Arborio rice and Parmesan cheese.",
    otherDetails: "Vegetarian",
    preparationSteps: "1. Saute mushrooms and onions.\n2. Add Arborio rice and gradually add vegetable broth while stirring.\n3. Stir in Parmesan cheese.",
    imagePath: "recipe5.jpg",
    cookingTime: 35,
    servings: 4,
    ingredientList: [
        "Mushrooms",
        "Onion",
        "Arborio Rice"
    ]
},
];

export const categories = [
  {
    name: "Vegetable",
    description: "Fresh and healthy vegetables.",
    otherDetails: "Various types of fresh produce.",
    imagePath: "category1.jpg"
  },
  {
    name: "Meat",
    description: "High-quality meat products.",
    otherDetails: "Variety of cuts and options.",
    imagePath: "category2.jpg"
  },
  {
    name: "Grain",
    description: "Wholesome grains and cereals.",
    otherDetails: "Rich in fiber and nutrients.",
    imagePath: "category3.jpg"
  },
  {
    name: "Seafood",
    description: "Fresh and delicious seafood.",
    otherDetails: "Sustainably sourced varieties.",
    imagePath: "category4.jpg"
  },
  {
    name: "Dairy",
    description: "Dairy products and alternatives.",
    otherDetails: "Milk, cheese, and more.",
    imagePath: "category5.jpg"
  },
  {
    name: "Fruit",
    description: "Sweet and juicy fruits.",
    otherDetails: "Seasonal and exotic options.",
    imagePath: "category6.jpg"
  },
  {
    name: "Spices",
    description: "Aromatic and flavorful spices.",
    otherDetails: "Enhance the taste of your dishes.",
    imagePath: "category7.jpg"
  },
  {
    name: "Bakery",
    description: "Freshly baked bread and pastries.",
    otherDetails: "Crusty and delicious options.",
    imagePath: "category8.jpg"
  },
];