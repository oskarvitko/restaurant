const connection = require('../db/connection')

const Waiter = {
    getAll() {
        const query = `SELECT * FROM Orders ORDER BY Order_ID DESC`

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
    getDishes(id) {
        const query = `
            SELECT do.Order_ID, do.Dish_ID, d.Name, do.Count,  d.Price
            FROM Dishs_Orders do
            INNER JOIN Dishs d ON d.Dish_ID = do.Dish_ID
            WHERE do.Order_ID = ${id}
        `

        const promise = new Promise(async resolve => {
            await connection.query(query, (error, result) => {
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
    getById(id) {
        const query = `
        SELECT * FROM Orders WHERE Order_ID = ${id}
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
    getLast() {
        const query = `SELECT * FROM Orders ORDER BY Order_ID DESC LIMIT 1`

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
    async add(sum) {
        const query = `
        INSERT INTO Orders (Sum)
        VALUES (${sum})`
        connection.query(query, (err) => {
            if (err) {
                throw Error(err.message)
            }
        })
    },
    async addDishsOrders(orderId, dishId, count) {
        const query = `
        INSERT INTO Dishs_Orders (Order_ID, Dish_ID, Count)
        VALUES (${orderId}, ${dishId}, ${count})`
        connection.query(query, (err) => {
            if (err) {
                throw Error(err.message)
            }
        })
    },
    async updateReservation(reservationId, orderId) {
        const query = `
        UPDATE Reservations SET Order_ID = ${orderId} WHERE Reservation_ID = ${reservationId}
        `
        connection.query(query, (err) => {
            if (err) {
                throw Error(err.message)
            }
        })
    }
}

module.exports = Waiter