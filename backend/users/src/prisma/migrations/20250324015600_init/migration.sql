-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "departmentofissue" TEXT NOT NULL,
    "placeofissue" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "ethnicity" TEXT NOT NULL,
    "personalemail" TEXT NOT NULL,
    "institutionalemail" TEXT NOT NULL,
    "mobilephone" TEXT NOT NULL,
    "landlinephone" TEXT NOT NULL,
    "birthdate" TIMESTAMP(6) NOT NULL,
    "nationality" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_fullName_key" ON "Users"("fullName");

-- CreateIndex
CREATE UNIQUE INDEX "Users_personalemail_key" ON "Users"("personalemail");

-- CreateIndex
CREATE UNIQUE INDEX "Users_institutionalemail_key" ON "Users"("institutionalemail");
