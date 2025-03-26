CREATE TABLE IF NOT EXISTS "schedule_entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"date" date NOT NULL,
	"day_of_week" varchar(10) NOT NULL,
	"shift" varchar(4) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "schedule_entries" ADD CONSTRAINT "schedule_entries_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
