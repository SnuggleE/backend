drop database  if exists tssi;
create database tssi DEFAULT CHARSET utf8;
use tssi;
create table members(mid int auto_increment primary key,mname varchar(32),depts varchar(20),password varchar(32));
insert into members values(null,'刘建坤','1','123445555');

create table dept(did int auto_increment primary key,dname varchar(20));
insert into dept values(1,'研发部');
insert into dept values(2,'人事部');
insert into dept values(3,'项目部');
insert into dept values(4,'领导');

create table evaloption(evalid int auto_increment primary key,evaloption varchar(50));

insert into evaloption values(null,'很少迟到、早退、缺席、工作态度认真');
insert into evaloption values(null,'工作不偷懒、不倦怠');
insert into evaloption values(null,'做事敏捷、效率高');