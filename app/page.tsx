"use client";

import { useState } from "react";
import { Thread } from "./Thread";
import { revalidatePath } from "next/cache";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let count = 0;

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);

  return (
    <main>
      <Thread
        messages={messages}
        addMessage={async (message) => {
          await delay(3_000);
          setMessages((messages) => Object.assign(messages, [message]));
        }}
      />
      <p>Current count: {count}</p>
      <form
        action={async () => {
          count += 1;
          revalidatePath("/");
        }}
      >
        <button>Increase</button>
      </form>
    </main>
  );
}
