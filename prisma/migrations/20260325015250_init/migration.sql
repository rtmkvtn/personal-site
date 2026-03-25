-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('Frontend', 'Fullstack', 'TelegramMiniApp', 'TelegramBot');

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "type" "ProjectType" NOT NULL,
    "stack" TEXT[],
    "tags" TEXT[],
    "highlight" TEXT NOT NULL,
    "achievements" TEXT[],
    "description" JSONB,
    "date" TEXT NOT NULL,
    "link" TEXT,
    "github_link" TEXT,
    "avatar" TEXT,
    "gallery" JSONB NOT NULL DEFAULT '[]',
    "video" TEXT,
    "readme_file" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "projects_index_key" ON "projects"("index");
