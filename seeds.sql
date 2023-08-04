INSERT INTO department (name)
VALUES("Manager"),
("Sales Associate"),
("Accountant"),
("Janitor"),
("Receptionist")

INSERT INTO roles (title, salary, department_id)
VALUES("Manager", 1000000, 1),
("Sales Associates", 85000, 2),
("Accountant", 200000, 3),
("Janitor", 30000, 4),
("Receptionist", 75000, 5)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Brandon", "Cruz", 1, 1),
("Diana", "Cruz", 2, null),
("Katrina", "Cruz", 3, null),
("Jose", "Cruz", 4, null),
("Martha", "Cruz", 5, null)