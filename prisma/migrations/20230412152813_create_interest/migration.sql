-- CreateTable
CREATE TABLE "Interest" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "movies" BOOLEAN NOT NULL,
    "tv_shows" BOOLEAN NOT NULL,
    "meditation" BOOLEAN NOT NULL,
    "exercise" BOOLEAN NOT NULL,
    "genres" TEXT[],
    "comfort_shows" TEXT[],

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Interest_user_key" ON "Interest"("user");

-- AddForeignKey
ALTER TABLE "Interest" ADD CONSTRAINT "Interest_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
