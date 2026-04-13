-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "adult" BOOLEAN NOT NULL,
    "backdropImage" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "posterImage" TEXT NOT NULL,
    "mediaType" TEXT,
    "language" TEXT NOT NULL,
    "genreId" INTEGER[],
    "popularity" INTEGER NOT NULL,
    "release" TEXT NOT NULL,
    "video" BOOLEAN NOT NULL,
    "voteAverage" INTEGER NOT NULL,
    "voteCount" INTEGER NOT NULL,
    "originCountry" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
