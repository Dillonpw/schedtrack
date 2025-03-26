CREATE TABLE IF NOT EXISTS "schedule_adjustments" (
	"id" serial PRIMARY KEY NOT NULL,
	"scheduleEntryId" integer NOT NULL,
	"type" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "schedules" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"name" text NOT NULL,
	"schedule" json DEFAULT '[]',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "authenticator";--> statement-breakpoint
ALTER TABLE "schedule_entries" ADD COLUMN "title" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "schedule_adjustments" ADD CONSTRAINT "schedule_adjustments_scheduleEntryId_schedule_entries_id_fk" FOREIGN KEY ("scheduleEntryId") REFERENCES "public"."schedule_entries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "schedules" ADD CONSTRAINT "schedules_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "schedule";