import axios from 'axios';

//store all kind of data
const storeData = async (data, path, token) => {
  let response;
  try {
    response = await axios.post(
      `https://booksapp-e033f-default-rtdb.europe-west1.firebasedatabase.app/${path}.json?auth=${token}`,
      data
    );
  } catch (err) {
    console.log(err);
  }
  const id = response.data.name;

  return id;
};

//update all kind of data
const updateData = (id, data, path, token) => {
  return axios.put(
    `${process.env.BACKEND_URL}${path}/${id}.json?auth=${token}`,
    data
  );
};

//delete all kind of data
const deleteData = (id, path, token) => {
  return axios.delete(
    `${process.env.BACKEND_URL}${path}/${id}.json?auth=${token}`
  );
};

//get all books
const getBooks = async (token) => {
  let response;
  try {
    response = await axios.get(
      `https://booksapp-e033f-default-rtdb.europe-west1.firebasedatabase.app/books.json?auth=${token}`
    );
  } catch (err) {
    console.log(err);
  }
  const books = [];

  for (let key in response.data) {
    const book = {
      id: key,
      bookName: response.data[key].bookName,
      author: response.data[key].author,
      category: response.data[key].category,
      description: response.data[key].description,
      price: response.data[key].price,
      image: response.data[key].image,
      rate: response.data[key].rate,
    };
    books.push(book);
  }
  return books;
};

//get book by id
const getBookById = async (id, token) => {
  const response = await axios.get(
    `https://booksapp-e033f-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json?auth=${token}`
  );
  const book = {
    id,
    bookName: response.data.bookName,
    author: response.data.author,
    category: response.data.category,
    description: response.data.description,
    price: response.data.price,
    image: response.data.image,
    rate: response.data.rate,
  };

  return book;
};

//get books By Category
const getBookByCategory = async (category, token) => {
  let response;
  try {
    response = await axios.get(
      `https://booksapp-e033f-default-rtdb.europe-west1.firebasedatabase.app/categories/${category}.json?auth=${token}`
    );
  } catch (err) {
    console.log(err);
  }
  const books = [];
  const name = response.data.name;
  const image = response.data.image;
  console.log(name);

  for (let key in response.data.books) {
    const book = {
      id: key,
      bookName: response.data.books[key].bookName,
      author: response.data.books[key].author,
      category: response.data.books[key].category,
      description: response.data.books[key].description,
      price: response.data.books[key].price,
      image: response.data.books[key].image,
      rate: response.data.books[key].rate,
    };
    books.push(book);
  }
  return { books, image, name };
};

//get all categories
const getCategories = async (token) => {
  let response;
  try {
    response = await axios.get(
      `https://booksapp-e033f-default-rtdb.europe-west1.firebasedatabase.app/categories.json?auth=${token}`
    );
  } catch (err) {
    console.log(err);
  }
  const categories = [];

  for (let key in response.data) {
    const category = {
      id: key,
      image: response.data[key].image,
      name: response.data[key].name,
    };
    categories.push(category);
  }
  return categories;
};

//get Category By Id
const getCategoryById = async (id, token) => {
  const response = await axios.get(
    `${process.env.BACKEND_URL}categories/${id}.json?auth=${token}`
  );
  const category = {
    id,
    categoryName: response.data.categoryName,
  };

  return category;
};

//get all the reviews by book
const getReviews = async (book, token) => {
  const response = await axios.get(
    `${process.env.BACKEND_URL}reviews.json?idBook=${book}&auth=${token}`
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
const getUsers = async (token) => {
  const response = await axios.get(
    `${process.env.BACKEND_URL}users.json?auth=${token}`
  );

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
const getUserById = async (id, token) => {
  const response = await axios.get(
    `${process.env.BACKEND_URL}usres/${id}.json?auth=${token}`
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
  getBookByCategory,
  getCategories,
  getCategoryById,
  getReviews,
  getUsers,
  getUserById,
};
