const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {}

// create fields/columns for Post model //
Post.init(
    {
        //id column as the primary key and set it to auto-increment
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // title column as a String value
        title: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        //defined as a String
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            // url is a verified link by setting the isURL property to true.
            validate: {
                isURL: true
            }
        },
        // determines who posted the news article // ~ foreign key and will be the matching link.
        user_id: {
            type: DataTypes.INTEGER,
            // relationship is established between post and the user 
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    // configure the metadata
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;