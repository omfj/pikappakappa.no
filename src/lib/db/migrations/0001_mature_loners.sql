CREATE TABLE IF NOT EXISTS "visits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"reason" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "visits_to_users" (
	"visit_id" uuid NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "visits_to_users" ADD CONSTRAINT "visits_to_users_user_id_visit_id" PRIMARY KEY("user_id","visit_id");

DO $$ BEGIN
 ALTER TABLE "visits_to_users" ADD CONSTRAINT "visits_to_users_visit_id_visits_id_fk" FOREIGN KEY ("visit_id") REFERENCES "visits"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "visits_to_users" ADD CONSTRAINT "visits_to_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
