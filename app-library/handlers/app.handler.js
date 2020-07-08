const validator = require('../libs/validators');
const query = require('../libs/queries');

module.exports = {

    /*****************SESSIONS****************/

    signup: async (req, res) => {

        var name = req.body.name;
        var username = req.body.username;
        var password = req.body.password;

        var user = await query.existPartner(username);

        if (validator.validarRegistro(name, username, password) && user == -1) {

            await query.postUsuario(name, username, password);

            res.status(200).json({
                idUser: req.session.idUser,
                message: "User created successfully"
            });

        } else {
            res.status(400).json("Existing username");
        }
    },

    login: async (req, res) => {

        var username = req.body.username;
        var password = req.body.password;

        var partner = await query.findPartner(username, password);

        if (partner.length > 0) {

            req.session.loggedIn = true;
            req.session.username = username;
            req.session.idUser = partner[0].id;
            req.session.rol = partner[0].roles;

            res.status(200).json({
                idUser: req.session.idUser,
                username: req.session.username,
                rol: req.session.rol

            });
        } else {
            res.status(404).json("Username or password incorrect");
        }
    },

    logout: async (req, res) => {

        if (req.session.loggedIn) {

            req.session.destroy(err => {
                if (!err) {
                    res.status(200).json("Logged Out");
                } else {
                    return res.status(400).json("Error in session");
                }
            });

        } else {
            res.status(400).json("Couldn't Log Out");
        }
    },

    /*****************PARTNERS****************/

    getAllPartners: async (req, res) => {
        if (req.session.loggedIn && req.session.rol == 'L') {
            var result = await query.getPartners();
            res.status(200).json(result);
        } else {
            res.status(400).json("You must be logged in and be an admin");
        }
    },

    getPartnerIdLoan: async (req, res) => {
        if (req.session.loggedIn) {

            var result = await query.getLoansUser(req.params.id);

            if (result != -1) {
                res.status(200).json({
                    data: result
                });

            } else {
                res.status(401).json("The user has no loans or not exist");
            }

        } else {
            res.status(400).json("You must be logged in");
        }
    },

    /******************BOOKS******************/

    getAllBooks: async (req, res) => {

        if (req.session.loggedIn) {
            var result = await query.getBooks();
            res.status(200).json(result);
        } else {
            res.status(400).json("You must be logged in");
        }
    },

    getBookId: async (req, res) => {
        if (req.session.loggedIn) {
            
            var id = req.params.id;
            var existId = await query.findBookId(id);

            if (existId.length > 0) {
                res.status(200).json(existId);             
            } else {
                res.status(404).json("Book not found");
            }
        } else {
            res.status(400).json("You must be logged in");
        }
    },

    postBook: async (req, res) => {
        if (req.session.loggedIn && req.session.rol == 'L') {

            if (validator.validateBook(req.body.title, req.body.author, req.body.amount)) {

                var result = await query.existBook(req.body.title, req.body.author);
               
                if (result.length > 0) {
                    res.status(401).json("Existing book");
                   
                } else {
                    await query.postBook(req.body.title, req.body.author, req.body.amount);
                    res.status(201).json({
                        message: "Book successfully added"
                    });
                }
            } else {
                res.status(401).json("Wrong parameters");
            }

        } else {
            res.status(400).json("You must be logged in and be an admin");
        }
    },

    putBook: async (req, res) => {
        if (req.session.loggedIn && req.session.rol == 'L') {

            var bookId = req.params.id;
            var existId = await query.findBookId(bookId);
            
            if (existId.length > 0) {
                
                var newAmount = req.body.amountNew;
                var borrowedAmount = await query.amountOfCopiesBorrowed(bookId);

                if(validator.modifiedBook(newAmount, borrowedAmount)){

                    await query.putLibro(newAmount, bookId);
                    res.status(200).json({
                        idBook: bookId,
                        message: "Amount successfully modified"
                    });

                }else{
                    res.status(401).json("Amount could not be modified");
                }

            } else {
                res.status(404).json("Book not found");
            }

        } else {
            res.status(400).json("You must be logged in and be an admin");
        }
    },

    deleteBook: async (req, res) => {
        if (req.session.loggedIn && req.session.rol == 'L') {

            var existId = await query.findBookId(req.params.id);

            if (existId.length > 0) {

                var borrowedAmount = await query.amountOfCopiesBorrowed(bookId);
                if(borrowedAmount == 0){
                    await query.deleteBook(req.params.id);

                    res.status(200).json({
                        idBook: req.params.id,
                        message: `Book successfully removed`
                    });
                }else{
                    res.status(401).json("Book could be delete");
                }
                

            } else {
                res.status(404).json("Book not found");
            }

        } else {
            res.status(400).json("You must be logged in and be an admin");
        }
    },



    /******************LOANS******************/

    getAllLoans: async (req, res) => {
        if (req.session.loggedIn && req.session.rol == 'L') {
            var result = await query.getLoans();
            if (result.length > 0) {
                res.status(200).json({
                    data: result
                });
            } else {
                res.status(404).json("Loans not found");
            }
        } else {
            res.status(400).json("You must be logged in and be an admin");
        }
    },

    postLoan: async (req, res) => {
        if (req.session.loggedIn && req.session.rol == 'P') {

            var idPartner = req.session.idUser;
            var existId = await query.findBookId(req.body.idBook);

            if (existId) {

                var dueDate = await query.dueDateLoan(idPartner);

                if (!dueDate) {

                    var amountAvailable = await query.amountOfCopies(existId);

                    if (amountAvailable) {

                        if (validator.validateDays(req.body.days)) {

                            var result = await query.postLoan(idPartner, req.body.idBook, req.body.days);
                            if (result) {
                                res.status(200).json({
                                    message: "Loan successfully created"
                                });
                            } else {
                                res.status(401).json("Loan could not be created");
                            }

                        } else {
                            res.status(401).json("Wrong number");
                        }

                    } else {
                        res.status(401).json("Number of copies not available");
                    }

                } else {
                    res.status(401).json("Past due loans");
                }

            } else {
                res.status(404).json("Book not found");
            }

        } else {
            res.status(400).json("You must be logged in");
        }
    },

    deleteLoan: async (req, res) => {
        if (req.session.loggedIn && req.session.rol == 'L') {

            var result = await query.deleteLoan(req.params.id);

            if (result == -1) {
                res.status(404).json("Loan not found");

            }
            else {
                res.status(200).json({
                    message: "Loan successfully deleted"
                });
            }

        } else {
            res.status(400).json("You must be logged in");
        }
    }
}