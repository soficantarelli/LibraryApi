#   Library

## Run
```
node index.js
```
# Endpoints

### Account
- [Signup](#POST-signup)  
- [Login](#POST-login)  
- [Logout](#POST-logout) 

### Books
- [Get all Books](#Get-books)  
- [Get Book by ID](#GET-books/:id)  
- [Create Book](#POST-books)  
- [Update Book](#PUT-books/:id)
- [Delete Book](#DELETE-books/:id)  

### Partners
- [Get All Partners](#GET-partners)  
- [Get Loan's Partner](#GET-partners/loans/:id)  
 

### Loans
- [Get Loans](#GET-loans)   
- [Create Loan](#POST-loans)  
- [Delete Loan](#DELETE-loansid)  



# Account

## POST signup
```css
localhost:5555/signup
```
# *Request Body*
```json
{
    "name":"Admin",
	"username":"Admin",
	"password":"Admin"
}
```
# **Example Response**
```json
{
    "code":200,
    "message": "User Created Successfully"
}
```
```json
{
    "code":400,
    "message": "Existing username"
}
```

## POST login
```css
localhost:5555/login
```
# *Request Body*
```json
{
	"username":"Admin",
	"password":"Admin"
}
```
# **Example Response**
```json
{
    "code":200,
    "rol": "L",
    "username": "Admin",
    "idUser": 1
}
```
```json
{
    "code":400,
    "message": "Enter a username and password"
}
```
```json
{
    "code":404,
    "message": "Username or password incorrect"
}
```

## POST logout
```css
localhost:5555/logout
```
# **Example Response**
```json
{
    "code":200,
    "message": "Logged Out"
}
```
```json
{
    "code":400,
    "message": "Couldn't Log Out"
}
```

# Books

## GET books
```css
localhost:5555/books
```
# **Example Response**
```json
{
    "code":200,
    "data": [
        {
            "id": 1,
            "title": "1984",
            "author": "George Orwell",
            "amount": 11
        }
    ]
}
```
```json
{
    "code":400,
    "message": "You must be logged in"
}
```

## GET books id
```css
localhost:5555/books/:id
```

# *Request Body*
```json
{
	 "data": [
        {
            "title": "1984",
            "author": "George Orwell",
            "amount": 15
        }
    ]
}
```
# **Example Response**
```json
New Amount
{
    "code":200,
    "data": [
        {
            "amount": 10
        }
    ]
}
Amount Available
{
    "code":200,
    "data": [
        {
            "amount": 2
        }
    ]
}
```
```json
{
    "code":400,
    "message": "You must be logged in and be an admin"
},
{
    "code":404,
    "message": "Book not found"
}
```

## POST books
```css
localhost:5555/books
```
# *Request Body*
```json
{
	 "data": [
        {
            "title": "1984",
            "author": "George Orwell",
            "amount": 15
        }
    ]
}
```
# **Example Response**
```json
{
    "code":201,
    "message": "Book successfully added"
}
```
```json
{
    "code":400,
    "message": "You must be logged in and be an admin"
},
{
    "code":401,
    "message": "Wrong parameters"
},
{
    "code":401,
    "message": "Existing book"
}
```

## PUT book/:id
```css
localhost:5555/book/:id
```
* ### **Parameters**
||Type|Value |
|:----:|-----|
| `id` |  1  |

# *Request Body*
```json
{
	 "data": [
        {
            "amount": 15
        }
    ]
}
```
# **Example Response**
```json
{
    "code":200,
    "message": "Amount successfully modified"
}
```
```json
{
    "code":400,
    "message": "You must be logged in and be an admin"
},
{
    "code":404,
    "message": "Book not found"
},
{
    "code":401,
    "message": "Wrong parameters"
},
{
    "code":401,
    "message": "Amount could not be modified"
}
```

## DELETE books
```css
localhost:5555/books/:id
```
* ### **Parameters**
||Type|Value |
|:----:|-----|
| `id` |  1  |

# **Example Response**
```json
{
    "code":200,
    "message": "Book ${id} successfully removed"
}
```
```json
{
    "code":400,
    "message": "You must be logged in and be an admin"
},
{
    "code":404,
    "message": "Book not found"
},
{
    "code":401,
    "message": "Book couldn't be removed"
}
```

# Partners

## GET Partners  
```css
localhost:5555/partners
```
# **Example Response**
```json
{
    "code":200,
    "data": [
        {
            "id": 2,
            "names": "Partner",
            "username": "Partner",
            "pass": "Partner",
            "roles": "P"
        }
    ]
}
```
```json
{
    "code":400,
    "message": "You must be logged in and be an admin"
}
```

## GET partners/loans/:id
```css
localhost:5555/partners/loans/:id
```
* ### **Parameters**
||Type|Value |
|:----:|-----|
| `id` |  2  |

 # **Example Response**
```json
{
    "code":200,
    "data": [
        {
            "idPartner": 2,
            "dueDate": 1582487713256
        }
    ]
}
```
```json
{
    "code":400,
    "message": "You must be logged in"
},
{
    "code":401,
    "message": "The user has no loans or not exist"
}
```

# Loans

## GET Loans  
```css
localhost:5555/loans
```
# **Example Response**
```json
{
    "code":200,
    "data": [
        {        
            "id": 1,
            "idPartner": 2,
            "idBook": 1,
            "dueDate": 1582487713256
        }
    ]
}
```
```json
{
    "code":400,
    "message": "You must be logged in"
},
{
    "code":401,
    "message": "The user has no loans or not exist"
}
```

## POST Loans  
```css
localhost:5555/loans
```
# *Request Body*
```json
{
    "data": [
        {        
            "idPartner": 2,
            "idBook": 1,
            "dueDate": 2
        }
    ]
}
```
# **Example Response**
```json
{
    "code":200,
    "message": "Loan successfully created"
}
```
```json
{
    "code":400,
    "message": "You must be logged in"
},
{
    "code":404,
    "message": "Book not found"
},
{
    "code":401,
    "message": "Past due loans",
    "message": "Number of copies not available",
    "message": "Wrong number",
    "message": "Loan could not be created"
}
```
## DELETE Loans  
```css
localhost:5555/loans/:id
```
* ### **Parameters**
||Type|Value |
|:----:|-----|
| `id` |  1  |

# **Example Response**
```json
{
    "code":200,
    "message": "Loan successfully deleted"
}
```
```json
{
    "code":400,
    "message": "You must be logged in"
}
{
    "code":404,
    "message": "Loan not found"
}
```
