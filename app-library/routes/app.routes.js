const handler = require("../handlers/app.handler");

module.exports = app => {

    /*Sessions*/
    
    app.post("/signup", (req,res)=> handler.signup(req,res));
    app.post("/login", (req,res)=> handler.login(req,res));
    app.post("/logout", (req,res)=> handler.logout(req,res));

    /*Partners GET*/

    app.get("/partners", (req, res) => handler.getAllPartners(req, res));
    app.get("/partner/loans/:id", (req, res) => handler.getPartnerIdLoan(req, res));

    /*Books CRUD*/

    app.get("/books", (req, res) => handler.getAllBooks(req, res));
    app.get("/books/:id", (req, res) => handler.getBookId(req, res));
    app.post("/books", (req, res) => handler.postBook(req, res));
    app.put("/books/:id", (req, res) => handler.putBook(req, res));
    app.delete("/books/:id", (req, res) => handler.deleteBook(req, res));
    
    /*Loans GET POST DELETE*/

    app.get("/loans", (req, res) => handler.getAllLoans(req, res));
    app.post("/loans", (req, res) => handler.postLoan(req, res));
    app.delete("/loans/:id", (req, res) => handler.deleteLoan(req, res));
}