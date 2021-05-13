const connection = require('../db/connection')

const User = {
    exists(login) {
        const query = `SELECT * FROM Users WHERE login = "${login}"`
        const promise = new Promise((resolve, rej) => {
            connection.query(query, (error, result) => {
                if (result[0] === undefined) {
                    resolve(false)
                }

                resolve(true)
            })
        })

        return promise.then(exists => exists)
    },
    getByLogin(login) {
        const query = `SELECT * FROM Users WHERE login = "${login}"`
        const promise = new Promise(resolve => {
            connection.query(query, (error, result) => {
                if (result[0] === undefined) {
                    resolve(null)
                } else {
                    resolve(result[0])
                }
            })
        })

        return promise.then(result => result)
    },
    async add(login, password) {
        const query = `INSERT INTO Users (login, password) values ("${login}", "${password}")`
        connection.query(query, (err) => {
            if (err) {
                throw Error(err.message)
            }
        })
    }
}

module.exports = User