# Campus Lost & Found

A full-stack Node.js, Express, EJS and MongoDB application for student profiles, lost/found reports, and item claims. The Mongoose schemas and database connection are kept directly in `server.js`

## Run it on Windows

1. Install Node.js and MongoDB Community Server. Keep MongoDB running as a Windows service (the default installer option), or start it from the MongoDB installation you already have.
2. Open PowerShell in the project folder:

   ```powershell
   Set-Location "D:\FSD\FSD_Assignments_0025\Class-Assignment-12"
   ```

3. Install packages and start the app:

   ```powershell
   npm install
   npm start
   ```

4. Open **http://localhost:3000** in your browser.

The MongoDB URI is set in `server.js` to `mongodb://127.0.0.1:27017/campus_lost_found`. Change the constant in that file if your local database uses another URI.


## First-use walkthrough

1. On the home page, create a student profile with a valid email and a password of at least 8 characters. The app signs the student in automatically.
2. Create a found-item report.
3. Sign out, create or sign in as a second student, open **Found items**, and submit a claim with a reason.
4. Sign out and sign back in as the student who reported the found item. Open that item and approve the claim; the item changes to **Returned** and any other pending claims are rejected.
5. Try a lost-item report, search the lost/found lists, and open the student profile to view associated reports.

Passwords are hashed before storage. Reports, claims, and claim decisions use the signed-in student's server-side session identity; changing an ID in the browser cannot impersonate the item reporter.

## Main routes

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/` | Home page, sign-in and report/profile forms |
| POST | `/students` | Create a student profile |
| GET | `/students` | List profiles |
| GET | `/students/:id` | View a profile and that student's reports |
| POST | `/auth/login` | Sign in |
| POST | `/auth/logout` | Sign out |
| GET / POST | `/lost-items` | List/search and create lost-item reports |
| GET | `/lost-items/:id` | View a lost-item report |
| GET / POST | `/found-items` | List/search and create found-item reports |
| GET | `/found-items/:id` | View a found item and its claims |
| POST | `/found-items/:id/claims` | Submit a claim |
| PATCH | `/claims/:id/status` | Approve or reject a pending claim |
| PATCH | `/found-items/:id/status` | Mark the reporter's available item as returned |

## Data relationships and rules

- Each lost and found report references its reporting student through `reportedBy`.
- Each claim references the found item and claimant through `foundItemId` and `claimedBy`.
- A compound unique index prevents one student from submitting multiple claims for the same found item.
- Only the signed-in student who reported a found item may review its claims or mark it returned.
- A claim must point to an existing found item and student. Returned items reject new claims.
- IDs are checked before database lookups; required values, email format and duplicate emails are validated.

## Manual test checklist

- Create two profiles, then create a lost report and a found report; check their dynamic details pages.
- Search by item name, category, or location; try searches with no matches.
- Submit one claim successfully, then submit a second claim from the same student for that item (expect a duplicate-claim message).
- Sign in as a different student and attempt to review the claim (expect access denied); sign in as the reporter and approve it.
- After approval, verify the item says Returned, other pending claims are rejected, and a new claim is refused.
- Try invalid and nonexistent MongoDB IDs, an invalid email, a duplicate email, and blank required fields; the app should show an error page rather than crash.

The session store and fallback session secret are intended for local classroom demonstrations. For deployment, use a persistent session store, HTTPS, and a strong secret supplied by the deployment environment.
