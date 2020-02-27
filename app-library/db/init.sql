use dbLibrary;

create table books(
    id    SMALLINT not NULL AUTO_INCREMENT,
    title      VARCHAR(100)    not NULL,
    author      VARCHAR(100)    not NULL,
    amount    INTEGER         not NULL,
    CONSTRAINT PK__books__END 
        PRIMARY KEY (id),
    CONSTRAINT CK__books__amount__END 
        CHECK(amount>0)
);

create table partners(
    id          SMALLINT         not NULL AUTO_INCREMENT,
    names      VARCHAR(100)        not NULL,
    username    VARCHAR(100)        not NULL,
    pass        VARCHAR(100)        not NULL,
    roles        CHAR(1)             not NULL DEFAULT 'P',
    CONSTRAINT PK__partners__END
        PRIMARY KEY (id)
);

CREATE TABLE loans (

    id SMALLINT NOT NULL AUTO_INCREMENT,
    idPartner SMALLINT  NOT NULL,
    idBook SMALLINT NOT NULL,
    dueDate BIGINT NOT NULL,
     CONSTRAINT  PK__loans__END
        PRIMARY KEY (id),
    CONSTRAINT  FK__loans__books__END
        FOREIGN KEY (idBook) REFERENCES books(id),
    CONSTRAINT  FK__loans__partners__END
        FOREIGN KEY (idPartner) REFERENCES partners(id)
);

INSERT INTO partners (id, names, username, pass, roles)
VALUES (1, "Librarian", "Librarian", "Librarian", "L"); 
