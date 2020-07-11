const util = require('util');
const con = require('../libs/connection')
const query = util.promisify(con.query).bind(con);

module.exports = {

    /*****************PARTNERS****************/
    
    existPartner: (username) => {
        const result = query(`SELECT * 
                                FROM partners
                                WHERE username = ?`, [username]);
        if(result.length > 0 ) {
            return result;
        }else{
            return -1;
        }
        
    },

    postUsuario: (name, username, password) => {

        const result = query(`INSERT INTO partners (names, username, pass)
                                VALUES (?,?,?)`, [name, username, password]
        );
        return result;
    },
            
    findPartner: (username, password) => {

        const result = query(`SELECT * 
                                FROM partners
                                WHERE username = ? and pass = ?`, [username, password]);
        return result;
    },

    getPartners: () => {
        const result = query(`SELECT * 
                                FROM partners
                                WHERE roles = "P"`);
        return result;
    },

    getLoansUser: (id) => {
        const result = query(`SELECT l.id, l.dueDate, p.username, b.title, b.author 
                                FROM books b
                                    JOIN loans l
                                        ON b.id = l.idBook
                                    JOIN partners p
                                        ON l.idPartner = p.id
                                WHERE p.id = ?
                                ORDER BY l.dueDate DESC`, [id]);
        console.log(result);
                                return result;
    },

    /*****************BOOKS****************/
    
    getBooks: () => {

        const result = query(`SELECT b.id, b.title, b.author, b.amount, (b.     amount - COUNT(l.idBook)) as availables
                                FROM books b
                                LEFT JOIN loans l
                                    ON b.id = l.idBook
                            GROUP BY b.id, b.title, b.amount
                            ORDER BY b.title`);
        return result;
    },
    
    findBookId: (id) => {

        const result = query(`select * 
                                from books
                                where id = ?`, [id]);
        return result;
    },

    existBook: (title, author) => {

        const result = query(`SELECT * 
                                FROM books
                                WHERE title = ? and author = ?`, [title, author]);
        return result;
    },

    postBook: (title, author, amount) => {

        const result = query(`INSERT INTO books (title, author, amount)
                                VALUES (?,?,?)`, [title, author, amount]
        );
        return result;
    },

    getBooksBorrowed: () => {

        const result = query(`SELECT b.id, b.title, b.author, b.amount, b.amount - count(l.idBook) as availables
                                FROM books b
                                LEFT JOIN loans l
                                    ON b.id = l.idBook
                            GROUP BY b.id, b.title, b.amount
                            ORDER BY b.title`);

                                
        return result;
    },

    amountOfCopiesBorrowed: (id) => {

        const result = query(`SELECT COUNT(*) AS borrowed
                                FROM loans
                                WHERE idBook = ?`, [id]);
        return result;
    },

    amountOfCopies: (id) => {

        const result = query(`SELECT amount
                                FROM books 
                                WHERE id = ?`, [id]);
        
        return result;
    },

    putLibro: (cantidadNueva,idLibro) => {

        const result = query(`UPDATE books 
                                SET amount = ?
                                WHERE id = ?`, [cantidadNueva, idLibro]);
        
        return result;
    },

    deleteBook: (id) => {
        const result = query(`DELETE 
                                FROM books
                                WHERE id = ?`, [id]);

        return result;
    },

    /*****************LOANS****************/
    existLoan: (id) =>{
        const result = query(`SELECT *
                                FROM loans
                                WHERE idBook = ?`, [id]);
        return result;  
    },

    getLoans: () => {

        const result = query(`SELECT l.id, l.dueDate, b.title, b.author, p.username 
                                FROM loans l
                                    JOIN books b
                                        ON l.idBook = b.id 
                                    JOIN partners p
                                        ON l.idPartner = p.id`);
        return result;
    },
    
    dueDateLoan: (idPartner) => {

        const result = query(`SELECT dueDate
                                FROM loans
                                WHERE idPartner = ? and dueDate < ?
                                ORDER BY dueDate desc
                                limit 1`, [idPartner, Date.now()]);
     
        return result;
    },

    postLoan: (idPartner, idBook, daysBorrowed) => {

        var days = Date.now() + (1000 * 60 * 60 * 24) * daysBorrowed;
        const result = query(`INSERT INTO loans (idPartner, idBook, dueDate)
                                VALUES (?,?,?)`, [idPartner, idBook, days]
        );
        return result;
    },

    deleteLoan: (id) => {
        
        const result = query(`DELETE 
                                FROM loans
                                WHERE id = ?`, [id]);
            return result;
    }
}

