Live website: https://byte-books.vercel.app/

## Getting Started

Install node.js and yarnpkg.

#### Fresh Start

```bash
    git clone https://github.com/mohaimin1935/bytebooks.git
    cd bytebooks
    yarn
    yarn prisma generate
    yarn run dev
```

#### Working project

```bash
    // go to bytrebooks folder
    git pull
    yarn // if not working
    yarn prisma generate
    yarn run dev
```

#### Push

```bash
   git add .
   git commit -m "any message"
   git push
```

```
npx prisma init --datasource-provider mongodb
npx prisma generate
npx prisma studio
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Todo FRONTEND

- [ ] add search functionality in book list for creator
- [ ] report book reader in chapter
- [ ] profile page
- [ ] bookmark, report
- [ ] author get data
- [ ] bookshelf profile image
- [ ] streak
- [ ] consecutive 2 image upload in creator
- [ ] admin/data-manager user table data show ui design

### Todo BACKEND

- [ ] /api/users/userId/books?type=[recommended, continue, trending, latest]&count=[int]&page=[pageIndex] -> bookList
- [ ] book -> bookProgress[userid, bookid, type, chapterid, audioTimeStamp] <- user
- [ ] bookmark -> userId, bookId
- [ ] streak ???
- [ ] notification [sub, author, creator, sched, streak]
- [ ] highlights [startInd, endInd, bookId, type, chapterId]
- [ ] userId -> top genre

---

- [x] /api/users/userId -> email, password update
- [ ] /users/userId/books -> get books depending on searchParams, isPublished
- [ ] /book-info -> {query} : title match -> [books] (search)
- [ ]

---

- patch
- delete
