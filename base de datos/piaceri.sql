create database piaceri;

use piaceri;

CREATE TABLE `iniciar` (
  `id_iniciar` int AUTO_INCREMENT PRIMARY KEY,
  `correo` varchar(40) NOT NULL,
  `contrasena` varchar(60) NOT NULL
);

CREATE TABLE `registro` (
  `correo` varchar(45) NOT NULL  PRIMARY KEY,
  `nombre` varchar(40)  DEFAULT NULL,
  `apellido` varchar(40)  DEFAULT NULL,
  `contrasena` varchar(60)  DEFAULT NULL
);


CREATE TABLE `departamento` (
  `id_departamento` int AUTO_INCREMENT PRIMARY KEY,
  `nombre_departamento` varchar(50)
);

CREATE TABLE `ciudad` (
  `id_ciudad` int AUTO_INCREMENT PRIMARY KEY,
  `nombre_ciudad` varchar(50)
);

CREATE TABLE `tipo_pago` (
  `id_tipo_pago` int AUTO_INCREMENT PRIMARY KEY,
  `tipo_pago` varchar (30)
);

CREATE TABLE `comprar` (
  `codigo_pago` int(30) NOT NULL PRIMARY KEY,
  `correo` varchar(60)  NOT NULL,
  `telefono` varchar(13)  NOT NULL,
  `direccion` varchar(50)  NOT NULL,
  `direccion_dos` varchar(50)  NOT NULL,
  `departamento_fk` int,
  `ciudad_fk` int,
   `tipo_pago_fk` int,
  
  FOREIGN KEY (departamento_fk) REFERENCES departamento(id_departamento),
  FOREIGN KEY (ciudad_fk) REFERENCES ciudad(id_ciudad),
  FOREIGN KEY (tipo_pago_fk) REFERENCES tipo_pago(id_tipo_pago)
);


insert into tipo_pago(tipo_pago) values ("Tarjeta"), ("Efectivo");

insert into ciudad(nombre_ciudad) values ("Leticia");

insert into ciudad(nombre_ciudad) values ("Medellin");

insert into ciudad(nombre_ciudad) values ("rionegro");

insert into ciudad(nombre_ciudad) values ("Apartadó");

insert into ciudad(nombre_ciudad) values ("Turbo");

insert into ciudad(nombre_ciudad) values ("Caucasia");

insert into ciudad(nombre_ciudad) values ( "ciudad de arauca");

insert into ciudad(nombre_ciudad) values ("barranquilla");

insert into ciudad(nombre_ciudad) values ("bogota d.c");

insert into ciudad(nombre_ciudad) values ("Girardot");

insert into ciudad(nombre_ciudad) values ("Fusagasugá");

insert into ciudad(nombre_ciudad) values ("Cartagena");

insert into ciudad(nombre_ciudad) values ("Tunja");

insert into ciudad(nombre_ciudad) values ("Duitama");

insert into ciudad(nombre_ciudad) values ("Sogamoso");

insert into ciudad(nombre_ciudad) values ("Manizales"), ("Florencia"),("Yopal"),("Popayán"),("Valledupar"),("uibdó"),("monteria"),("Inírida"),("san jose"),("Neiva"),("Riohacha"),
("Maicao"),("Santa Marta"), ("cienaga"), ("Villavicencio"), ("Pasto"),("Ipiales"),("Tumaco"),("cucuta"),("Ocaña"),("Pamplona"),
("Mocoa"),("Puerto Asís"), ("Armenia"),("Pereira"), ("ciudad de san Andrés"), ("Bucaramanga"),("Barrancabermeja"),("san gil"),
("Málaga"),("Sincelejo"),("Ibagué"),("Honda"),("Cali"),("Tuluá"),("Palmira"),("Buenaventura"),("Cartago"),("Buga"),("Mitú"),
("Puerto Carreño");

insert into departamento(nombre_departamento) values ("Antioquia"), ("Arauca"),("Atlántico"), ( "Cundinamarca"), ("Bolívar"), ("Boyacá"), ("Caldas"),("Caquetá"),("Casanare"),("Cauca"),
("Cesar"),("Chocó"),("cordoba"),("Guainía"),("Guaviare"),("Huila"),("la Guajira"),("Magdalena"),("Meta"),("Nariño"),
("Norte de Santander"),("Putumayo"), ("Quindío"), ( "Risaralda"), ("San Andrés y Providencia"), ("Santander"),("Sucre"),
("Tolima"), ("Valle del Cauca"),("Vaupés"),("Vichada");