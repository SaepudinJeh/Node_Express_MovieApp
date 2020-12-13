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
    };

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

    static edit(commentId, text) {
        return new Promise((resolve, reject) => {
            dbCon('comments', async (db) => {
                try {
                    await db.updateOne({_id:commentId}, { '$set': {text}, '$currentDate': {modifiedAt:true} });
                    resolve()
                } catch (err) {
                    reject(err)
                }
            });
        });
    }

    static delete(commentId) {
        return new Promise((resolve, reject) => {
            dbCon('comments', async (db) => {

                try {
                    await db.deleteOne({_id:commentId});
                    resolve();
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
}

module.exports = Comment;