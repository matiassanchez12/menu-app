import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { MenuForm } from "~/components/shared/MenuForm";

import { getServerAuthSession } from "~/server/auth";

export default async function AdminPage() {
  noStore();
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return (
    <section className="container flex flex-col justify-center gap-12 px-4 py-16 space-y-6">
      <div>
        <h3 className="text-lg font-medium">Menu</h3>
        <p className="text-sm text-muted-foreground">
          Ingresar datos que aparecerán en el menu
        </p>
      </div>

      <MenuForm />
    </section>
  );
}
