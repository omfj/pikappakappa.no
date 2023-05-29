-- CreateTable
CREATE TABLE "Visit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitMembership" (
    "visitId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,

    CONSTRAINT "VisitMembership_pkey" PRIMARY KEY ("visitId","memberId")
);

-- AddForeignKey
ALTER TABLE "VisitMembership" ADD CONSTRAINT "VisitMembership_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitMembership" ADD CONSTRAINT "VisitMembership_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
