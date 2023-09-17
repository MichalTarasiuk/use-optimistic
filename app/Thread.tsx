"use client";

import { experimental_useOptimistic as useOptimistic, useRef } from "react";

interface Props {
  messages: string[];
  addMessage: (message: string) => Promise<void>;
}

export function Thread({ messages, addMessage }: Props) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    Props["messages"],
    string
  >(messages, (messages, message) => [...messages, message]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {!optimisticMessages.length ? (
        "There are no messages"
      ) : (
        <ul>
          {optimisticMessages.map((message, idx) => (
            <li key={idx}>{message}</li>
          ))}
        </ul>
      )}
      <form
        action={async (formData) => {
          const message = formData.get("message")?.toString();
          if (!message) return;
          addOptimisticMessage(message);

          if (inputRef.current) {
            inputRef.current.value = "";
          }
          await addMessage(message);
        }}
      >
        <label htmlFor="message">Message: </label>
        <input id="message" name="message" ref={inputRef} />
        <button>Add</button>
      </form>
    </>
  );
}
