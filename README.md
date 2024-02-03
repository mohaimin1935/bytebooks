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
- [ ] remove your books from creator
- [ ] add search functionality in book list for content
- [ ] audio player

### Todo BACKEND

- [x] `/book-info/`: get by creatorId and isPublished
- [x] `/book-info/[bookId]`: modify patch request
- [x] `/book-info/[bookId]/bytes`: sort by serial in get request
- [ ] `/users/[userId]`: get patch delete

---

- patch
- delete
