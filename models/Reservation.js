const connection = require('../db/connection')
const { add } = require('./Table')

const Reservation = {
    getAllOnDate(date) {
        const query = `
        SELECT
        r.Reservation_ID, r.Date, r.Is_Active,
        c.FIO, c.Person_count, c.Phone,
        IFNULL(o.Order_ID, null) as Order_ID,
        IFNULL(t.Table_ID, null) as Table_ID,
        IFNULL(t.Location, null) as Location,
        IFNULL(w.FIO, null) as WFIO,
        IFNULL(w.Phone, null) as WPhone
        FROM Reservations r
        INNER JOIN Clients c ON c.Client_ID = r.Client_ID
        LEFT JOIN Waiters w ON w.Waiter_ID = r.Waiter_ID
        LEFT JOIN Tables t ON t.Reservation_ID = r.Reservation_ID
        LEFT JOIN Orders o ON o.Order_ID = r.Order_ID
        WHERE r.Date >= '${date}' AND r.Date <= '${date} 23:59:00'
        ORDER BY r.Reservation_ID DESC
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
    getAll() {
        const query = `
        SELECT
        r.Reservation_ID, r.Date, r.Is_Active,
        c.FIO, c.Person_count, c.Phone,
        IFNULL(o.Order_ID, null) as Order_ID,
        IFNULL(t.Table_ID, null) as Table_ID,
        IFNULL(t.Location, null) as Location,
        IFNULL(w.FIO, null) as WFIO,
        IFNULL(w.Phone, null) as WPhone
        FROM Reservations r
        INNER JOIN Clients c ON c.Client_ID = r.Client_ID
        LEFT JOIN Waiters w ON w.Waiter_ID = r.Waiter_ID
        LEFT JOIN Tables t ON t.Reservation_ID = r.Reservation_ID
        LEFT JOIN Orders o ON o.Order_ID = r.Order_ID
        ORDER BY r.Reservation_ID DESC
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
    async add(reservation, client, tableId) {
        await this.saveClient(client)
        const lastClient = await this.getLast('Client')
        await this.addReservation(reservation, lastClient[0].Client_ID)
        const lastReservation = await this.getLast('Reservation')
        await this.updateTable(tableId, lastReservation[0].Reservation_ID)
    },
    saveClient(client) {
        const query = `
        INSERT INTO Clients (FIO, Person_count, Phone)
        VALUES ('${client.name}', ${client.count}, '${client.phone}')
        `
        connection.query(query, (err) => {
            if (err) {
                throw Error(err.message)
            }
        })
    },
    addReservation(reservation, clientId) {
        const query = `
        INSERT INTO Reservations (Is_Active, Date, Client_ID, Order_ID, Waiter_ID)
        VALUES (1 ,'${reservation.date}', ${clientId}, ${null}, ${reservation.waiterId})
        `
        connection.query(query, (err) => {
            if (err) {
                throw Error(err.message)
            }
        })
    },
    updateTable(tableId, reservationId) {
        const query = `UPDATE Tables SET Reservation_ID = ${reservationId}, Is_Free = 0 WHERE Table_ID = ${tableId}`

        connection.query(query, (err) => {
            if (err) {
                throw Error(err.message)
            }
        })
    },
    getLast(table) {
        const query = `SELECT * FROM ${table}s ORDER BY ${table}_ID DESC LIMIT 1`

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
    async close(id) {
        let query = `
            UPDATE Reservations SET Is_Active = 0, Waiter_ID = ${null} WHERE Reservation_ID = ${id}
        `

        connection.query(query, (err) => {
            if (err) {
                throw Error(err.message)
            }
        })

        query = `
            UPDATE Tables SET Is_Free = 1, Reservation_ID = ${null} WHERE Reservation_ID = ${id}
        `

        connection.query(query, (err) => {
            if (err) {
                throw Error(err.message)
            }
        })
    },
    getActive() {
        const query = `
        SELECT r.Reservation_ID, r.Date, r.Is_Active, c.FIO, c.Person_count, c.Phone, t.Location, w.FIO as WFIO, w.Phone as WPhone, o.Order_ID, t.Table_ID
        FROM Reservations r
        INNER JOIN Clients c ON c.Client_ID = r.Client_ID
        INNER JOIN Waiters w ON w.Waiter_ID = r.Waiter_ID
        INNER JOIN Tables t ON t.Reservation_ID = r.Reservation_ID
        INNER JOIN Orders o ON o.Order_ID = r.Order_ID
        WHERE r.Is_Active = 1
        ORDER BY r.Reservation_ID DESC
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
    getPersonsOnDate(date) {
        const query = `
            SELECT SUM(Person_count) FROM Reservations r
            INNER JOIN Clients c ON c.Client_ID = r.Client_ID
            WHERE R.Date >= '${date}' AND R.Date <= '${date} 23:59:00'
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
    getWithoutOrder() {
        const query = `SELECT * FROM Reservations WHERE Is_Active = 1 AND Order_ID is null`

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
    }
}

module.exports = Reservation