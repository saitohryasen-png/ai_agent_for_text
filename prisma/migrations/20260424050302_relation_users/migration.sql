/*
  Warnings:

  - Changed the type of `user_id` on the `evaluations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "evaluations" DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "clerk_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_clerk_user_id_key" ON "users"("clerk_user_id");

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
