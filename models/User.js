const { dbCon } = require('../configuration');

const { userValidator } = require('../validators');

class User {
    constructor(userData) {
        this.userData = { ...userData };
    };
    

    save(cb) {
        dbCon('users', async (db) => {
            try {
                await db.insertOne(this.userData);
                cb()
            } catch (err) {
                cb(err)
            }
        })
    };

    checkExistence() {
        return new Promise((resolve, reject) => {
            dbCon('users', async (db) => {
                try {
                    const user = await db.findOne({'$or': [{username: this.userData['username']}, {email: this.userData['email']}]});

                    if(!user) {
                        resolve({
                            check: false
                        })
                    } else if(this.userData['username'] === user.username) {
                        resolve({
                            check: true,
                            message: 'This username is already in use'
                        })
                    } else if(this.userData['email'] === user.email) {
                            resolve({
                                check: true,
                                message: 'This email is already in use'
                            })
                    }
                } catch (err) {
                    reject(err);
                }
            })
        })
    }

    static validate(userData) {
        return userValidator.validate(userData);
    }
};


// const user = new User({
//     username: 'saepudin',
//     email: 'warukawungdepok@gmail.com',
//     password: 'Agung-12345',
//     first_name: 'Agung',
//     last_name: 'Saepudin'
// })

// user.checkExistence().then(check => {
//     console.log(check)
// }).catch(err => console.log(err));

module.exports = User;
