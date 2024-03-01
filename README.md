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

- [ ] logout icon left align





- [ ] time update audio progress
- [ ] author update data-manager not working
- [x] creator topbar image
- [ ] search - api done
- 

- [ ] add search functionality in book list for creator
- [ ] report book reader in chapter
- [ ] profile page for creator
- [ ] report
- [ ] author get data
- [ ] streak
- [ ] admin/data-manager user table data show ui design
- [ ] admin/data-manager book table data show ui design

### Todo BACKEND

- [ ] streak ???
- highlight create
request body:
```
userId: 'clsh4tkat0000eqi6zb8495lr',
bookId: 'clsh5kd5w0007d9fv71le4p7v',
chapterId: null,
byteId: 'clt8wyqxm0007kmx03zzuubn8',
startIndex: 1157,
endIndex: 1188,
```


---

- how to know byte or chapter in continue?
