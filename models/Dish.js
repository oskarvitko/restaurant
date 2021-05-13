const connection = require('../db/connection')

const Dish = {
    getAll(options) {
        const query = `SELECT * FROM Dishs ORDER BY ${options.order}`

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
    getTop() {
        const query = `
        SELECT d.Dish_ID, d.Name, SUM(do.Count) as count
        FROM Dishs_Orders do
        INNER JOIN Dishs d ON d.Dish_ID = do.Dish_ID
        GROUP BY d.Name
        ORDER BY count DESC
        LIMIT 3
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
    getByName(name) {
        const query = `
        SELECT * FROM Dishs WHERE Name LIKE '%${name}%'
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
    async add(name, price, weight) {
        const query = `
        INSERT INTO Dishs (Name, Price, Weight)
        VALUES ('${name}', ${price}, ${weight})`
        connection.query(query, (err) => {
            if (err) {
                throw Error(err.message)
            }
        })
    },
    async delete(id) {
        const query = `DELETE FROM Dishs WHERE Dish_ID = ${id}`
        connection.query(query, (err) => {
            if (err) {
                throw Error(err.message)
            }
        })
    },
}

module.exports = Dish