import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

export async function DELETE() {
  try {
    const session = await getServerAuthSession();
    const userId = session?.user.id;

    if (!userId) {
      return new Response(JSON.stringify({ msg: "Unauthorized" }), {
        status: 400,
      });
    }

    const user = await db.user.delete({ where: { id: userId } });
    if (!user) {
      return new Response(JSON.stringify({ msg: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ msg: "User has been deleted" }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);

    return new Response(JSON.stringify({ msg: "Server error" }), {
      status: 500,
    });
  }
}
