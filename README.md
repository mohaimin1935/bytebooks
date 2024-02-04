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

- [x] delete prev file from firebase
- [x] remove your books from creator
- [ ] book delete for creator
- [ ] add search functionality in book list for creator
- [x] audio player
- [ ] report book reader in chapter
- [x] design search bookcard
- [x] search book modal reader
- [ ] settings for user
- [ ] create collection for creator
- [ ] explore page reader
- [ ] highlights, library reader
- [ ] admin
- [x] author page

### Todo BACKEND

- [x] `/book-info/`: get by creatorId and isPublished
- [x] `/book-info/[bookId]`: modify patch request
- [x] `/book-info/[bookId]/bytes`: sort by serial in get request
- [x] `/users/[userId]`: get patch delete
- [ ] book progress
- [ ] `/users/[userId]/books`

---

- patch
- delete
