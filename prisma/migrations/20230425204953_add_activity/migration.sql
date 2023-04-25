-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "user" INTEGER NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "options" TEXT[],
    "completed" TEXT,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
