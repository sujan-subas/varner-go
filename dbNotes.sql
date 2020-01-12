

-- Order Inn -------------------------------------
create table orders (
order_number varchar unique NOT NULL, 
reference_order_no bigint unique not null, 
order_date date, 
delivery_date date,
part_delivery_flag "type-pdf",
customer_name varchar,
customer_email varchar,
customer_phoneNumber varchar,
customer_addressLine1 varchar,
customer_addressLine4 varchar,
customer_zipCode integer,
customer_city varchar,
order_list json,
order_status "type-order_status",
status_changed_at TIMESTAMPTZ DEFAULT Now(),
process_finished_at date,
created_in_app_at TIMESTAMPTZ DEFAULT Now(),

primary key(order_number, reference_order_no));


-- Order End -------------------------------------
-- status er enten delivered eller Rejected 

create table orders_end (
    order_number varchar unique NOT NULL, 
    created_in_app_at TIMESTAMPTZ DEFAULT Now(),
    process_finished_at TIMESTAMPTZ,
    reference_order_no bigint unique not null, 
    order_status "type-order_status",
    rejected_reason varchar
);


-- CREATE TABLE  ( 
--      id         SERIAL PRIMARY KEY, 
--      title      VARCHAR NOT NULL, 
--      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
-- );


