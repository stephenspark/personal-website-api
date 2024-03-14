/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `bookmarks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `bookmarks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `comments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `comments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `post_types` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `tags` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "bookmarks_id_key" ON "bookmarks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "bookmarks_uuid_key" ON "bookmarks"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "comments_id_key" ON "comments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "comments_uuid_key" ON "comments"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "likes_id_key" ON "likes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_uuid_key" ON "likes"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "post_types_id_key" ON "post_types"("id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_id_key" ON "posts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_uuid_key" ON "posts"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "roles_id_key" ON "roles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "roles_uuid_key" ON "roles"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tags_id_key" ON "tags"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_uuid_key" ON "users"("uuid");
