CREATE DATABASE restbugs;

USE restbugs;

CREATE TABLE users (
    userId INT NOT NULL AUTO_INCREMENT,
    userGuid VARCHAR(36) NOT NULL,
    fullName VARCHAR(128) NOT NULL,
    PRIMARY KEY(userId)
);

INSERT into users (userGuid, fullName) values ("156cb024-e3e4-44c7-bd7a-c6639f989060", "Howard Dierking");
INSERT into users (userGuid, fullName) values ("cebf68c3-ac9f-40a6-9541-8cf243b32ef9", "Jane Doe");
INSERT into users (userGuid, fullName) values ("136a2252-38a3-47f0-8a38-01427dd3f047", "John Smith");

CREATE TABLE bugs (
    bugId INT NOT NULL AUTO_INCREMENT,
    bugGuid VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1024),
    createdBy VARCHAR(36),
    createdOn DATETIME,
    modifiedOn DATETIME,
    status VARCHAR(255),
    assignedTo VARCHAR(36),
    PRIMARY KEY(bugId)
);

INSERT INTO bugs (bugGuid, title, description, createdBy, createdOn, modifiedOn, status, assignedTo) values ("273f40d1-f694-4581-81a0-5823fbe5e9b3", "something isn't working", "lorem ipsum", "156cb024-e3e4-44c7-bd7a-c6639f989060", "2000-04-012 10:10:10", "2004-11-01 10:10:10", "open", "156cb024-e3e4-44c7-bd7a-c6639f989060");
INSERT INTO bugs (bugGuid, title, description, createdBy, createdOn, modifiedOn, status, assignedTo) values ("3b64741b-1f34-47c6-8c34-9da85c0fc5db", "website is slow", "lorem ipsum", "cebf68c3-ac9f-40a6-9541-8cf243b32ef9", "1992-04-012 10:10:10", "2000-04-012 10:10:10", "open", "cebf68c3-ac9f-40a6-9541-8cf243b32ef9");
INSERT INTO bugs (bugGuid, title, description, createdBy, createdOn, modifiedOn, status, assignedTo) values ("92b05d30-1c82-4cb1-a8e0-3c90b4def5a9", "turn off and back on again?", "lorem ipsum", "136a2252-38a3-47f0-8a38-01427dd3f047", "1994-04-012 10:10:10", "2000-04-012 10:10:10", "open", "136a2252-38a3-47f0-8a38-01427dd3f047");
INSERT INTO bugs (bugGuid, title, description, createdBy, createdOn, modifiedOn, status, assignedTo) values ("87cc80fa-f4ce-481f-a139-db82a6187e19", "out of memory exception", "lorem ipsum", "156cb024-e3e4-44c7-bd7a-c6639f989060", "1997-04-012 10:10:10", "2000-04-012 10:10:10", "open", "156cb024-e3e4-44c7-bd7a-c6639f989060");
INSERT INTO bugs (bugGuid, title, description, createdBy, createdOn, modifiedOn, status, assignedTo) values ("28757637-9682-4cc0-b57d-e402b2a3c891", "should I defrag?", "lorem ipsum", "cebf68c3-ac9f-40a6-9541-8cf243b32ef9", "1998-04-012 10:10:10", "2000-04-012 10:10:10", "open", "cebf68c3-ac9f-40a6-9541-8cf243b32ef9");
INSERT INTO bugs (bugGuid, title, description, createdBy, createdOn, modifiedOn, status, assignedTo) values ("cda114e3-3cea-4c16-baa3-6abfd5b2e414", "stack dump for 0x00000001", "lorem ipsum", "136a2252-38a3-47f0-8a38-01427dd3f047", "1991-04-012 10:10:10", "2000-04-012 10:10:10", "open", "136a2252-38a3-47f0-8a38-01427dd3f047");
INSERT INTO bugs (bugGuid, title, description, createdBy, createdOn, modifiedOn, status, assignedTo) values ("b1dec3c2-c5d3-4b5d-a6db-c94077a93a5e", "PC Load Letter?", "lorem ipsum", "156cb024-e3e4-44c7-bd7a-c6639f989060", "1997-04-012 10:10:10", "2000-04-012 10:10:10", "open", "156cb024-e3e4-44c7-bd7a-c6639f989060");
INSERT INTO bugs (bugGuid, title, description, createdBy, createdOn, modifiedOn, status, assignedTo) values ("a024ffd3-7b17-4e40-823b-ebe25734c3a3", "cup holder disappeared into the machine", "lorem ipsum", "cebf68c3-ac9f-40a6-9541-8cf243b32ef9", "1999-04-012 10:10:10", "2000-04-012 10:10:10", "open", "cebf68c3-ac9f-40a6-9541-8cf243b32ef9");
INSERT INTO bugs (bugGuid, title, description, createdBy, createdOn, modifiedOn, status, assignedTo) values ("17827f2c-afa6-4289-b297-437d9d429678", "smoke coming out of computer? problem?", "lorem ipsum", "136a2252-38a3-47f0-8a38-01427dd3f047", "2000-04-012 10:10:10", "2000-04-012 10:10:10", "open", "136a2252-38a3-47f0-8a38-01427dd3f047");


SELECT b.bugGuid, b.title, u.fullName createdBy, u2.fullName assignedTo
    FROM bugs AS b 
    INNER JOIN users AS u ON b.createdBy=u.userGuid
    INNER JOIN users AS u2 ON b.assignedTo=u2.userGuid ;





CREATE TABLE comments (
    commentId INT NOT NULL AUTO_INCREMENT,
    bugGuid VARCHAR(36) NOT NULL,
    addedOn DATETIME,
    commentText VARCHAR(2048),
    PRIMARY KEY(commentId)
);
