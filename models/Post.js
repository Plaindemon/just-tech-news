const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {
    // JavaScript's built-in static keyword to indicate that the upvote method is one that's based on the Post model and not an instance method like we used earlier with the User model
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        }).then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id', 
                    'post_url', 
                    'title', 
                    'created_at', 
                    [
                    sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
                    'vote_count'
                    ]
                 ]
            });
        });
    }
}

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