CREATE SCHEMA IF NOT EXISTS garagebench AUTHORIZATION CURRENT_USER;
SET search_path = garagebench, public;

CREATE TABLE IF NOT EXISTS "vehicle" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "vin" varchar(17) UNIQUE NOT NULL,
  "make" varchar NOT NULL,
  "model" varchar NOT NULL,
  "year" int NOT NULL,
  "mileage" int NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "diagnostic_case" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "vehicleId" uuid NOT NULL REFERENCES "vehicle"("id") ON DELETE CASCADE,
  "caseNumber" varchar NOT NULL,
  "complaint" text,
  "status" varchar NOT NULL DEFAULT 'OPEN',
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
