const connection = require('../db/connection')

const Waiter = {
    getAll() {
        const query = `SELECT * FROM Waiters ORDER BY Waiter_ID`

        const promise = new Promise(resolve => {
            connection.query(query, (error, result) => {
                if (error) {
                    console.log(error.message);
                }
                if (result) {
                    resolve(result)
                } else {
                    resolve(null)
                }
            })
        })

        return promise.then(result => result)
    },
    getByName(name) {
        const query = `
        SELECT * FROM Waiters WHERE FIO LIKE '%${name}%'
        `

        const promise = new Promise(resolve => {
            connection.query(query, (error, result) => {
                if (error) {
                    console.log(error.message);
                }
                if (result) {
                    resolve(result)
                } else {
                    resolve(null)
                }
            })
        })

        return promise.then(result => result)
    },
    async add(name, phone) {
        const query = `
        INSERT INTO Waiters (FIO, Phone)
        VALUES ('${name}', '${phone}')`
        connection.query(query, (err) => {
            if (err) {
                throw Error(err.message)
            }
        })
    },
    async delete(id) {
        const query = `DELETE FROM Waiters WHERE Waiter_ID = ${id}`
        connection.query(query, (err) => {
            if (err) {
                throw Error(err.message)
            }
        })
    },
}

module.exports = Waiter