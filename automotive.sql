
use automotive;

CREATE TABLE BRANCH(
	BranchID SERIAL NOT NULL,
	AddressNo VARCHAR(5),
	Street VARCHAR(30),
	Province VARCHAR(30),
	City VARCHAR(30),
	ZipCode VARCHAR(5),
	Available BOOLEAN,
CONSTRAINT BRANCH_PK PRIMARY KEY (BranchID));
INSERT INTO branch VALUES (1,"45", "Ratchada", "Bangkok", "Bangkok", "10400", True);
INSERT INTO branch VALUES (2,"12", "Bangrak", "Bangkok", "Bangkok", "10500", True);

 
CREATE TABLE DEPARTMENT(
	DeptID SERIAL NOT NULL,
	DeptName VARCHAR(30) NOT NULL,
CONSTRAINT DEPARTMENT_PK PRIMARY KEY (DeptID));
INSERT INTO department(DeptName) VALUES ("Customer service");
INSERT INTO department(DeptName) VALUES ("Technical service");
INSERT INTO department(DeptName) VALUES ("Business service");

CREATE TABLE EMPLOYEE(
SSN SERIAL NOT NULL PRIMARY KEY,
FName VARCHAR(30) NOT NULL,
LName VARCHAR(30) NOT NULL,
Phone varchar(10) NOT NULL,
Position VARCHAR(30),
Salary INTEGER,
StartDate DATE,
DeptID BIGINT UNSIGNED NOT NULL,
BranchID BIGINT UNSIGNED NOT NULL,
OrdinaryFlag BOOLEAN,
TechnicianFlag BOOLEAN,
Specialize VARCHAR(30),
FOREIGN KEY (DeptID) REFERENCES department(DeptID),
FOREIGN KEY (BranchID) REFERENCES branch(BranchID)
);
INSERT INTO employee (FName,LName,Phone,Position,Salary,StartDate,DeptID,BranchID,OrdinaryFlag,TechnicianFlag,Specialize) VALUES 
("Tyler","Hendrix","0812695230","Technician",10000,"04/01/20",1,1,False,True,"Peugeot")
,("Abdul","Bryan","0325801476","Ordinary",20000,"29/06/20",2,2,True,False,"Daihatsu")
,("Irene","Salazar","0503347647","Technician",30000,"20/08/19",3,1,False,True,"Subaru")
,("Wanda","Phillips","0924255655","Ordinary",10000,"15/11/18",1,2,True,False,"FAW")
,("Ira","Horton","0899808619","Technician",20000,"09/01/19",2,1,False,True,"General Motors")
,("Amir","Walton","0504026053","Ordinary",30000,"17/11/18",3,2,True,False,"Subaru")
,("Axel","Ballard","0623087514","Technician",10000,"27/09/19",1,1,False,True,"Porsche")
,("Adria","Lancaster","0384624733","Ordinary",20000,"15/12/19",2,2,True,False,"Fiat")
,("Ezra","Leach","0791376766","Technician",30000,"10/09/19",3,1,False,True,"Lexus")
,("Jennifer","Wagner","0676480452","Ordinary",10000,"10/06/19",1,2,True,False,"Volkswagen");


CREATE TABLE CUSTOMER(
	SSN SERIAL NOT NULL,
	Name VARCHAR(50) NOT NULL,
	Phone VARCHAR(10) NOT NULL,
CONSTRAINT CUSTOMER_PK PRIMARY KEY (SSN));
INSERT INTO customer (SSN,Name,Phone) VALUES 
(1679030126499,"Gisela Monroe","0794022249")
,(1600071545499,"Shellie Harrell","0396496887")
,(1644013098199,"Cecilia Calhoun","0535686096")
,(1644090746499,"Petra Stewart","0795650425")
,(1608032505699,"Kylie Summers","0415436116")
,(1649091229099,"Iona Kerr","0935846004")
,(1602112642999,"Eden Black","0905561232")
,(1601042976999,"Sonia Foreman","0918493357")
,(1688021551099,"Rana Robbins","0934794816")
,(1607062797499,"Tatyana Hudson","0526172062");


CREATE TABLE SUPPLIER(
	SSN SERIAL NOT NULL,
	Name VARCHAR(50) NOT NULL,
	Phone VARCHAR(10) NOT NULL,
	AddressNo VARCHAR(30),
	Street VARCHAR(30),
	Province VARCHAR(30),
	City VARCHAR(30),
	ZipCode VARCHAR(5),
CONSTRAINT SUPPLIER_PK PRIMARY KEY (SSN));
INSERT INTO supplier (SSN,Name,Phone,AddressNo,Street,Province,City,Zipcode) VALUES 
(1676031333999,"Sed Dictum Proin Company","0843039860","31","P.O. Box 351, 8337 Eu Avenue","BE","Berlin","72517")
,(1641011482799,"Ipsum Dolor Associates","0174245911","41","817-8209 Nulla Avenue","Kano","Kano","42916")
,(1618011107099,"Sem Magna Incorporated","0819425282","19","9604 Tortor. Road","Jigawa","Dutse","13797")
,(1603042207099,"Tempus Scelerisque Lorem LLC","0569523710","89","841-1779 Massa. Road","WA","Stratford-upon-Avon","86825")
,(1646052906299,"Diam Dictum LLP","0541979893","5","P.O. Box 233, 1205 Nec St.","Centre","Bourges","73593");

CREATE TABLE _ORDER(
	OrderID SERIAL NOT NULL,
	TotalPrice FLOAT NOT NULL,
	Status VARCHAR(15),
	Paymethod VARCHAR(15) NOT NULL,
	StartDate DATE NOT NULL,
	EndDate DATE,
	PaymentDate DATE,
	EmployeeSSN BIGINT UNSIGNED NOT NULL,
	SorderFlag BOOLEAN,
	Amount INTEGER NOT NULL,
	SupplierSSN BIGINT UNSIGNED NOT NULL,
	CorderFlag BOOLEAN,
	ServiceType VARCHAR(15) NOT NULL,
	CustomerSSN BIGINT UNSIGNED NOT NULL,
	CONSTRAINT ORDER_PK PRIMARY KEY (OrderID),
	CONSTRAINT ORDER_FK1 FOREIGN KEY (EmployeeSSN) REFERENCES EMPLOYEE(SSN),
	CONSTRAINT ORDER_FK2 FOREIGN KEY (SupplierSSN) REFERENCES SUPPLIER(SSN),
	CONSTRAINT ORDER_FK3 FOREIGN KEY (CustomerSSN) REFERENCES CUSTOMER(SSN)
);   
INSERT INTO _order (OrderID, TotalPrice, Status, Paymethod, StartDate, EndDate, PaymentDate, EmployeeSSN, SorderFlag, Amount, SupplierSSN, CorderFlag, ServiceType, CustomerSSN) VALUES
(10001, 500, "Finished", "Cash", "20/06/18","21/06/18","21/06/18",11, true,1,1603042207099, false,"Fixed",1600071545499)
,(10002, 500, "Finished", "Credit card", "4/02/19","31/01/19","31/01/19",12, true,1,1618011107099, false,"Fixed",1601042976999)
,(10003, 500, "Finished", "Cash", "17/04/19","23/04/19","23/04/19",13, true,1,1641011482799, false,"Modified",1602112642999)
,(10004, 500, "Finished", "Cash", "27/05/19","30/05/19","30/05/19",14, true,1,1603042207099, false,"Fixed",1607062797499)
,(10005, 500, "Finished", "Credit card", "02/03/20","10/03/20","10/03/20",15, true,1,1676031333999, false,"Modified",1608032505699)
,(10006, 500, "Finished", "Cash", "04/03/20","11/03/20","11/03/20",16, true,1,1646052906299, false,"Fixed",1644013098199)
,(10007, 500, "Finished", "Cash", "06/08/20","11/08/20","11/08/20",17, true,1,1676031333999, false,"Fixed",1644090746499)
,(10008, 500, "In process", "Cash", "09/11/20","16/11/20", null,18, true,1,1676031333999, false,"Modified",1649091229099)
,(10009, 500, "In process", "Credit card", "12/11/20","18/11/20",null,19, true,1,1646052906299, false,"Modified",1679030126499)
,(10010, 500, "In process", "Credit card", "15/11/20","19/11/20",null,20, true,1,1676031333999, false,"Fixed",1688021551099);

CREATE TABLE CAR(
	LicensePlate VARCHAR(30) NOT NULL,
	Brand VARCHAR(30),
	Model VARCHAR(30),
	Color VARCHAR(30),
	CustomerSSN BIGINT UNSIGNED NOT NULL,
	OrderID BIGINT UNSIGNED NOT NULL,
CONSTRAINT CAR_PK PRIMARY KEY (LicensePlate),
CONSTRAINT CAR_FK1 FOREIGN KEY (CustomerSSN) REFERENCES CUSTOMER(SSN),
CONSTRAINT CAR_FK2 FOREIGN KEY (OrderID) REFERENCES _ORDER(OrderID));
INSERT INTO car (LicensePlate, Brand, Model, Color, CustomerSSN, OrderID) VALUES
("HWG-8453","Nissan","Note","Red",1679030126499,10001)
,("VYC-6447","Toyota","Camry","White",1600071545499,10002)
,("XCB-5202","Honda","Civic","Silver",1644013098199,10003)
,("OMD-4260","Suzuki","SWIFT","Blue",1644090746499,10004)
,("YDQ-4497","Nissan","X-Trail","Orange",1608032505699,10005)
,("HTP-9234","Toyota","Yaris","White",1649091229099,10006)
,("OAC-8953","Mazda","Sedan","Black",1602112642999,10007)
,("RQS-3197","Ford","Ranger","Black",1601042976999,10008)
,("VIK-8758","BMW","X6","Blue",1688021551099,10009)
,("MLO-3749","Honda","Accord","Red",1607062797499,10010);

CREATE TABLE MAINPART(
	MPid SERIAL NOT NULL,
	MPName VARCHAR(50) NOT NULL,
	Width FLOAT,
	Height FLOAT,
	Depth FLOAT,
	Radius FLOAT,
	BuyPrice FLOAT NOT NULL,
	SellPrice FLOAT NOT NULL,
	OrderID BIGINT UNSIGNED NOT NULL,
CONSTRAINT MAINPART_PK PRIMARY KEY (MPid),
CONSTRAINT MAINTPART_FK FOREIGN KEY (OrderID) REFERENCES _ORDER(OrderID));
INSERT INTO mainpart(MPid, MPname, Width, Height, Depth, Radius, BuyPrice, SellPrice, OrderID) VALUES
(20001,"Brass Battery Terminal",null,34,null,null,70,85,10001)
,(20002,"Front shock absorber",null,10,null,null,550,600,10002)
,(20003,"Back shock absorber",null,102,null,10,460,500,10003)
,(20004,"Ball joint",null,54,65.5,16,105,133,10004)
,(20005,"Dump pull line",null,2500,null,null,950,1050,10005)
,(20006,"Shockproof rubber lump",75,75,12,null,50,60,10006)
,(20007,"Leaf spring",60,550,8,null,800,850,10007)
,(20008,"Door",90,1350,20,null,12000,13000,10008)
,(20009,"Headlights",null,178,85,72,850,1200,10009)
,(20010,"Bumper",1320,203,5,null,9000,10500,10010);

CREATE TABLE SUBPART(
	SPid SERIAL NOT NULL,
	SPName VARCHAR(50) NOT NULL,
	Width FLOAT,
	Height FLOAT,
	Depth FLOAT,
	Radius FLOAT,
	BuyPrice FLOAT NOT NULL,
	SellPrice FLOAT NOT NULL,
	MPid BIGINT UNSIGNED NOT NULL,
	OrderID BIGINT UNSIGNED NOT NULL,
CONSTRAINT SUBPART_PK PRIMARY KEY (SPid),
CONSTRAINT SUBPART_FK1 FOREIGN KEY (MPid) REFERENCES MAINPART(MPid),
CONSTRAINT SUBPART_FK2 FOREIGN KEY (OrderID) REFERENCES _ORDER(OrderID));
INSERT INTO subpart (SPid, SPname, Width, Height, Depth, Radius, BuyPrice, SellPrice, MPid, OrderID) VALUES
(30001,"BBT1",null,30,null,5,3,5,20001,10001)
,(30002,"BBT2",20,30,2,null,5,8,20001,10001)
,(30003,"BBT3",null,null,12,7,2,4,20001,10001)
,(30004,"BSA1",null,85,null,15,100,150,20003,10003)
,(30005,"BSA2",null,102,null,10,150,200,20003,10003)
,(30006,"LS1",60,550,8,null,500,550,20007,10007)
,(30007,"LS2",20,80,3,null,100,120,20007,10007)
,(30008,"D1",300,450,8,null,800,1000,20008,10008)
,(30009,"D2",90,1350,20,null,5000,7000,20008,10008)
,(30010,"D3",20,180,15,null,150,200,20008,10008);