'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model{}
  Book.init({
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING, 
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title is required',
        },
        notEmpty: {
          msg: 'Title is required',
        }
      }
    },
    author: {
      type: Sequelize.STRING, 
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Author is required',
        },
        notEmpty: {
          msg: 'Author is required',
        }
      }
    },
    genre: {
      type: Sequelize.STRING,
    },
    year: {
      type: Sequelize.INTEGER
    }
  }, { sequelize });

  return Book;
}