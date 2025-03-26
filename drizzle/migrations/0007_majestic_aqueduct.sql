CREATE TABLE IF NOT EXISTS "feedbacks" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"text" text NOT NULL,
	"date" timestamp NOT NULL
);
