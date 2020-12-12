const Joi = require('joi');

const { dbCon } = require('../configuration')

class Comment {
    constructor(commentData) {
        this.data = commentData;
        this.data.createAt = new Date();
        this.data.modifiedAt = new Date();
    }

    static validate(commentText) {
        const validation = Joi.string().max(300).validate(commentText);

        if (validation.error) {
            const error = new Error(validation.error.message);
            error.statusCode = 400;
            return error;
        };

        return null;
    }

    save() {
        return new Promise((resolve, reject) => {
            dbCon('comments', async(db) => {
                try {
                    await db.insertOne(this.data);
                    resolve();
                } catch (err) {
                    reject(err);
                };
            });
        });
    };
}

module.exports = Comment;