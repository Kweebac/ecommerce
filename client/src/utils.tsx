export async function handleSetUser(
  setUser: React.Dispatch<React.SetStateAction<object | null>>,
  abortController?: AbortController,
) {
  const res = await fetch("http://localhost:3000/api/user", {
    credentials: "include",
    signal: abortController?.signal,
  });

  if (res.status === 401) {
    setUser(null);
  } else if (res.ok) {
    const user = await res.json();
    setUser(user);
  }
}
