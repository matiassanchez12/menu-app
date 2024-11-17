import { ArrowRight, Clock7, ExternalLink } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  noStore();
  const session = await getServerAuthSession();

  if (session?.user) {
    redirect("/admin");
  }

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Creá un <span className="text-[hsl(280,100%,70%)]">Menú</span>
        <br />
        <span className="flex-center">
          en pocos minutos
          <Clock7 className="ml-2 h-12 w-12 text-orange-400 dark:text-orange-300" />
        </span>
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        <div className="flex flex-col items-start justify-center gap-3">
          <h3 className="text-2xl">
            Empezá hoy, creá tu menú
            <span className="block"> y agregá productos!</span>
          </h3>

          <Link href="/api/auth/signin">
            <Button variant="outline" size="lg" className="mt-2 border-primary">
              Comenzar
              <ArrowRight className="ml-2 h-4 w-4 hover:text-primary" />
            </Button>
          </Link>
        </div>

        <div>
          <Image src="/hero.svg" alt="hero image" width={320} height={320} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl">Perfiles creados:</h1>

        <CreatedSites />
      </div>
    </div>
  );
}

async function CreatedSites() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.menu.getLatest.query();
  const allPosts = await api.menu.getAll.query();

  return (
    <div className="w-full max-w-xs">
      <Card>
        <CardHeader className="gap-2">
          <div className="flex items-center gap-3">
            <CardTitle>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </CardTitle>
            <h4>Card Title</h4>
          </div>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Productos agregados: 4</p>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" className="gap-1">
            Ver sitio
            <ExternalLink className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      {/* {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      {allPosts ? (
        <div>
          {allPosts.map((post) => (
            <p key={post.id}>
              <span>id: {post.id} - </span>
              name: {post.name}
            </p>
          ))}
        </div>
      ) : (
        <p>Loading posts...</p>
      )} */}
    </div>
  );
}
