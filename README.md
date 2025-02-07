# Finster AI Tasks App

<img width="1045" alt="Screenshot 2025-02-07 at 11 40 36" src="https://github.com/user-attachments/assets/a996a36b-4649-4ecd-a4b2-56a5b95cdd0a" />

## Setup

1. Clone repo
   ```sh
   git clone https://github.com/jackhughtasks/finster-ai-task
   ```
2. Open repo
   ```sh
   cd finster-ai-task
   ```
3. Install dependencies
   ```sh
   npm install
   ```
4. Init database
   ```sh
   npm run db:push
   ```
5. Start development server
   ```sh
   npm run dev
   ```

The server will now be available at [http://localhost:3000](http://localhost:3000)

## Architecture

- [Next.js (app directory) / React](https://nextjs.org/docs/app)
- [tailwindcss](https://tailwindcss.com/) for styling
- [Prisma](https://www.prisma.io/) with sqlite for quick setup time
- [Tanstack Query](https://tanstack.com/query/latest) for server state management
- [React Hook Form](https://react-hook-form.com/) for form management
- [Zod](https://zod.dev/) for strict type checking and validation

## Considerations

- I have used [t3 app](https://create.t3.gg/) to bootstrap the application in order to speed up development time. This initialises a Next.js app alongside tailwindcss and Prisma.
- I haven't spent too much time on styling as I understand Finster AI uses Material UI internally so spending more time on the logic made sense.

## If I had more time...

- Implement optimistic updates - once an API call is made to the server, we should immediately reflect this change by updating the `queryClient`.
- Improvements to the use of Tanstack Query - implementing type safe and re-usable keys as well as re-usable hooks for each endpoint.
- Implement infinite scroll rather than fetching all tasks.
- The `<IconButton />` component is not particularly flexible and was put together quickly to allow for some kind of re-usable icon button. Implementing a custom icon font would be a better solution.
- Implement a stricter linter setup with auto fixes.
