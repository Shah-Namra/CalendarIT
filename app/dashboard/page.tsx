// imp to name page.tsx

import { requrieUser } from "../lib/hooks";

export default async function Dashboard() {
    const session = await requrieUser();

    return (
    <div>
        <h1>Dashboard</h1>
    </div>
  );
} 