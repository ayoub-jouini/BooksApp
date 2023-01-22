import axios from "axios";

//store all kind of data
const storeData = async (data, path) => {
  const response = await axios.post(`${process.env.BACKEND_URL}${path}`, data);
  const id = response.data.name;

  return id;
};

//update all kind of data
const updateData = (id, data, path) => {
  return axios.put(`${process.env.BACKEND_URL}${path}/${id}.json`, data);
};

//delete all kind of data
const deleteData = (id, path) => {
  return axios.delete(`${process.env.BACKEND_URL}${path}/${id}.json`);
};

//get all books
const getBooks = async () => {
  const response = await axios.get(`${process.env.BACKEND_URL}books.json`);

  const books = [];

  for (const key in response.date) {
    const book = {
      id: key,
      title: response.data[key].title,
      author: response.data[key].author,
      category: response.data[key].category,
      description: response.data[key].description,
      price: response.data[key].price,
      coverphoto: response.data[key].coverPhoto,
    };
    books.push(book);
  }

  return books;
};

//get book by id
const getBookById = async (id) => {
  const response = await axios.get(
    `${process.env.BACKEND_URL}books/${id}.json`
  );
  const book = {
    id,
    title: response.data.title,
    author: response.data.author,
    category: response.data.category,
    description: response.data.description,
    price: response.data.price,
    coverphoto: response.data.coverPhoto,
  };

  return book;
};

//get all categories
const getCategories = async () => {
  const response = await axios.get(`${process.env.BACKEND_URL}categories.json`);

  const categories = [];

  for (const key in response.date) {
    const category = {
      id: key,
      categoryName: response.data[key].categoryName,
    };
    categories.push(category);
  }

  return categories;
};

//get Category By Id
const getCategoryById = async (id) => {
  const response = await axios.get(
    `${process.env.BACKEND_URL}categories/${id}.json`
  );
  const category = {
    id,
    categoryName: response.data.categoryName,
  };

  return category;
};

//get all the reviews by book
const getReviews = async (book) => {
  const response = await axios.get(
    `${process.env.BACKEND_URL}reviews.json?idBook=${book}`
  );
  const reviews = [];
  for (const key in response.date) {
    const review = {
      id: key,
      idUser: response.data[key].idUser,
      rating: response.data[key].rating,
      review: response.data[key].review,
    };
    reviews.push(review);
  }
  return reviews;
};

//get all users
const getUsers = async () => {
  const response = await axios.get(`${process.env.BACKEND_URL}users.json`);

  const users = [];

  for (const key in response.date) {
    const user = {
      id: key,
      firstName: response.data[key].firstName,
      lastName: response.data[key].lastName,
      Email: response.data[key].email,
      avatarUrl: response.data[key].avatarUrl,
      bookmarks: response.data[key].bookmarks,
    };
    users.push(user);
  }

  return users;
};

//get user By Id
const getUserById = async (id) => {
  const response = await axios.get(
    `${process.env.BACKEND_URL}usres/${id}.json`
  );
  const category = {
    id,
    firstName: response.data.firstName,
    lastName: response.data.lastName,
    Email: response.data.email,
    avatarUrl: response.data.avatarUrl,
    bookmarks: response.data.bookmarks,
  };

  return category;
};

export {
  storeData,
  updateData,
  deleteData,
  getBooks,
  getBookById,
  getCategories,
  getCategoryById,
  getReviews,
  getUsers,
  getUserById,
};
