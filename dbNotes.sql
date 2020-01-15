create type "type-pdf" as enum ( 
'0',
'1'
);

create type "type-order_status" as enum ( 
  'new',
  'in-process',
  'declined',
   'packed',
'delivered'
);
create type "decline-reason" as enum ( 
'Varen er ikke tilgjengelig',
'Varen er skadet',
'Har ikke tid',
'Annet'
);
// ----
\dt 	-> shows all tables
\d table_name 	-> shows table

check what types are defined, and their values:

select n.nspname as enum_schema,  
       t.typname as enum_name,  
       e.enumlabel as enum_value
from pg_type t 
   join pg_enum e on t.oid = e.enumtypid  
   join pg_catalog.pg_namespace n ON n.oid = t.typnamespace

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
order_status "type-order_status" default 'new',
decline_reason varchar,
status_changed_at TIMESTAMPTZ DEFAULT Now(),
process_finished_at date,
created_in_app_at TIMESTAMPTZ DEFAULT now(),
product_image_url varchar,
expires_at date,

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


