CREATE TABLE "public"."devices" (
"id" int8 NOT NULL,
"device_name" varchar(255) COLLATE "default",
"ip_address" varchar(255) COLLATE "default",
"port" varchar(255) COLLATE "default",
"default_device" bool,
"created_by" varchar(50) COLLATE "default" NOT NULL,
"created_date" timestamp(6) NOT NULL,
"reset_date" timestamp(6),
"last_modified_by" varchar(50) COLLATE "default",
"last_modified_date" timestamp(6)
)
WITH (OIDS=FALSE)

;