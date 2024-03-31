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

## About the Project

#### Technologies Used
Next JS, Tailwind CSS, MongoDB, Prisma ORM, Next Auth, Framer Motion

#### Short Description
Bytebook is an audiobook library where users can listen to audiobooks and read the text version as well. There are three types of users: Admin, Creator and Reader. Admin can manage users, creators, and books. Creators can upload books and readers can listen to them. The application is built with Next.js, Tailwind CSS, MongoDB, Prisma ORM, Next Auth, and Framer Motion.

##### Demo credentials
Admin: ```admin@admin.com```, Password: ```123456``` <br />
Creator: ```creator1@creator.com```, Password: ```123456``` <br />
Reader: ```reader1@reader.com```, Password: ```123456```

#### Admin Features
- Manage users, creators, and books
- Resolve reports from users
- View insightful analytics with charts

#### Creator Features
- Manage own books
- Interactive editor

#### Reader Features
- Suggesting books according to user preference
- Track real-time book progress
- Notification upon publishing new audiobook
- Maintain shelf for books
- Highlight manager
- Personal analytics
