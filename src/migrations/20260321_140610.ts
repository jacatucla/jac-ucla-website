import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_carousel_slide_width" AS ENUM('max-w-xs', 'max-w-sm', 'max-w-md', 'max-w-lg', 'max-w-xl');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "basic" ADD COLUMN "bg_image_id" integer NOT NULL;
  ALTER TABLE "carousel_slide" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "carousel_slide" ADD COLUMN "visible" boolean DEFAULT true;
  ALTER TABLE "carousel_slide" ADD COLUMN "width" "enum_carousel_slide_width" DEFAULT 'max-w-md';
  ALTER TABLE "banner_links" ADD COLUMN "visible" boolean DEFAULT true NOT NULL;
  ALTER TABLE "board_members" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "media" ADD COLUMN "folder_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "payload_folders_id" integer;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  ALTER TABLE "basic" ADD CONSTRAINT "basic_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "board_members" ADD CONSTRAINT "board_members_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "basic_bg_image_idx" ON "basic" USING btree ("bg_image_id");
  CREATE INDEX "board_members_background_image_idx" ON "board_members" USING btree ("background_image_id");
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_folders_folder_type" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_folders" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  ALTER TABLE "basic" DROP CONSTRAINT "basic_bg_image_id_media_id_fk";
  
  ALTER TABLE "board_members" DROP CONSTRAINT "board_members_background_image_id_media_id_fk";
  
  ALTER TABLE "media" DROP CONSTRAINT "media_folder_id_payload_folders_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_payload_folders_fk";
  
  DROP INDEX "basic_bg_image_idx";
  DROP INDEX "board_members_background_image_idx";
  DROP INDEX "media_folder_idx";
  DROP INDEX "payload_locked_documents_rels_payload_folders_id_idx";
  ALTER TABLE "basic" DROP COLUMN "bg_image_id";
  ALTER TABLE "carousel_slide" DROP COLUMN "name";
  ALTER TABLE "carousel_slide" DROP COLUMN "visible";
  ALTER TABLE "carousel_slide" DROP COLUMN "width";
  ALTER TABLE "banner_links" DROP COLUMN "visible";
  ALTER TABLE "board_members" DROP COLUMN "background_image_id";
  ALTER TABLE "media" DROP COLUMN "folder_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "payload_folders_id";
  DROP TYPE "public"."enum_carousel_slide_width";
  DROP TYPE "public"."enum_payload_folders_folder_type";`)
}
