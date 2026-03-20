import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_basic_quarter" AS ENUM('Fall', 'Winter', 'Spring');
  CREATE TYPE "public"."enum_basic_day" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
  CREATE TYPE "public"."enum_carousel_slide_details_icon" AS ENUM('clock', 'location', 'calendar', 'users', 'message', 'mail');
  CREATE TYPE "public"."enum_carousel_slide_type" AS ENUM('default', 'image-only', 'image-text-card', 'image-text-card-bottom', 'image-text-link', 'image-text-card-button');
  CREATE TYPE "public"."enum_banner_links_icon_type" AS ENUM('form-icon', 'game-icon');
  CREATE TYPE "public"."enum_board_members_role" AS ENUM('President', 'Vice President', 'EVP', 'Screener', 'Webmaster', 'Stashmaster', 'Treasurer', 'Secretary', 'Discord Manager', 'General Officer');
  CREATE TYPE "public"."enum_board_members_year" AS ENUM('Freshman', 'Sophomore', 'Junior', 'Senior');
  CREATE TABLE "basic" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"quarter" "enum_basic_quarter" DEFAULT 'Fall',
  	"day" "enum_basic_day" DEFAULT 'Thursday',
  	"time" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "event" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"week_1_thursday" varchar,
  	"week_1_saturday" varchar,
  	"week_2_thursday" varchar,
  	"week_2_saturday" varchar,
  	"week_3_thursday" varchar,
  	"week_3_saturday" varchar,
  	"week_4_thursday" varchar,
  	"week_4_saturday" varchar,
  	"week_5_thursday" varchar,
  	"week_5_saturday" varchar,
  	"week_6_thursday" varchar,
  	"week_6_saturday" varchar,
  	"week_7_thursday" varchar,
  	"week_7_saturday" varchar,
  	"week_8_thursday" varchar,
  	"week_8_saturday" varchar,
  	"week_9_thursday" varchar,
  	"week_9_saturday" varchar,
  	"week_10_thursday" varchar,
  	"week_10_saturday" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "carousel_slide_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar
  );
  
  CREATE TABLE "carousel_slide_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_carousel_slide_details_icon",
  	"text" varchar
  );
  
  CREATE TABLE "carousel_slide" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"bg_image_id" integer NOT NULL,
  	"type" "enum_carousel_slide_type" DEFAULT 'image-only' NOT NULL,
  	"text" varchar,
  	"description" varchar,
  	"description2" varchar,
  	"link" varchar,
  	"button_text" varchar,
  	"subtitle" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "banner_links" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"link" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"icon_type" "enum_banner_links_icon_type" DEFAULT 'form-icon',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "board_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"member_name" varchar NOT NULL,
  	"role" "enum_board_members_role" DEFAULT 'General Officer',
  	"year" "enum_board_members_year" DEFAULT 'Junior',
  	"major" varchar NOT NULL,
  	"picture_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "basic_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "event_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "carousel_slide_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "banner_links_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "board_members_id" integer;
  ALTER TABLE "carousel_slide_title" ADD CONSTRAINT "carousel_slide_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carousel_slide"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carousel_slide_details" ADD CONSTRAINT "carousel_slide_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carousel_slide"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carousel_slide" ADD CONSTRAINT "carousel_slide_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "board_members" ADD CONSTRAINT "board_members_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "basic_updated_at_idx" ON "basic" USING btree ("updated_at");
  CREATE INDEX "basic_created_at_idx" ON "basic" USING btree ("created_at");
  CREATE INDEX "event_updated_at_idx" ON "event" USING btree ("updated_at");
  CREATE INDEX "event_created_at_idx" ON "event" USING btree ("created_at");
  CREATE INDEX "carousel_slide_title_order_idx" ON "carousel_slide_title" USING btree ("_order");
  CREATE INDEX "carousel_slide_title_parent_id_idx" ON "carousel_slide_title" USING btree ("_parent_id");
  CREATE INDEX "carousel_slide_details_order_idx" ON "carousel_slide_details" USING btree ("_order");
  CREATE INDEX "carousel_slide_details_parent_id_idx" ON "carousel_slide_details" USING btree ("_parent_id");
  CREATE INDEX "carousel_slide_bg_image_idx" ON "carousel_slide" USING btree ("bg_image_id");
  CREATE INDEX "carousel_slide_updated_at_idx" ON "carousel_slide" USING btree ("updated_at");
  CREATE INDEX "carousel_slide_created_at_idx" ON "carousel_slide" USING btree ("created_at");
  CREATE INDEX "banner_links_updated_at_idx" ON "banner_links" USING btree ("updated_at");
  CREATE INDEX "banner_links_created_at_idx" ON "banner_links" USING btree ("created_at");
  CREATE INDEX "board_members_picture_idx" ON "board_members" USING btree ("picture_id");
  CREATE INDEX "board_members_updated_at_idx" ON "board_members" USING btree ("updated_at");
  CREATE INDEX "board_members_created_at_idx" ON "board_members" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_basic_fk" FOREIGN KEY ("basic_id") REFERENCES "public"."basic"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_event_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_carousel_slide_fk" FOREIGN KEY ("carousel_slide_id") REFERENCES "public"."carousel_slide"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_banner_links_fk" FOREIGN KEY ("banner_links_id") REFERENCES "public"."banner_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_board_members_fk" FOREIGN KEY ("board_members_id") REFERENCES "public"."board_members"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_basic_id_idx" ON "payload_locked_documents_rels" USING btree ("basic_id");
  CREATE INDEX "payload_locked_documents_rels_event_id_idx" ON "payload_locked_documents_rels" USING btree ("event_id");
  CREATE INDEX "payload_locked_documents_rels_carousel_slide_id_idx" ON "payload_locked_documents_rels" USING btree ("carousel_slide_id");
  CREATE INDEX "payload_locked_documents_rels_banner_links_id_idx" ON "payload_locked_documents_rels" USING btree ("banner_links_id");
  CREATE INDEX "payload_locked_documents_rels_board_members_id_idx" ON "payload_locked_documents_rels" USING btree ("board_members_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "basic" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "event" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "carousel_slide_title" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "carousel_slide_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "carousel_slide" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "banner_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "board_members" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "basic" CASCADE;
  DROP TABLE "event" CASCADE;
  DROP TABLE "carousel_slide_title" CASCADE;
  DROP TABLE "carousel_slide_details" CASCADE;
  DROP TABLE "carousel_slide" CASCADE;
  DROP TABLE "banner_links" CASCADE;
  DROP TABLE "board_members" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_basic_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_event_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_carousel_slide_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_banner_links_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_board_members_fk";
  
  DROP INDEX "payload_locked_documents_rels_basic_id_idx";
  DROP INDEX "payload_locked_documents_rels_event_id_idx";
  DROP INDEX "payload_locked_documents_rels_carousel_slide_id_idx";
  DROP INDEX "payload_locked_documents_rels_banner_links_id_idx";
  DROP INDEX "payload_locked_documents_rels_board_members_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "basic_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "event_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "carousel_slide_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "banner_links_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "board_members_id";
  DROP TYPE "public"."enum_basic_quarter";
  DROP TYPE "public"."enum_basic_day";
  DROP TYPE "public"."enum_carousel_slide_details_icon";
  DROP TYPE "public"."enum_carousel_slide_type";
  DROP TYPE "public"."enum_banner_links_icon_type";
  DROP TYPE "public"."enum_board_members_role";
  DROP TYPE "public"."enum_board_members_year";`)
}
