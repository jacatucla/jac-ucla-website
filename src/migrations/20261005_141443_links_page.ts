import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

// Statements are idempotent: board_members._order, the media portrait size and
// possibly page_links itself may already exist from running Payload in dev mode
// (schema push) against this database.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_page_links_icon_type" AS ENUM('link-icon', 'form-icon', 'game-icon');
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;
  CREATE TABLE IF NOT EXISTS "page_links" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"link" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"visible" boolean DEFAULT true NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"icon_type" "enum_page_links_icon_type" DEFAULT 'link-icon',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "board_members" ADD COLUMN IF NOT EXISTS "_order" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_portrait_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_portrait_width" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_portrait_height" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_portrait_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_portrait_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_portrait_filename" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "page_links_id" integer;
  CREATE INDEX IF NOT EXISTS "page_links_updated_at_idx" ON "page_links" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "page_links_created_at_idx" ON "page_links" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_page_links_fk" FOREIGN KEY ("page_links_id") REFERENCES "public"."page_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;
  CREATE INDEX IF NOT EXISTS "board_members__order_idx" ON "board_members" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "media_sizes_portrait_sizes_portrait_filename_idx" ON "media" USING btree ("sizes_portrait_filename");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_page_links_id_idx" ON "payload_locked_documents_rels" USING btree ("page_links_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "page_links" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_page_links_fk";
  
  DROP INDEX "board_members__order_idx";
  DROP INDEX "media_sizes_portrait_sizes_portrait_filename_idx";
  DROP INDEX "payload_locked_documents_rels_page_links_id_idx";
  ALTER TABLE "board_members" DROP COLUMN "_order";
  ALTER TABLE "media" DROP COLUMN "sizes_portrait_url";
  ALTER TABLE "media" DROP COLUMN "sizes_portrait_width";
  ALTER TABLE "media" DROP COLUMN "sizes_portrait_height";
  ALTER TABLE "media" DROP COLUMN "sizes_portrait_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_portrait_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_portrait_filename";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "page_links_id";
  DROP TYPE "public"."enum_page_links_icon_type";`)
}
