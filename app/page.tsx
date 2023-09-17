import { Thread } from "./Thread";
import { revalidatePath } from "next/cache";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const messages: string[] = [];

let count = 0;

export default function Home() {
  return (
    <main>
      <Thread
        messages={messages}
        addMessage={async (message) => {
          "use server";
          await delay(3_000);
          messages.push(message);
        }}
      />
      <p>Current count: {count}</p>
      <form
        action={async () => {
          "use server";
          count += 1;
          revalidatePath("/");
        }}
      >
        <button>Increase</button>
      </form>
    </main>
  );
}
