ALTER TABLE "user" ADD COLUMN "schedule" json DEFAULT '[]';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "lastScheduleUpdate" timestamp;