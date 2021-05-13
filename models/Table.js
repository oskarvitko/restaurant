const connection = require('../db/connection')

const Table = {
    getAll() {
        const query = `SELECT * FROM Tables ORDER BY Capacity DESC`

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
    getFree() {
        const query = `
        SELECT * FROM Tables
        WHERE Is_Free = 1
        ORDER BY Capacity DESC
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
    async add(capacity, location) {
        const query = `
        INSERT INTO Tables (Capacity, Location, Is_Free, Reservation_ID)
        VALUES (${capacity}, '${location}', 1, ${null})`
        connection.query(query, (err) => {
            if (err) {
                throw Error(err.message)
            }
        })
    },
    async delete(id) {
        const query = `DELETE FROM Tables WHERE Table_ID = ${id}`
        connection.query(query, (err) => {
            if (err) {
                throw Error(err.message)
            }
        })
    },
}

module.exports = Table