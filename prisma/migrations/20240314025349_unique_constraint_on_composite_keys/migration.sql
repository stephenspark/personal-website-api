/*
  Warnings:

  - A unique constraint covering the columns `[post_id,tag_id]` on the table `post_to_tag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,role_id]` on the table `user_to_role` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "post_to_tag_post_id_tag_id_key" ON "post_to_tag"("post_id", "tag_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_to_role_user_id_role_id_key" ON "user_to_role"("user_id", "role_id");
