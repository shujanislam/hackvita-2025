const BaseModel = require("./base.model");

class User extends BaseModel {
    constructor({ name, email, phone, grade, password}) {
        super('users');
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.grade = grade;
        this.password = password;
    }

    static findOne(criteria) {
        const userModel = new User({});
        return new Promise((resolve, reject) => {
            userModel.find(criteria)
                .then(results => {
                    resolve(results.length > 0 ? results[0] : null);
                })
                .catch(err => reject(err));
        });
    }
}

module.exports = User;
