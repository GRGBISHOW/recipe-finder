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
    firstName: "test",
    lastName: "me",
    email: "aaaaaaa@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p11.jpeg",
  },
  {
    firstName: "Steve",
    lastName: "Ralph",
    email: "thataaa@gmail.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p3.jpeg",
    
  },
  {
    firstName: "Some",
    lastName: "Guy",
    email: "someguy@gmail.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    imagePath: "p4.jpeg",
    
  },
  {
    firstName: "Whatcha",
    lastName: "Doing",
    email: "whatchadoing@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p6.jpeg",
    
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p5.jpeg",
    
  },
  {
    firstName: "Harvey",
    lastName: "Dunn",
    email: "harveydunn@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p7.jpeg",
    
  },
  {
    firstName: "Carly",
    lastName: "Vowel",
    email: "carlyvowel@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p8.jpeg",
    
  },
  {
    firstName: "Jessica",
    lastName: "Dunn",
    email: "jessicadunn@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p9.jpeg",
    
  },
];



export const ingredients = [
  {
    name: "test",
    description: "me",
    otherDetails: "aaaaaaa@gmail.com",
    categoryName: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p11.jpeg",
  },
  {
    name: "Steve",
    description: "Ralph",
    otherDetails: "thataaa@gmail.com",
    categoryName: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p3.jpeg",
    
  },
  {
    name: "Some",
    description: "Guy",
    otherDetails: "someguy@gmail.com",
    categoryName: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    imagePath: "p4.jpeg",
    
  },
  {
    name: "Whatcha",
    description: "Doing",
    otherDetails: "whatchadoing@gmail.com",
    categoryName: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p6.jpeg",
    
  },
  {
    name: "Jane",
    description: "Doe",
    otherDetails: "janedoe@gmail.com",
    categoryName: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p5.jpeg",
    
  },
  {
    name: "Harvey",
    description: "Dunn",
    otherDetails: "harveydunn@gmail.com",
    categoryName: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p7.jpeg",
    
  },
  {
    name: "Carly",
    description: "Vowel",
    otherDetails: "carlyvowel@gmail.com",
    categoryName: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p8.jpeg",
    
  },
  {
    name: "Jessica",
    description: "Dunn",
    otherDetails: "jessicadunn@gmail.com",
    categoryName: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p9.jpeg",
    
  },
];

export const recipes = [
  {
    recipeName: "test",
    description: "me",
    otherDetails: "aaaaaaa@gmail.com",
    preparationSteps: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p11.jpeg",
    cookingTime: 22,
    servings: 2,
    ingredientList: [],
  },
  {
    recipeName: "Steve",
    description: "Ralph",
    otherDetails: "thataaa@gmail.com",
    preparationSteps: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p3.jpeg",
    cookingTime: 22,
    servings: 2,
    ingredientList: [],
  },
  {
    recipeName: "Some",
    description: "Guy",
    otherDetails: "someguy@gmail.com",
    preparationSteps: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    imagePath: "p4.jpeg",
    cookingTime: 22,
    servings: 2,
    ingredientList: [],
  },
  {
    recipeName: "Whatcha",
    description: "Doing",
    otherDetails: "whatchadoing@gmail.com",
    preparationSteps: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p6.jpeg",
    cookingTime: 22,
    servings: 2,
    ingredientList: [],
  },
  {
    recipeName: "Jane",
    description: "Doe",
    otherDetails: "janedoe@gmail.com",
    preparationSteps: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p5.jpeg",
    cookingTime: 22,
    servings: 2,
    ingredientList: [],
  },
  {
    recipeName: "Harvey",
    description: "Dunn",
    otherDetails: "harveydunn@gmail.com",
    preparationSteps: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p7.jpeg",
    cookingTime: 22,
    servings: 2,
    ingredientList: [],
  },
  {
    recipeName: "Carly",
    description: "Vowel",
    otherDetails: "carlyvowel@gmail.com",
    preparationSteps: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p8.jpeg",
    cookingTime: 22,
    servings: 2,
    ingredientList: [],
  },
  {
    recipeName: "Jessica",
    description: "Dunn",
    otherDetails: "jessicadunn@gmail.com",
    preparationSteps: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p9.jpeg",
    cookingTime: 22,
    servings: 2,
    ingredientList: [],
  },
];

export const categories = [
  {
    name: "test",
    description: "me",
    otherDetails: "aaaaaaa@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p11.jpeg",
  },
  {
    name: "Steve",
    description: "Ralph",
    otherDetails: "thataaa@gmail.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p3.jpeg",
    
  },
  {
    name: "Some",
    description: "Guy",
    otherDetails: "someguy@gmail.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    imagePath: "p4.jpeg",
    
  },
  {
    name: "Whatcha",
    description: "Doing",
    otherDetails: "whatchadoing@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p6.jpeg",
    
  },
  {
    name: "Jane",
    description: "Doe",
    otherDetails: "janedoe@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p5.jpeg",
    
  },
  {
    name: "Harvey",
    description: "Dunn",
    otherDetails: "harveydunn@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p7.jpeg",
    
  },
  {
    name: "Carly",
    description: "Vowel",
    otherDetails: "carlyvowel@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p8.jpeg",
    
  },
  {
    name: "Jessica",
    description: "Dunn",
    otherDetails: "jessicadunn@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    imagePath: "p9.jpeg",
    
  },
];