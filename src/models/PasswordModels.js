const {pool} = require('../config/db');
// const { logger } = require('../utils/logger')

class Password {

    constructor(oldPass, newPass, confNewPass) {
        this._oldPass = oldPass;
        this._newPass = newPass;
        this._confNewPass = confNewPass;
    }

    get oldPass() {
        return this._oldPass;
    }

    set oldPass(oldPass) {
        this._oldPass = oldPass;
    }

    get newPass() {
        return this._newPass;
    }

    set newPass(newPass) {
        this._newPass = newPass;
    }

    get confNewPass() {
        return this._confNewPass;
    }

    set confNewPass(confNewPass) {
        this._confNewPass = confNewPass;
    }

    static async findByIdAndUpdatePassword(id, options) {
        const sql = `UPDATE users SET password = "${options.confNewPassword}" WHERE id = "${id}"`;
        let [row] = await pool.execute(sql);
        return row;
    }
}

module.exports = Password;
