create database serversDB;
use serversdb;

create table companies
(
companyID int auto_increment,
companyName varchar(255),
primary key (companyID)
);

INSERT INTO companies
(companyName)
VALUES
("Microsoft"),
("IBM"),
("GoDaddy"),
("DifitalO"),
("Monday"),
("ClickUp"),
("Amazon"),
("Redhat");

CREATE TABLE servers
(
id int auto_increment,
serverName varchar(255),
ip varchar(255),
company_id int,
status bool default 0,
created datetime default now(),
foreign key (company_id) references companies(companyID),
primary key (id)
);

INSERT INTO servers
(serverName, ip, company_id, created)
VALUES
("server1", "120.155.90.210", 2, date("2022-10-05")),
("server2", "120.240.90.110", 1, date("2021-12-31")),
("server3", "120.155.88.210", 3, date("2021-11-02")),
("server4", "120.155.90.88", 4, date("2020-09-12")),
("server5", "220.122.90.210", 1, date("2022-02-03")),
("server6", "120.88.90.211", 1, date("2021-05-21")),
("server7", "120.154.88.233", 3, date("2022-02-03"));

update servers
set status = 1
where id=1;

SELECT servers.*, companies.companyName as company
        FROM servers
        inner join companies on servers.company_id = companies.companyID
        order by created desc;
SELECT servers.*, companies.companyName as company
        FROM servers
        inner join companies on servers.company_id = companies.companyID
        WHERE servers.serverName LIKE 'bl%'
        order by created desc;